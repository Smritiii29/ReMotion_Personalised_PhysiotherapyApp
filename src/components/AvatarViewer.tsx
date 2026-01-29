// // AvatarViewer
// import { Suspense, useRef, useEffect } from "react";
// import { Canvas } from "@react-three/fiber";
// import { useGLTF, useAnimations, Environment, ContactShadows } from "@react-three/drei";
// import * as THREE from "three";

// interface AvatarViewerProps {
//   modelPath: string;
// }

// const AvatarModel = ({ modelPath }: { modelPath: string }) => {
//   const group = useRef<THREE.Group>(null);
//   const { scene, animations } = useGLTF(modelPath) as any;
//   const { actions } = useAnimations(animations, group);

//   useEffect(() => {
//     if (actions && Object.keys(actions).length > 0) {
//       const firstAction = actions[Object.keys(actions)[0]];
//       firstAction?.reset().fadeIn(0.5).play();
//     }
//     return () => {
//       Object.values(actions).forEach((action: any) => action?.stop());
//     };
//   }, [actions, modelPath]);

//   return (
//     <group ref={group} dispose={null}>
//       <primitive
//         object={scene}
//         // INCREASED SCALE: Makes the avatar physically larger
//         scale={2.8} 
//         // ADJUSTED POSITION: [x, y, z]
//         // y: -3.4 lowers the model so the feet are at the bottom
//         // z: 0.5 keeps it slightly forward
//         position={[0, -3.4, 0.5]} 
//         rotation={[0, 0, 0]}
//       />
//     </group>
//   );
// };

// export default function AvatarViewer({ modelPath }: AvatarViewerProps) {
//   return (
//     <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center">
//       {/* CAMERA ADJUSTMENT: 
//           position: [0, 1, 3.5] -> Moved Z from 5 to 3.5 (Closer)
//           fov: 40 -> Slightly wider to catch the full body at close range
//       */}
//       <Canvas camera={{ position: [0, 1, 3.5], fov: 40 }} shadows>
//         <ambientLight intensity={2.3} />
//         <spotLight position={[5, 6, 6]} intensity={3.5} color="#ffe2c6" castShadow />
//         <Environment preset="city" />
//         <Suspense fallback={null}>
//           <AvatarModel modelPath={modelPath} />
//         </Suspense>
//         <ContactShadows opacity={0.5} scale={10} blur={2} far={4} resolution={256} color="#000000" />
//       </Canvas>
//     </div>
//   );
// }

// src/components/user/AvatarViewer.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense, useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { SkeletonUtils } from "three-stdlib";

interface AvatarViewerProps {
  modelPath: string;
  highlightPart?: string | null; // e.g., "back", "upper_arm", "thigh"
  isCorrect?: boolean; // true = green, false = red
  isPaused?: boolean;
}

// --- 1. Bone Highlighter Component ---
const BoneHighlighter = ({ scene, part, isCorrect }: { scene: THREE.Group, part: string | null, isCorrect: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [targetBone, setTargetBone] = useState<THREE.Object3D | null>(null);

  useEffect(() => {
    if (!part || !scene) {
      setTargetBone(null);
      return;
    }

    // Map "friendly names" from ML to internal Mixamo bone names
    let searchString = "";
    if (part.includes("back") || part.includes("posture")) searchString = "Spine";
    else if (part.includes("arm") || part.includes("elbow")) searchString = "RightForeArm"; // Or Left
    else if (part.includes("thigh") || part.includes("knee") || part.includes("squat")) searchString = "RightUpLeg"; // Or Left

    // Traverse to find the bone
    let found: THREE.Object3D | null = null;
    scene.traverse((child) => {
      if (child.type === "Bone" && child.name.includes(searchString) && !found) {
        found = child;
      }
    });
    setTargetBone(found);
  }, [part, scene]);

  useFrame(() => {
    if (targetBone && meshRef.current) {
      // Snap the highlight mesh to the bone's world position every frame
      const worldPos = new THREE.Vector3();
      targetBone.getWorldPosition(worldPos);
      meshRef.current.position.copy(worldPos);
      
      // Match rotation roughly (bones can be tricky, position is most important for highlight)
      meshRef.current.rotation.copy(targetBone.rotation);
    }
  });

  if (!targetBone) return null;

  const color = isCorrect ? "#4ade80" : "#ef4444"; // Green-400 : Red-500

  return (
    <mesh ref={meshRef}>
      {/* A Cylinder representing the bone highlight (Overlay style) */}
      <cylinderGeometry args={[0.08, 0.08, 0.5, 16]} />
      <meshStandardMaterial 
        color={color} 
        transparent 
        opacity={0.6} 
        emissive={color}
        emissiveIntensity={2}
        depthTest={false} // Always show on top of the avatar
      />
    </mesh>
  );
};

// --- 2. The Model Wrapper ---
const AvatarModel = ({ modelPath, highlightPart, isCorrect, isPaused }: AvatarViewerProps) => {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(modelPath) as any;
  
  // Clone scene to avoid shared state issues if we swap avatars rapidly
  const clonedScene = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { actions } = useAnimations(animations, group);

  // Play Animation
  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      const actionKey = Object.keys(actions)[0]; 
      const action = actions[actionKey];
      if(action) {
        action.reset().fadeIn(0.5).play();
      }
    }
    return () => {
      Object.values(actions).forEach((action: any) => action?.stop());
    };
  }, [actions, modelPath]);

  // Handle Pause State
  useEffect(() => {
    Object.values(actions).forEach((action: any) => {
      if(action) action.paused = !!isPaused;
    });
  }, [isPaused, actions]);

  return (
    <group ref={group} dispose={null}>
      <primitive
        object={clonedScene}
        // RESETTING TO ORIGINAL PROPORTIONS
        scale={2.8} 
        position={[0, -3.4, 0.5]} 
        rotation={[0, 0, 0]}
      />
      {/* for that scene error */}
      <BoneHighlighter scene={clonedScene as THREE.Group} part={highlightPart || null} isCorrect={!!isCorrect} />  
    </group>
  );
};

// --- 3. Main Viewer Export ---
export default function AvatarViewer({ modelPath, highlightPart, isCorrect, isPaused }: AvatarViewerProps) {
  return (
    <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center">
      <Canvas camera={{ position: [0, 1, 3.5], fov: 40 }} shadows>
        <ambientLight intensity={2.3} />
        <spotLight position={[5, 6, 6]} intensity={3.5} color="#ffe2c6" castShadow />
        <Environment preset="city" />
        <Suspense fallback={null}>
          <AvatarModel 
            modelPath={modelPath} 
            highlightPart={highlightPart} 
            isCorrect={isCorrect} 
            isPaused={isPaused}
          />
        </Suspense>
        <ContactShadows opacity={0.5} scale={10} blur={2} far={4} resolution={256} color="#000000" />
      </Canvas>
    </div>
  );
}