// // src/components/Header.tsx
// // components/user/Header.tsx
// import { ChevronDown, Leaf } from "lucide-react";
// import { Link } from "react-router-dom";
// import avatarSana from "@/assets/avatar-sana.png";
// import { useAuth } from "@/contexts/AuthContext";

// const Header = () => {
//   const { currentUser, userProfile, userRole, loading } = useAuth();

//   if (loading) {
//     return (
//       <div className="px-6 py-4 bg-gradient-to-b from-[#289997] to-[#e0f2f0]">
//         <header className="flex items-center justify-between mb-4">
//           <div>
//             <h1 className="flex items-center gap-2 text-4xl font-bold px-10">
//               Your Recovery, Today
//               <Leaf className="w-6 h-6 text-emerald-600 opacity-80" />
//             </h1>
//             <p className="text-lg opacity-80 mt-1 px-10">
//               Guided Movement. Tracked Progress. Real Improvement.
//             </p>
//           </div>
//           <div className="w-10 h-10 rounded-full bg-white/30 animate-pulse" />
//         </header>
//       </div>
//     );
//   }

//   // ── Determine display values ──
//   let displayName = "User";
//   const displayRole = userRole || "Guest";

//   if (userProfile?.displayName) {
//     displayName = userProfile.displayName;
//   } else if (currentUser?.email) {
//     displayName = currentUser.email.split("@")[0];
//   }

//   // Optional: fallback name based on role if displayName is still generic
//   if (displayName === "User") {
//     if (userRole === "patient") displayName = "Patient";
//     if (userRole === "physiotherapist") displayName = "Physiotherapist";
//   }

//   const showRoleInHeader = true; // ← set to false in production if you want cleaner look

//   return (
//     <div className="px-6 py-4 bg-gradient-to-b from-[#289997] to-[#e0f2f0]">
//       <header className="flex items-center justify-between mb-4">
//         <div>
//           <h1 className="flex items-center gap-2 text-4xl font-bold px-10">
//             Your Recovery, Today
//             <Leaf className="w-6 h-6 text-emerald-600 opacity-80" />
//           </h1>
//           <p className="text-lg opacity-80 mt-1 px-10">
//             Guided Movement. Tracked Progress. Real Improvement.
//           </p>
//         </div>

//         <Link
//           to="/patient/profile"
//           className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity group"
//         >
//           <div className="text-right">
//             <p className="text-base font-semibold text-foreground group-hover:underline">
//               {displayName}
//             </p>
//             {showRoleInHeader && (
//               <p className="text-sm text-muted-foreground capitalize">
//                 {displayRole}
//               </p>
//             )}
//           </div>

//           <div className="w-10 h-10 rounded-full overflow-hidden border border-white/40 shadow-sm flex-shrink-0">
//             <img
//               src={avatarSana}
//               alt={displayName}
//               className="w-full h-full object-cover"
//             />
//           </div>

//           <ChevronDown className="w-4 h-4 text-muted-foreground" />
//         </Link>
//       </header>
//     </div>
//   );
// };

// export default Header;

// src/components/user/Header.tsx
import { ChevronDown, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import avatarSana from "@/assets/avatar-sana.png"; // patient fallback
// You can add more imports if you want therapist-specific fallback avatar
// import therapistAvatar from "@/assets/therapist-default.png";

import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const { currentUser, userProfile, userRole, loading } = useAuth();

  if (loading) {
    return (
      <div className="px-6 py-4 bg-gradient-to-b from-gray-700 to-gray-900 animate-pulse">
        <header className="flex items-center justify-between mb-4">
          <div className="h-10 w-64 bg-gray-600 rounded" />
          <div className="w-10 h-10 rounded-full bg-gray-600" />
        </header>
      </div>
    );
  }

  // ── Role-aware values ────────────────────────────────────────
  const isPatient = userRole === "patient";
  const isTherapist = userRole === "physiotherapist";

  // Dynamic profile link
  const profilePath = isTherapist
    ? "/therapist/profile"
    : isPatient
      ? "/patient/profile"
      : "/"; // fallback – should not happen

  // Display name logic
  let displayName = "User";
  const displayRole = userRole || "Guest";

  if (userProfile?.displayName) {
    displayName = userProfile.displayName;
  } else if (currentUser?.email) {
    displayName = currentUser.email.split("@")[0];
  }

  if (displayName === "User") {
    displayName = isPatient ? "Patient" : isTherapist ? "Physiotherapist" : "User";
  }

  

  // ── Styling per role ─────────────────────────────────────────
  const headerBg = isTherapist
    ? "bg-gradient-to-b from-indigo-700 to-indigo-950"   // example: therapist darker/professional
    : "bg-gradient-to-b from-[#289997] to-[#e0f2f0]";   // patient green/teal

  const titleColor = isTherapist ? "text-white" : "text-foreground";

  return (
    <div className={`px-6 py-4 ${headerBg}`}>
      <header className="flex items-center justify-between mb-4">
        <div>
          <h1 className={`flex items-center gap-2 text-4xl font-bold px-10 ${titleColor}`}>
            {isTherapist ? "Therapist Dashboard" : "Your Recovery, Today"}
            <Leaf className="w-6 h-6 text-emerald-400 opacity-80" />
          </h1>

          <p className={`text-lg opacity-80 mt-1 px-10 ${titleColor}`}>
            {isTherapist
              ? "Patient Management • Exercise Plans • Progress Tracking"
              : "Guided Movement. Tracked Progress. Real Improvement."}
          </p>
        </div>

        <Link
          to={profilePath}
          className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity group"
        >
          <div className="text-right">
            <p className={`text-base font-semibold ${isTherapist ? "text-white" : "text-foreground"} group-hover:underline`}>
              {displayName}
            </p>
            <p className={`text-sm ${isTherapist ? "text-indigo-200" : "text-muted-foreground"} capitalize`}>
              {displayRole}
            </p>
          </div>

          
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 shadow-sm group-hover:shadow-md transition-shadow">
              <span className="text-sm font-semibold text-primary">
                {isPatient? displayName.charAt(0).toUpperCase() : "G"}
              </span>
          </div>

          <ChevronDown className={`w-4 h-4 ${isTherapist ? "text-indigo-200" : "text-muted-foreground"}`} />
        </Link>
      </header>
    </div>
  );
};

export default Header;