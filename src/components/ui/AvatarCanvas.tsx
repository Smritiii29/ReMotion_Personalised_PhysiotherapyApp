// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useRef, useEffect, useMemo, useState } from 'react';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { useGLTF, useAnimations, OrbitControls, Environment, ContactShadows } from '@react-three/drei';
// import * as THREE from 'three';
// import { SkeletonUtils } from 'three-stdlib';

// // --- Components ---

// const PlatformBox = ({ color }: { color: string }) => (
//   <mesh position={[0, -1.6, 0]} receiveShadow>
//     <boxGeometry args={[3.5, 0.2, 3.5]} /> 
//     <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.1} roughness={0.2} metalness={0.5} />
//   </mesh>
// );

// // const ErrorHighlight = ({ targetBone }: { targetBone: THREE.Object3D }) => {
// //   const meshRef = useRef<THREE.Mesh>(null);
// //   useFrame(() => {
// //     if (meshRef.current && targetBone) {
// //       const worldPos = new THREE.Vector3();
// //       targetBone.getWorldPosition(worldPos);
// //       meshRef.current.position.copy(worldPos);
// //       meshRef.current.position.y -= 0.05; 
// //     }
// //   });
// //   return (
// //     <mesh ref={meshRef}>
// //       <capsuleGeometry args={[0.12, 0.45, 4, 8]} /> 
// //       <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={1.5} transparent opacity={0.5} depthTest={false} />
// //     </mesh>
// //   );
// // };
// const ErrorHighlight = ({ targetBone, color = "#ef4444" }: { targetBone: THREE.Object3D, color?: string }) => {
//   const meshRef = useRef<THREE.Mesh>(null);
//   useFrame(() => {
//     if (meshRef.current && targetBone) {
//       const worldPos = new THREE.Vector3();
//       targetBone.getWorldPosition(worldPos);
//       meshRef.current.position.copy(worldPos);
//       meshRef.current.position.y -= 0.05; 
//     }
//   });
//   return (
//     <mesh ref={meshRef}>
//       <capsuleGeometry args={[0.12, 0.45, 4, 8]} /> 
//       {/* Dynamic color based on correction state */}
//       <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} transparent opacity={0.5} depthTest={false} />
//     </mesh>
//   );
// };

// // const Model = ({ url, scale, isSelected, accentColor, isThumbnail, positionZ = 0, highlightPart }: any) => {
// //   const group = useRef<THREE.Group>(null);
// //   const { scene, animations } = useGLTF(url) as any;
// //   const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
// //   const { actions } = useAnimations(animations, group);
// //   const [targetBone, setTargetBone] = useState<THREE.Object3D | null>(null);

// //   useEffect(() => {
// //     const actionKeys = Object.keys(actions);
// //     if (actionKeys.length > 0) {
// //       const action = actions[actionKeys[0]];
// //       if (action) {
// //         action.reset().fadeIn(0.5).play();
// //         action.paused = !!highlightPart; 
// //         action.timeScale = isSelected ? 1 : 0.5;
// //       }
// //       return () => { action?.fadeOut(0.5); };
// //     }
// //   }, [actions, isSelected, highlightPart]);

// //   useEffect(() => {
// //     if (!highlightPart) { setTargetBone(null); return; }
// //     const boneMap: Record<string, string> = {
// //       'forearm': 'RightForearm', 'upper_arm': 'RightArm', 'joint': 'RightForearm',
// //       'back': 'Spine1', 'spine': 'Spine'
// //     };
// //     const searchName = boneMap[highlightPart] || highlightPart;
// //     let found: THREE.Object3D | null = null;
// //     clone.traverse((child: any) => {
// //       if (child.isBone && child.name.includes(searchName)) found = child;
// //     });
// //     setTargetBone(found);
// //   }, [highlightPart, clone]);

// //   return (
// //     <group ref={group} dispose={null}>
// //       <primitive object={clone} scale={scale} position={[0, -1.6, positionZ]} />
// //       {targetBone && <ErrorHighlight targetBone={targetBone} />}
// //       {isSelected && !isThumbnail && (
// //          <pointLight position={[2, 2, 2]} intensity={3} color={accentColor} distance={6} />
// //       )}
// //     </group>
// //   );
// // };

