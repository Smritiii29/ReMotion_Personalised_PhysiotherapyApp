// import React, { createContext, useContext, useState, ReactNode } from 'react';
// import { AVATARS, AvatarConfig } from '../lib/avatarData';

// interface AvatarContextType {
//   selectedAvatar: AvatarConfig;
//   setSelectedAvatar: (avatar: AvatarConfig) => void;
// }

// const AvatarContext = createContext<AvatarContextType | undefined>(undefined);

// export const AvatarProvider = ({ children }: { children: ReactNode }) => {
//   // Default to the first avatar (e.g., Ninja/Hades)
//   const [selectedAvatar, setSelectedAvatar] = useState<AvatarConfig>(AVATARS[0]);

//   return (
//     <AvatarContext.Provider value={{ selectedAvatar, setSelectedAvatar }}>
//       {children}
//     </AvatarContext.Provider>
//   );
// };

// export const useAvatar = () => {
//   const context = useContext(AvatarContext);
//   if (!context) {
//     throw new Error('useAvatar must be used within an AvatarProvider');
//   }
//   return context;
// };

// src/contexts/AvatarContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';           // ← make sure this exists
import { AVATARS, AvatarConfig } from '../lib/avatarData';
import { useAuth } from '../contexts/AuthContext';

interface AvatarContextType {
  selectedAvatar: AvatarConfig;
  setSelectedAvatar: (avatar: AvatarConfig) => void;
  isLoadingAvatar: boolean;
}

const AvatarContext = createContext<AvatarContextType | undefined>(undefined);

export const AvatarProvider = ({ children }: { children: ReactNode }) => {
  const { currentUser, userRole } = useAuth();
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarConfig>(AVATARS[0]);
  const [isLoadingAvatar, setIsLoadingAvatar] = useState(true);

  useEffect(() => {
    if (userRole !== "patient" || !currentUser?.uid) {
      setSelectedAvatar(AVATARS[0]);
      setIsLoadingAvatar(false);
      return;
    }

    setIsLoadingAvatar(true);

    const unsubscribe = onSnapshot(
      doc(db, "Users", currentUser.uid),
      (snap) => {
        setIsLoadingAvatar(false);

        if (!snap.exists()) {
          setSelectedAvatar(AVATARS[0]);
          return;
        }

        const savedId = snap.data()?.selected_avatar_id as string | undefined;

        if (savedId) {
          const found = AVATARS.find(a => a.id === savedId);
          setSelectedAvatar(found || AVATARS[0]);
        } else {
          setSelectedAvatar(AVATARS[0]);
        }
      },
      (err) => {
        console.error("Avatar listener error:", err);
        setIsLoadingAvatar(false);
        setSelectedAvatar(AVATARS[0]);
      }
    );

    return () => unsubscribe();
  }, [currentUser?.uid, userRole]);

  return (
    <AvatarContext.Provider value={{ 
      selectedAvatar, 
      setSelectedAvatar,
      isLoadingAvatar 
    }}>
      {children}
    </AvatarContext.Provider>
  );
};

export const useAvatar = () => {
  const context = useContext(AvatarContext);
  if (!context) throw new Error('useAvatar must be used within AvatarProvider');
  return context;
};