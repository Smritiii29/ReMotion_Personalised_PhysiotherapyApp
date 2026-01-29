// src/pages/patient/Profile.tsx
import { useAuth, PhysioProfile, PatientProfile } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import Logout from "./accounts/Logout";
import {doc,getDoc} from "firebase/firestore";
import { auth, db } from "../config/firebase";

// --- Simple Icons Components (Inline to avoid external dependencies) ---
const UserIcon = () => (
  <svg className="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);
const MailIcon = () => (
  <svg className="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);
const BadgeIcon = () => (
  <svg className="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
);
const PhoneIcon = () => (
  <svg className="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);
const BriefcaseIcon = () => (
  <svg className="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);
const LogoutIcon = () => (
  <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

// --- Reusable UI Components ---

const SectionHeader = ({ title }: { title: string }) => (
  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 mt-8 ml-1">
    {title}
  </h3>
);

interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: string | React.ReactNode;
  isLast?: boolean;
}

const InfoRow = ({ icon, label, value, isLast = false }: InfoRowProps) => (
  <div className={`flex items-center p-4 hover:bg-slate-50 transition-colors ${!isLast ? 'border-b border-slate-100' : ''}`}>
    {/* Icon Container */}
    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mr-4 flex-shrink-0">
      {icon}
    </div>
    
    {/* Text Content */}
    <div className="flex-grow">
      <p className="text-sm font-medium text-slate-500 mb-0.5">{label}</p>
      <div className="text-base font-semibold text-slate-800">{value}</div>
    </div>
  </div>
);


export default function Profile() {
  const { currentUser, userProfile, userRole, loading } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [therapistName, setTherapistName] = useState("Loading...");

useEffect(() => {
  const fetchTherapistName = async () => {
    const therapistId = (userProfile as PatientProfile).physiotherapist_assigned;

    if (therapistId) {
      // Replace 'db' and 'Physiotherapists' with your actual config
      const docRef = doc(db, "Physiotherapists", therapistId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setTherapistName(docSnap.data().name);
      } else {
        setTherapistName("Unknown Therapist");
      }
    } else {
      setTherapistName("Not Assigned");
    }
  };

  fetchTherapistName();
}, [userProfile]);
  

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F7F6]">
        <div className="animate-pulse text-lg text-slate-500">Loading profile...</div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F7F6]">
        <div className="text-lg text-red-600">Not logged in</div>
      </div>
    );
  }

  // Extract display values
  const displayName = userProfile?.displayName || currentUser.email?.split("@")[0] || "User";
  const email = currentUser.email || "—";
  const roleLabel = userRole === "physiotherapist" ? "Physiotherapist" : "Patient";

  return (
    <div className="min-h-screen bg-[#F4F7F6] py-10 px-4 font-sans">
      <div className="max-w-3xl mx-auto">
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Profile</h1>
          <p className="text-slate-500 mt-1">View and manage your account details.</p>
        </div>

        {/* --- SECTION 1: ACCOUNT --- */}
        <SectionHeader title="Account Information" />
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <InfoRow 
            icon={<UserIcon />} 
            label="Display Name" 
            value={displayName} 
          />
          <InfoRow 
            icon={<MailIcon />} 
            label="Email Address" 
            value={email} 
          />
          <InfoRow 
            icon={<BadgeIcon />} 
            label="Account Role" 
            value={<span className="capitalize">{roleLabel}</span>} 
            isLast={true}
          />
        </div>

        {/* --- SECTION 2: SPECIFIC DETAILS (Conditional) --- */}
        
        {userRole === "patient" && userProfile && (
          <>
            <SectionHeader title="Patient Details" />
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <InfoRow 
                icon={<PhoneIcon />} 
                label="Phone Number" 
                value={(userProfile as PatientProfile).phoneNum || "—"} 
              />
              {/* <InfoRow 
                icon={<UserIcon />} 
                label="Assigned Therapist" 
                value={(userProfile as PatientProfile).physiotherapist_assigned || "Not Assigned"} 
              /> */}

              <InfoRow 
                icon={<UserIcon />} 
                label="Assigned Therapist" 
                value={therapistName} 
              />
              
              <InfoRow 
                icon={<BadgeIcon />} 
                label="Avatar ID" 
                value={(userProfile as PatientProfile).selected_avatar_id || "Default"} 
                isLast={true}
              />
            </div>
          </>
        )}

        {userRole === "physiotherapist" && userProfile && (
          <>
            <SectionHeader title="Professional Details" />
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <InfoRow 
                icon={<BriefcaseIcon />} 
                label="Specialization" 
                value={(userProfile as PhysioProfile).specialization || "—"} 
              />
              <InfoRow 
                icon={<BadgeIcon />} 
                label="License Number" 
                value={(userProfile as PhysioProfile).licenseNumber || "—"} 
              />
              <InfoRow 
                icon={<PhoneIcon />} 
                label="Contact Phone" 
                value={(userProfile as PhysioProfile).phoneNumber || "—"} 
                isLast={true}
              />
            </div>
          </>
        )}

        {/* --- SECTION 3: ACTIONS --- */}
        <SectionHeader title="Session" />
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <button 
            onClick={() => setShowLogoutModal(true)}
            className="w-full flex items-center p-4 hover:bg-red-50 transition-colors text-left group"
          >
            <div className="w-12 h-12 rounded-full bg-red-50 group-hover:bg-red-100 flex items-center justify-center mr-4 transition-colors">
              <LogoutIcon />
            </div>
            <div>
              <p className="text-base font-semibold text-red-600">Log Out</p>
              <p className="text-sm text-red-400">Sign out of your account on this device</p>
            </div>
          </button>
        </div>

      </div>

      <Logout modal={showLogoutModal} setModal={setShowLogoutModal} />
    </div>
  );
}

// import { useState } from "react";
// import Logout from "./accounts/Logout";

// // Define the props expected by the Logout component
// interface LogoutProps {
//   modal: boolean;
//   setModal: React.Dispatch<React.SetStateAction<boolean>>;
// }

// export default function Profile() {
//   const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);
//   console.log("Logout component:", Logout);

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      
//       {/* Profile content */}
//       <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 w-full max-w-md text-center">
//         <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
//           Profile
//         </h1>

//         <p className="mt-2 text-gray-500 dark:text-gray-400">
//           This is your profile page.
//         </p>

//         {/* Logout button */}
//         <button
//           onClick={() => setShowLogoutModal(true)}
//           className="mt-6 px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none"
//         >
//           Logout
//         </button>
//       </div>

//       {/* Logout Modal */}
//       <Logout
//         modal={showLogoutModal}
//         setModal={setShowLogoutModal}
//       />
//     </div>
//   );
// }