// const Model = ({ url, scale, isSelected, accentColor, isThumbnail, positionZ = 0, highlightPart, highlightColor }: any) => {
//   const group = useRef<THREE.Group>(null);
//   const { scene, animations } = useGLTF(url) as any;
//   const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
//   const { actions } = useAnimations(animations, group);
//   const [targetBone, setTargetBone] = useState<THREE.Object3D | null>(null);

//   useEffect(() => {
//     const actionKeys = Object.keys(actions);
//     if (actionKeys.length > 0) {
//       const action = actions[actionKeys[0]];
//       if (action) {
//         action.reset().fadeIn(0.5).play();
//         // Pause ONLY when an error is actively being corrected
//         action.paused = !!highlightPart; 
//         action.timeScale = isSelected ? 1 : 0.5;
//       }
//       return () => { action?.fadeOut(0.5); };
//     }
//   }, [actions, isSelected, highlightPart]);

//   useEffect(() => {
//     if (!highlightPart) { setTargetBone(null); return; }
    
//     // UPDATED: Added Squat support (Legs) to the boneMap
//     const boneMap: Record<string, string> = {
//       'forearm': 'RightForearm', 
//       'upper_arm': 'RightArm', 
//       'joint': 'RightForearm',
//       'back': 'Spine1', 
//       'spine': 'Spine',
//       'thigh': 'RightUpLeg',  // For Squats
//       'knee': 'RightLeg'      // For Squats
//     };
    
//     const searchName = boneMap[highlightPart] || highlightPart;
//     let found: THREE.Object3D | null = null;
//     clone.traverse((child: any) => {
//       if (child.isBone && child.name.includes(searchName)) found = child;
//     });
//     setTargetBone(found);
//   }, [highlightPart, clone]);

//   return (
//     <group ref={group} dispose={null}>
//       <primitive object={clone} scale={scale} position={[0, -1.6, positionZ]} />
//       {targetBone && <ErrorHighlight targetBone={targetBone} color={highlightColor} />}
//       {isSelected && !isThumbnail && (
//          <pointLight position={[2, 2, 2]} intensity={3} color={accentColor} distance={6} />
//       )}
//     </group>
//   );
// };


// export const AvatarCanvas = ({
//   modelUrl,
//   isSelected,
//   accentColor,
//   className = "w-full h-full",
//   isThumbnail = false,
//   variant = "select", 
//   view = "front",
//   highlightPart = null,
//   highlightColor = "#ef4444"
// }: {
//   modelUrl: string;
//   isSelected: boolean;
//   accentColor: string;
//   className?: string;
//   isThumbnail?: boolean;
//   variant?: "select" | "exercise";
//   view?: "front" | "side";
//   highlightPart?: string | null;
//   highlightColor?: string;
// }) => {
  
//   // === Adjusted Camera Settings for Better Fit ===
//   let cameraPosition: [number, number, number] = [0, 0.9, 5.5];
//   let fov = 40;

//   if (isThumbnail) {
//     cameraPosition = [0, 0.9, 4.8];
//     fov = 48;
//   } else if (variant === "exercise") {
//     // Increased distance (Z) slightly to ensure full body fits
//     if (view === "side") {
//       cameraPosition = [10.5, 1.2, 0];
//     } else {
//       cameraPosition = [0, 1.2, 10.5]; 
//     }
//     fov = 30; // Lower FOV + higher distance = less distortion, flatter look
//   }

//   // Slightly reduced scale to prevent head clipping at top
//   const modelScale = isThumbnail ? 1.3 : 1.8;

//   return (
//     <div className={className}>
//       <Canvas key={view} camera={{ position: cameraPosition, fov }} shadows dpr={[1, 2]}>
//         <ambientLight intensity={isThumbnail ? 1.5 : 0.8} />
//         <spotLight position={[5, 10, 5]} angle={0.25} penumbra={1} intensity={4} castShadow />
//         <Environment preset="city" />

//         <Model
//           url={modelUrl}
//           scale={modelScale}
//           isSelected={isSelected}
//           accentColor={accentColor}
//           isThumbnail={isThumbnail}
//           positionZ={0}
//           highlightPart={highlightPart}
//           highlightColor={highlightColor}
//         />

//         {/* Render Platform only in exercise mode */}
//         {variant === "exercise" && <PlatformBox color="#112d32" />}

//         <ContactShadows opacity={0.5} scale={10} blur={2} far={4} resolution={256} color="#000000" />
        
//         {/* Orbit Controls (Limited angles to keep the view clean) */}
//         <OrbitControls 
//           enableZoom={false} 
//           enablePan={false} 
//           enabled={!isThumbnail} 
//           minPolarAngle={Math.PI / 2.5} 
//           maxPolarAngle={Math.PI / 1.9}
//         />
//       </Canvas>
//     </div>
//   );
// };

// export default AvatarCanvas;

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useRef, useEffect, useMemo, useState } from 'react';
// import { Canvas, useFrame, useThree } from '@react-three/fiber';
// import { useGLTF, useAnimations, OrbitControls, Environment, ContactShadows } from '@react-three/drei';
// import * as THREE from 'three';
// import { SkeletonUtils } from 'three-stdlib';

// // --- VISUAL COMPONENTS ---

// const PlatformBox = ({ color }: { color: string }) => (
//   <mesh position={[0, -1.6, 0]} receiveShadow>
//     <boxGeometry args={[3.5, 0.2, 3.5]} /> 
//     <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.1} roughness={0.2} metalness={0.5} />
//   </mesh>
// );

// // High-end Highlight: A glowing line (inner cylinder) + volumetric zone (outer capsule)
// const LineHighlight = ({ targetBone, color = "#ef4444" }: { targetBone: THREE.Object3D, color?: string }) => {
//   const meshRef = useRef<THREE.Group>(null);
  
//   useFrame(() => {
//     if (meshRef.current && targetBone) {
//       const worldPos = new THREE.Vector3();
//       const worldQuat = new THREE.Quaternion();
//       targetBone.getWorldPosition(worldPos);
//       targetBone.getWorldQuaternion(worldQuat);

//       meshRef.current.position.copy(worldPos);
      
//       // We manually adjust rotation slightly because bone axes can be weird
//       // But copying the quaternion usually aligns it with the limb's direction
//       meshRef.current.quaternion.copy(worldQuat);
      
//       // Shift down slightly to center on the limb segment
//       meshRef.current.translateY(-0.15);
//     }
//   });

//   return (
//     <group ref={meshRef}>
//       {/* 1. The Line (Bright, solid, thin) - Mimics the vector lines in reference images */}
//       <mesh>
//         <cylinderGeometry args={[0.02, 0.02, 0.5, 8]} />
//         <meshStandardMaterial 
//             color={color} 
//             emissive={color} 
//             emissiveIntensity={4} 
//             toneMapped={false}
//         />
//       </mesh>

//       {/* 2. The Zone (Transparent, volumetric glow) */}
//       <mesh>
//         <capsuleGeometry args={[0.12, 0.55, 4, 8]} /> 
//         <meshStandardMaterial 
//             color={color} 
//             emissive={color} 
//             emissiveIntensity={0.5} 
//             transparent 
//             opacity={0.3} 
//             depthTest={false} // Renders on top of avatar
//         />
//       </mesh>
//     </group>
//   );
// };

// // --- CAMERA RIG (THE ZOOM LOGIC) ---
// const CameraRig = ({ 
//     view, 
//     highlightPart, 
//     targetBone 
// }: { 
//     view: 'front' | 'side', 
//     highlightPart: string | null, 
//     targetBone: THREE.Object3D | null 
// }) => {
//     const { camera } = useThree();
//     const vec = new THREE.Vector3();

//     useFrame((state, delta) => {
//         // 1. Calculate base target position based on View (Front/Side)
//         const targetPos = new THREE.Vector3(0, 0.9, 5.5); // Default Front
//         const lookAtPos = new THREE.Vector3(0, 0, 0); // Default Center

//         if (view === 'side') {
//             targetPos.set(4.5, 0.9, 0); 
//         } else {
//             targetPos.set(0, 0.9, 4.5);
//         }

//         // 2. If Highlight Active -> ZOOM IN
//         if (highlightPart && targetBone) {
//             const bonePos = new THREE.Vector3();
//             targetBone.getWorldPosition(bonePos);
//             lookAtPos.copy(bonePos); // Look at the bone

//             // Zoom Offset logic
//             if (view === 'side') {
//                 // Stay on side, but get closer to Z and Y
//                 targetPos.set(2.0, bonePos.y, bonePos.z);
//             } else {
//                 // Front view zoom
//                 targetPos.set(bonePos.x, bonePos.y, 2.0);
//             }
//         }

//         // 3. Smooth Interpolation (Lerp)
//         // Move camera position
//         state.camera.position.lerp(targetPos, 2.5 * delta);
        
//         // Move camera lookAt (using controls or manual lookAt)
//         // Since we are using OrbitControls, strictly we should lerp controls.target
//         // But simply lerping camera works for the "Zoom" effect if controls aren't fighting it.
//         // For strict control, we rely on the OrbitControls ref in the parent, 
//         // but for this visual effect, smooth lookAt works well:
//         state.camera.lookAt(lookAtPos);
//     });

//     return null;
// };


// // --- MODEL LOADER ---
// const Model = ({ url, scale, isSelected, accentColor, isThumbnail, positionZ = 0, highlightPart, highlightColor, onBoneFound }: any) => {
//   const group = useRef<THREE.Group>(null);
//   const { scene, animations } = useGLTF(url) as any;
//   const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
//   const { actions } = useAnimations(animations, group);
//   const [targetBone, setTargetBone] = useState<THREE.Object3D | null>(null);

//   // Animation Control
//   useEffect(() => {
//     const actionKeys = Object.keys(actions);
//     if (actionKeys.length > 0) {
//       const action = actions[actionKeys[0]];
//       if (action) {
//         action.reset().fadeIn(0.5).play();
//         // Pause animation on the specific frame when highlighting for better focus?
//         // Or keep moving? Reference images imply a freeze-frame analysis look, 
//         // but for video feedback, slow-mo or playing is usually better. 
//         // Let's keep it playing but maybe slower.
//         action.paused = false; 
//         action.timeScale = highlightPart ? 0.2 : (isSelected ? 1 : 0.5); // Slow mo on error
//       }
//       return () => { action?.fadeOut(0.5); };
//     }
//   }, [actions, isSelected, highlightPart]);

//   // Bone Finding Logic
//   useEffect(() => {
//     if (!highlightPart) { 
//         setTargetBone(null); 
//         onBoneFound(null);
//         return; 
//     }
    
//     // Expanded Bone Map for Exercises
//     const boneMap: Record<string, string> = {
//       'forearm': 'RightForeArm', 
//       'upper_arm': 'RightUpArm', // Corrected Mixamo name usually RightUpArm or RightArm
//       'arm': 'RightForeArm',
//       'back': 'Spine1', 
//       'spine': 'Spine',
//       'thigh': 'RightUpLeg', 
//       'knee': 'RightLeg',
//       'foot': 'RightFoot'
//     };
    
//     const searchName = boneMap[highlightPart] || highlightPart;
//     let found: THREE.Object3D | null = null;
    
//     // Fuzzy search
//     clone.traverse((child: any) => {
//       if (child.isBone) {
//           // Normalize names for better matching
//           const cleanName = child.name.toLowerCase();
//           const cleanSearch = searchName.toLowerCase();
//           if (cleanName.includes(cleanSearch)) {
//                found = child;
//           }
//       }
//     });

//     setTargetBone(found);
//     onBoneFound(found);
//   }, [highlightPart, clone, onBoneFound]);

//   return (
//     <group ref={group} dispose={null}>
//       <primitive object={clone} scale={scale} position={[0, -1.6, positionZ]} />
      
//       {/* RENDER THE HIGHLIGHT IF BONE FOUND */}
//       {targetBone && <LineHighlight targetBone={targetBone} color={highlightColor} />}
      
//       {isSelected && !isThumbnail && (
//          <pointLight position={[2, 2, 2]} intensity={3} color={accentColor} distance={6} />
//       )}
//     </group>
//   );
// };


// // --- MAIN EXPORT ---
// export const AvatarCanvas = ({
//   modelUrl,
//   isSelected,
//   accentColor,
//   className = "w-full h-full",
//   isThumbnail = false,
//   variant = "select", 
//   view = "front",
//   highlightPart = null,
//   highlightColor = "#ef4444"
// }: {
//   modelUrl: string;
//   isSelected: boolean;
//   accentColor: string;
//   className?: string;
//   isThumbnail?: boolean;
//   variant?: "select" | "exercise";
//   view?: "front" | "side";
//   highlightPart?: string | null;
//   highlightColor?: string;
// }) => {
  
//   // State to hold the found bone so CameraRig can access it
//   const [activeBone, setActiveBone] = useState<THREE.Object3D | null>(null);

//   // Settings
//   let cameraPosition: [number, number, number] = [0, 0.9, 5.5];
//   let fov = 40;

//   if (isThumbnail) {
//     cameraPosition = [0, 0.9, 4.8];
//     fov = 48;
//   } else if (variant === "exercise") {
//     // Initial Camera positions (CameraRig will override these)
//     if (view === "side") {
//       cameraPosition = [4.5, 0.9, 0];
//     } else {
//       cameraPosition = [0, 0.9, 4.5]; 
//     }
//     fov = 35; 
//   }

//   const modelScale = isThumbnail ? 1.3 : 1.8;

//   return (
//     <div className={className}>
//       <Canvas shadows dpr={[1, 2]}>
//         {/* LIGHTING - "High Class" Studio Setup */}
//         <ambientLight intensity={0.7} />
//         <spotLight position={[5, 10, 5]} angle={0.25} penumbra={1} intensity={4} castShadow color="white"/>
//         <pointLight position={[-5, 5, -5]} intensity={1} color="#2dd4bf" /> 
//         <Environment preset="city" />

//         {/* CONTROLS */}
//         {!isThumbnail && (
//              <CameraRig view={view || 'front'} highlightPart={highlightPart || null} targetBone={activeBone} />
//         )}

//         {/* MODEL */}
//         <Model
//           url={modelUrl}
//           scale={modelScale}
//           isSelected={isSelected}
//           accentColor={accentColor}
//           isThumbnail={isThumbnail}
//           positionZ={0}
//           highlightPart={highlightPart}
//           highlightColor={highlightColor}
//           onBoneFound={setActiveBone}
//         />

//         {/* PLATFORM */}
//         {variant === "exercise" && <PlatformBox color="#112d32" />}

//         <ContactShadows opacity={0.5} scale={10} blur={2} far={4} resolution={256} color="#000000" />
        
//         <OrbitControls 
//           enableZoom={false} 
//           enablePan={false} 
//           enabled={!isThumbnail && !highlightPart} // Disable manual control when zooming on error
//           minPolarAngle={Math.PI / 2.5} 
//           maxPolarAngle={Math.PI / 1.9}
//         />
//       </Canvas>
//     </div>
//   );
// };

// export default AvatarCanvas;

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useEffect, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useAnimations, OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { SkeletonUtils } from 'three-stdlib';

// --- VISUAL COMPONENTS ---

const PlatformBox = ({ color }: { color: string }) => (
  <mesh position={[0, -1.6, 0]} receiveShadow>
    <boxGeometry args={[3.5, 0.2, 3.5]} /> 
    <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.1} roughness={0.2} metalness={0.5} />
  </mesh>
);

// High-end Highlight: A glowing line (inner cylinder) + volumetric zone (outer capsule)
const LineHighlight = ({ targetBone, color = "#ef4444" }: { targetBone: THREE.Object3D, color?: string }) => {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (meshRef.current && targetBone) {
      const worldPos = new THREE.Vector3();
      const worldQuat = new THREE.Quaternion();
      targetBone.getWorldPosition(worldPos);
      targetBone.getWorldQuaternion(worldQuat);

      meshRef.current.position.copy(worldPos);
      
      // We manually adjust rotation slightly because bone axes can be weird
      // But copying the quaternion usually aligns it with the limb's direction
      meshRef.current.quaternion.copy(worldQuat);
      
      // Shift down slightly to center on the limb segment
      meshRef.current.translateY(-0.15);
    }
  });

  return (
    <group ref={meshRef}>
      {/* 1. The Line (Bright, solid, thin) - Mimics the vector lines in reference images */}
      <mesh>
        <cylinderGeometry args={[0.02, 0.02, 0.5, 8]} />
        <meshStandardMaterial 
            color={color} 
            emissive={color} 
            emissiveIntensity={4} 
            toneMapped={false}
        />
      </mesh>

      {/* 2. The Zone (Transparent, volumetric glow) */}
      <mesh>
        <capsuleGeometry args={[0.12, 0.55, 4, 8]} /> 
        <meshStandardMaterial 
            color={color} 
            emissive={color} 
            emissiveIntensity={0.5} 
            transparent 
            opacity={0.3} 
            depthTest={false} // Renders on top of avatar
        />
      </mesh>
    </group>
  );
};

// --- CAMERA RIG (THE ZOOM LOGIC) ---
const CameraRig = ({ 
    view, 
    highlightPart, 
    targetBone 
}: { 
    view: 'front' | 'side' | 'back' | 'top', 
    highlightPart: string | null, 
    targetBone: THREE.Object3D | null 
}) => {
    const { camera } = useThree();

    useFrame((state, delta) => {
        const baseDistance = 4.5;
        const zoomDistance = 2.0;
        const lookAtPos = new THREE.Vector3(0, 0, 0); // Default Center
        const targetPos = new THREE.Vector3(0, 0.9, baseDistance); // Default Front

        // Base camera position based on view
        const viewDirections = {
          front: new THREE.Vector3(0, 0, 1),
          side: new THREE.Vector3(1, 0, 0),
          back: new THREE.Vector3(0, 0, -1),
          top: new THREE.Vector3(0, 1, 0),
        };
        const dir = viewDirections[view].clone();

        if (view === 'side') {
            targetPos.set(baseDistance, 0.9, 0);
        } else if (view === 'back') {
            targetPos.set(0, 0.9, -baseDistance);
        } else if (view === 'top') {
            targetPos.set(0, baseDistance, 0.1); // Slight offset to avoid gimbal lock
        }

        // If Highlight Active -> ZOOM IN
        if (highlightPart && targetBone) {
            const bonePos = new THREE.Vector3();
            targetBone.getWorldPosition(bonePos);
            lookAtPos.copy(bonePos);

            // Zoom: Position camera closer along the view direction
            targetPos.copy(bonePos).add(dir.multiplyScalar(zoomDistance));

            // Slight Y adjustment for non-top views
            if (view !== 'top') {
                targetPos.y = bonePos.y + 0.2;
            }
        }

        // Smooth Interpolation (Lerp)
        state.camera.position.lerp(targetPos, 2.5 * delta);
        state.camera.lookAt(lookAtPos);
    });

    return null;
};


// --- MODEL LOADER ---
const Model = ({ url, scale, isSelected, accentColor, isThumbnail, positionZ = 0, highlightPart, highlightColor, onBoneFound }: any) => {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(url) as any;
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { actions } = useAnimations(animations, group);
  const [targetBone, setTargetBone] = useState<THREE.Object3D | null>(null);

  // Animation Control
  useEffect(() => {
    const actionKeys = Object.keys(actions);
    if (actionKeys.length > 0) {
      const action = actions[actionKeys[0]];
      if (action) {
        action.reset().fadeIn(0.5).play();
        // Pause completely on highlight (error), otherwise normal speed
        action.paused = false; 
        action.timeScale = highlightPart ? 0 : (isSelected ? 1 : 0.5);
      }
      return () => { action?.fadeOut(0.5); };
    }
  }, [actions, isSelected, highlightPart]);

  // Bone Finding Logic
  useEffect(() => {
    if (!highlightPart) { 
        setTargetBone(null); 
        onBoneFound(null);
        return; 
    }
    
    // Expanded Bone Map for Exercises
    const boneMap: Record<string, string> = {
      'forearm': 'RightForeArm', 
      'upper_arm': 'RightUpArm', // Corrected Mixamo name usually RightUpArm or RightArm
      'arm': 'RightForeArm',
      'back': 'Spine1', 
      'spine': 'Spine',
      'thigh': 'RightUpLeg', 
      'knee': 'RightLeg',
      'foot': 'RightFoot'
    };
    
    const searchName = boneMap[highlightPart] || highlightPart;
    let found: THREE.Object3D | null = null;
    
    // Fuzzy search
    clone.traverse((child: any) => {
      if (child.isBone) {
          // Normalize names for better matching
          const cleanName = child.name.toLowerCase();
          const cleanSearch = searchName.toLowerCase();
          if (cleanName.includes(cleanSearch)) {
               found = child;
          }
      }
    });

    setTargetBone(found);
    onBoneFound(found);
  }, [highlightPart, clone, onBoneFound]);

  return (
    <group ref={group} dispose={null}>
      <primitive object={clone} scale={scale} position={[0, -1.6, positionZ]} />
      
      {/* RENDER THE HIGHLIGHT IF BONE FOUND */}
      {targetBone && <LineHighlight targetBone={targetBone} color={highlightColor} />}
      
      {isSelected && !isThumbnail && (
         <pointLight position={[2, 2, 2]} intensity={3} color={accentColor} distance={6} />
      )}
    </group>
  );
};


// --- MAIN EXPORT ---
export const AvatarCanvas = ({
  modelUrl,
  isSelected,
  accentColor,
  className = "w-full h-full",
  isThumbnail = false,
  variant = "select", 
  view = "front",
  highlightPart = null,
  highlightColor = "#ef4444"
}: {
  modelUrl: string;
  isSelected: boolean;
  accentColor: string;
  className?: string;
  isThumbnail?: boolean;
  variant?: "select" | "exercise";
  view?: "front" | "side" | "back" | "top";
  highlightPart?: string | null;
  highlightColor?: string;
}) => {
  
  // State to hold the found bone so CameraRig can access it
  const [activeBone, setActiveBone] = useState<THREE.Object3D | null>(null);

  // Settings
  let cameraPosition: [number, number, number] = [0, 0.9, 5.5];
  let fov = 40;

  if (isThumbnail) {
    cameraPosition = [0, 0.9, 4.8];
    fov = 48;
  } else if (variant === "exercise") {
    // Initial Camera positions (CameraRig will override these)
    if (view === "side") {
      cameraPosition = [4.5, 0.9, 0];
    } else if (view === "back") {
      cameraPosition = [0, 0.9, -4.5];
    } else if (view === "top") {
      cameraPosition = [0, 4.5, 0.1];
    } else {
      cameraPosition = [0, 0.9, 4.5]; 
    }
    fov = 35; 
  }

  const modelScale = isThumbnail ? 1.3 : 1.8;

  return (
    <div className={className}>
      <Canvas shadows dpr={[1, 2]}>
        {/* LIGHTING - "High Class" Studio Setup */}
        <ambientLight intensity={0.7} />
        <spotLight position={[5, 10, 5]} angle={0.25} penumbra={1} intensity={4} castShadow color="white"/>
        <pointLight position={[-5, 5, -5]} intensity={1} color="#2dd4bf" /> 
        <Environment preset="city" />

        {/* CONTROLS */}
        {!isThumbnail && (
             <CameraRig view={view || 'front'} highlightPart={highlightPart || null} targetBone={activeBone} />
        )}

        {/* MODEL */}
        <Model
          url={modelUrl}
          scale={modelScale}
          isSelected={isSelected}
          accentColor={accentColor}
          isThumbnail={isThumbnail}
          positionZ={0}
          highlightPart={highlightPart}
          highlightColor={highlightColor}
          onBoneFound={setActiveBone}
        />

        {/* PLATFORM */}
        {variant === "exercise" && <PlatformBox color="#112d32" />}

        <ContactShadows opacity={0.5} scale={10} blur={2} far={4} resolution={256} color="#000000" />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          enabled={!isThumbnail && !highlightPart} // Disable manual control when zooming on error
          minPolarAngle={0} 
          maxPolarAngle={Math.PI}
        />
      </Canvas>
    </div>
  );
};

export default AvatarCanvas;