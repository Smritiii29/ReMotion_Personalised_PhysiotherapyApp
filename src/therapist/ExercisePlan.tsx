// // src/therapist/ExercisePlans.tsx

// import { useState } from "react";
// import { format, addDays } from "date-fns";
// import { 
//   Plus, 
//   Search, 
//   Dumbbell, 
//   CheckCircle2, 
//   User, 
//   Calendar,
//   Target,
//   FileText,
//   Trash2
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Badge } from "@/components/ui/badge";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { ScrollArea } from "@/components/ui/scroll-area";

// const EXERCISES = [
//   { id: "e1", name: "Wall Slides", type: "Mobility", duration: "10 reps" },
//   { id: "e2", name: "Pendulum Swing", type: "Recovery", duration: "2 mins" },
//   { id: "e3", name: "External Rotation", type: "Strength", duration: "15 reps" },
//   { id: "e4", name: "Bicep Curls", type: "Strength", duration: "12 reps" },
//   { id: "e5", name: "Shoulder Press", type: "Strength", duration: "10 reps" },
//   { id: "e6", name: "Wrist Flexion", type: "Mobility", duration: "20 reps" },
// ];

// const MOCK_PATIENTS = [
//   { id: "p1", name: "Aarav Patel", condition: "Distal Bicep Repair" },
//   { id: "p2", name: "Diya Sharma", condition: "Rotator Cuff Tear" },
//   { id: "p3", name: "Rohan Gupta", condition: "ACL Reconstruction" },
//   { id: "p4", name: "Sanya Malhotra", condition: "Frozen Shoulder" },
// ];

// export default function ExercisePlans() {
//   const [activePlans, setActivePlans] = useState<any[]>([]);

//   const [isCreateModalOpen, setCreateModalOpen] = useState(false);
//   const [isAssignModalOpen, setAssignModalOpen] = useState(false);

//   // Program Form State
//   const [programName, setProgramName] = useState("");
//   const [description, setDescription] = useState("");
//   const [startDate, setStartDate] = useState(format(new Date(), "yyyy-MM-dd"));
//   const [totalDays, setTotalDays] = useState("42");
//   const [defaultMax, setDefaultMax] = useState("145");
//   const [defaultMin, setDefaultMin] = useState("0");
//   const [customMax, setCustomMax] = useState("");
//   const [accuracyThreshold, setAccuracyThreshold] = useState("85");
//   const [notes, setNotes] = useState("");

//   // Selection State
//   const [selectedExercises, setSelectedExercises] = useState<string[]>([]);
//   const [selectedPatients, setSelectedPatients] = useState<string[]>([]);
//   const [searchQuery, setSearchQuery] = useState("");

//   const endDate = addDays(new Date(startDate), parseInt(totalDays) || 0);

//   const toggleExercise = (id: string) => {
//     setSelectedExercises(prev =>
//       prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
//     );
//   };

//   const togglePatient = (id: string) => {
//     setSelectedPatients(prev =>
//       prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
//     );
//   };

//   const handleCreateProgram = () => {
//     if (!programName.trim()) {
//       alert("Program name is required");
//       return;
//     }

//     const newProgram = {
//       id: Date.now().toString(),
//       name: programName.trim(),
//       description: description.trim(),
//       start_date: new Date(startDate),
//       end_date: endDate,
//       total_days: parseInt(totalDays),
//       default_rom_targets: {
//         elbow_flexion: { min: parseInt(defaultMin), max: parseInt(defaultMax), unit: "degrees" }
//       },
//       custom_rom_targets: customMax ? {
//         elbow_flexion: { min: parseInt(defaultMin), max: parseInt(customMax), unit: "degrees" }
//       } : null,
//       default_accuracyThreshold: parseInt(accuracyThreshold),
//       notes: notes.trim(),
//       exercises: EXERCISES.filter(ex => selectedExercises.includes(ex.id)),
//       created_at: new Date(),
//     };

//     setCreateModalOpen(false);
//     setAssignModalOpen(true);
//     (window as any).tempProgram = newProgram;
//   };

//   const handleAssign = () => {
//     const program = (window as any).tempProgram;
//     if (!program || selectedPatients.length === 0) return;

//     const assignedTo = MOCK_PATIENTS.filter(p => selectedPatients.includes(p.id));

//     const assignedProgram = {
//       ...program,
//       assignedTo: assignedTo.map(p => ({ id: p.id, name: p.name })),
//       status: "active",
//     };

//     setActivePlans(prev => [assignedProgram, ...prev]);

//     delete (window as any).tempProgram;
//     setAssignModalOpen(false);
//     setSelectedPatients([]);
//     resetForm();

//     alert(`Program "${program.name}" assigned to ${assignedTo.length} patient(s)!`);
//   };

//   const handleDeletePlan = (planId: string) => {
//     if (confirm("Are you sure you want to delete this program?")) {
//       setActivePlans(prev => prev.filter(p => p.id !== planId));
//     }
//   };

//   const resetForm = () => {
//     setProgramName("");
//     setDescription("");
//     setStartDate(format(new Date(), "yyyy-MM-dd"));
//     setTotalDays("42");
//     setDefaultMax("145");
//     setDefaultMin("0");
//     setCustomMax("");
//     setAccuracyThreshold("85");
//     setNotes("");
//     setSelectedExercises([]);
//   };

//   const filteredExercises = EXERCISES.filter(ex =>
//     ex.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
//             Exercise Plans
//           </h1>
//           <p className="text-muted-foreground mt-1">
//             Create and assign personalized rehabilitation programs.
//           </p>
//         </div>
//         <Button onClick={() => setCreateModalOpen(true)} className="gap-2">
//           <Plus className="w-4 h-4" /> Create New Program
//         </Button>
//       </div>

//       {/* Active Plans */}
//       {activePlans.length > 0 ? (
//         <div className="space-y-4">
//           <h2 className="text-xl font-semibold">Active Programs ({activePlans.length})</h2>
//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {activePlans.map(plan => (
//               <div key={plan.id} className="rounded-xl border bg-card p-6 shadow-sm relative">
//                 <button
//                   onClick={() => handleDeletePlan(plan.id)}
//                   className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition"
//                   aria-label="Delete program"
//                 >
//                   <Trash2 className="w-5 h-5" />
//                 </button>

//                 <h3 className="font-bold text-lg pr-8">{plan.name}</h3>
//                 <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>

//                 <div className="flex flex-wrap gap-2 mt-4">
//                   <Badge variant="secondary"><Calendar className="w-3 h-3 mr-1" />{plan.total_days} days</Badge>
//                   <Badge variant="secondary">
//                     <Target className="w-3 h-3 mr-1" />
//                     ROM: 0–{plan.custom_rom_targets?.elbow_flexion.max ?? plan.default_rom_targets.elbow_flexion.max}°
//                   </Badge>
//                   <Badge variant="secondary">≥{plan.default_accuracyThreshold}% accuracy</Badge>
//                 </div>

//                 <div className="mt-4 text-xs text-muted-foreground">
//                   <p>Start: {format(plan.start_date, "dd MMM yyyy")}</p>
//                   <p>End: {format(plan.end_date, "dd MMM yyyy")}</p>
//                 </div>

//                 <p className="text-xs text-muted-foreground mt-3">
//                   Assigned to: {plan.assignedTo.map((p: any) => p.name).join(", ")}
//                 </p>

//                 {plan.notes && (
//                   <div className="mt-4 p-3 bg-muted/50 rounded-lg text-sm">
//                     <FileText className="w-4 h-4 inline mr-1" />
//                     <span className="font-medium">Notes:</span> {plan.notes}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       ) : (
//         <div className="rounded-2xl border border-dashed border-border bg-card/50 p-12 text-center">
//           <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
//             <Dumbbell className="h-8 w-8 text-primary" />
//           </div>
//           <h3 className="text-lg font-semibold">No Active Plans</h3>
//           <p className="text-muted-foreground max-w-sm mx-auto mt-2">
//             Click "Create New Program" to build and assign rehabilitation plans.
//           </p>
//         </div>
//       )}

//       {/* ================= CREATE PROGRAM MODAL ================= */}
//       <Dialog open={isCreateModalOpen} onOpenChange={setCreateModalOpen}>
//         <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
//           <DialogHeader>
//             <DialogTitle>Create Rehabilitation Program</DialogTitle>
//             <DialogDescription>
//               Define protocol details and select exercises.
//             </DialogDescription>
//           </DialogHeader>

//           <div className="space-y-6 py-4">
//             {/* Name & Description */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <Label>Program Name <span className="text-red-500">*</span></Label>
//                 <Input
//                   value={programName}
//                   onChange={(e) => setProgramName(e.target.value)}
//                   placeholder="e.g., Bicep Tendon Recovery – Phase 1"
//                 />
//               </div>
//               <div>
//                 <Label>Description</Label>
//                 <Input
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   placeholder="Safe strengthening after distal bicep repair"
//                 />
//               </div>
//             </div>

//             {/* Dates */}
//             <div className="grid grid-cols-3 gap-4">
//               <div>
//                 <Label>Start Date</Label>
//                 <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
//               </div>
//               <div>
//                 <Label>Total Days</Label>
//                 <Input type="number" value={totalDays} onChange={(e) => setTotalDays(e.target.value)} min="1" />
//               </div>
//               <div>
//                 <Label>End Date (Auto)</Label>
//                 <Input value={format(endDate, "dd MMM yyyy")} disabled className="bg-muted" />
//               </div>
//             </div>

//             {/* ROM Targets */}
//             <div>
//               <Label className="flex items-center gap-2 mb-2">
//                 <Target className="w-4 h-4" /> Elbow Flexion ROM Targets (degrees)
//               </Label>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <Label className="text-sm">Default Safe Range</Label>
//                   <div className="flex gap-2 mt-1">
//                     <Input type="number" value={defaultMin} onChange={(e) => setDefaultMin(e.target.value)} placeholder="Min" />
//                     <Input type="number" value={defaultMax} onChange={(e) => setDefaultMax(e.target.value)} placeholder="Max" />
//                   </div>
//                 </div>
//                 <div>
//                   <Label className="text-sm">Custom Limit (Optional)</Label>
//                   <Input
//                     type="number"
//                     value={customMax}
//                     onChange={(e) => setCustomMax(e.target.value)}
//                     placeholder="e.g., 135 (for pain restriction)"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Accuracy & Notes */}
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <Label>Minimum Accuracy Threshold (%)</Label>
//                 <Input type="number" value={accuracyThreshold} onChange={(e) => setAccuracyThreshold(e.target.value)} min="50" max="100" />
//               </div>
//               <div>
//                 <Label>Clinical Notes</Label>
//                 <Textarea
//                   value={notes}
//                   onChange={(e) => setNotes(e.target.value)}
//                   placeholder="e.g., Patient reports pain at 140°. Keep under 135°."
//                   rows={3}
//                 />
//               </div>
//             </div>

//             {/* Exercises */}
//             <div>
//               <Label className="mb-3 block">
//                 <Dumbbell className="w-4 h-4 inline mr-1" /> Select Exercises
//               </Label>

//               <div className="relative mb-4">
//                 <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
//                 <Input
//                   placeholder="Search exercises..."
//                   className="pl-9"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//               </div>

//               <ScrollArea className="h-64 rounded-md border p-4">
//                 <div className="space-y-3">
//                   {filteredExercises.map(ex => {
//                     const isSelected = selectedExercises.includes(ex.id);

//                     return (
//                       <div
//                         key={ex.id}
//                         className={`flex items-center justify-between p-3 rounded-lg border ${
//                           isSelected ? "border-primary bg-primary/5" : "border-border"
//                         }`}
//                       >
//                         <div className="flex items-center gap-3">
//                           <Dumbbell className="h-5 w-5 text-muted-foreground" />
//                           <div>
//                             <h4 className="font-medium">{ex.name}</h4>
//                             <p className="text-xs text-muted-foreground">{ex.type} • {ex.duration}</p>
//                           </div>
//                         </div>
//                         <Button
//                           size="sm"
//                           variant={isSelected ? "default" : "outline"}
//                           onClick={() => toggleExercise(ex.id)}
//                         >
//                           {isSelected ? "Added" : "Add"}
//                         </Button>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </ScrollArea>
//             </div>
//           </div>

//           <DialogFooter>
//             <Button variant="outline" onClick={() => setCreateModalOpen(false)}>
//               Cancel
//             </Button>
//             <Button onClick={handleCreateProgram} disabled={!programName.trim()}>
//               Proceed to Assign Patients
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       {/* ================= ASSIGN PATIENTS MODAL ================= */}
//       <Dialog open={isAssignModalOpen} onOpenChange={setAssignModalOpen}>
//         <DialogContent className="max-w-md">
//           <DialogHeader>
//             <DialogTitle>Assign Program to Patients</DialogTitle>
//             <DialogDescription>
//               Select one or more patients for this plan.
//             </DialogDescription>
//           </DialogHeader>

//           <ScrollArea className="max-h-96 pr-4">
//             <div className="space-y-3">
//               {MOCK_PATIENTS.map((patient) => (
//                 <div
//                   key={patient.id}
//                   className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-muted/30 transition"
//                 >
//                   <Checkbox
//                     id={patient.id}
//                     checked={selectedPatients.includes(patient.id)}
//                     onCheckedChange={() => togglePatient(patient.id)}
//                   />
//                   <label htmlFor={patient.id} className="flex-1 cursor-pointer">
//                     <div className="font-medium">{patient.name}</div>
//                     <div className="text-sm text-muted-foreground">{patient.condition}</div>
//                   </label>
//                 </div>
//               ))}
//             </div>
//           </ScrollArea>

//           <DialogFooter className="mt-4">
//             <Button variant="outline" onClick={() => setAssignModalOpen(false)}>
//               Cancel
//             </Button>
//             <Button
//               onClick={handleAssign}
//               disabled={selectedPatients.length === 0}
//             >
//               Assign to {selectedPatients.length} Patient{selectedPatients.length !== 1 ? "s" : ""}
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }
//##########################################################
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect } from "react";
// import { format, addDays } from "date-fns";
// import {
//   Plus,
//   Search,
//   Dumbbell,
//   UserPlus,
//   Calendar,
//   Trash2,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Badge } from "@/components/ui/badge";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import {
//   collection,
//   query,
//   getDocs,
//   addDoc,
//   serverTimestamp,
//   doc,
//   updateDoc,
//   arrayUnion,
// } from "firebase/firestore";
// import { db, auth } from "../config/firebase"; // ← make sure auth is exported too
// import { useAuthState } from "react-firebase-hooks/auth";

// // ──────────────────────────────────────────────
// // Types
// // ──────────────────────────────────────────────

// interface Exercise {
//   id: string;
//   name?: string;           // optional now – we fallback
//   description?: string;
//   type?: string;
//   defaultSets?: number;
//   defaultReps?: string | number;
//   defaultHoldTime?: number;
//   // ... add other fields if needed
// }

// interface Program {
//   id: string;
//   name: string;
//   description: string;
//   created_by: string;
//   totalDays: number;
//   exercises: string[];
//   created_at: any;
//   assignedPatients?: Array<{
//     patientUid: string;
//     customizations: Record<string, any>;
//   }>;
// }

// // ──────────────────────────────────────────────
// // Component
// // ──────────────────────────────────────────────

// export default function ExercisePlans() {
//   const [user, userLoading, userError] = useAuthState(auth);
// // Add this useEffect for debugging
// useEffect(() => {
//   if (user) {
//     console.log("CURRENT LOGGED-IN UID:", user.uid);
//     console.log("UID length:", user.uid.length);
//     console.log("First 8 chars:", user.uid.substring(0, 8));
//     console.log("Last 8 chars:", user.uid.substring(user.uid.length - 8));
//   } else {
//     console.log("No user logged in right now");
//   }
// }, [user]);
//   const [activePrograms, setActivePrograms] = useState<Program[]>([]);
//   const [exercises, setExercises] = useState<Exercise[]>([]);
//   const [loadingExercises, setLoadingExercises] = useState(true);
//   const [exercisesError, setExercisesError] = useState<string | null>(null);

//   const [isCreateOpen, setIsCreateOpen] = useState(false);
//   const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);
//   const [selectedProgramId, setSelectedProgramId] = useState<string | null>(null);

//   // Create program form
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [totalDays, setTotalDays] = useState("42");
//   const [searchExercise, setSearchExercise] = useState("");
//   const [selectedExerciseIds, setSelectedExerciseIds] = useState<string[]>([]);

//   // Assign patient form
//   const [selectedPatientUid, setSelectedPatientUid] = useState("");
//   const [customSets, setCustomSets] = useState("");
//   const [customReps, setCustomReps] = useState("");
//   const [customHold, setCustomHold] = useState("");
//   const [customRomMin, setCustomRomMin] = useState("");
//   const [customRomMax, setCustomRomMax] = useState("");
//   const [customNotes, setCustomNotes] = useState("");

//   // ──────────────────────────────────────────────
//   // Load exercises
//   // ──────────────────────────────────────────────

//   useEffect(() => {
//     if (!user) {
//       setLoadingExercises(false);
//       return;
//     }

//     async function fetchExercises() {
//       try {
//         setExercisesError(null);
//         setLoadingExercises(true);

//         console.log("Fetching Exercises as user:", user.uid);

//         const q = query(collection(db, "Exercises"));
//         const snap = await getDocs(q);

//         console.log("Exercises found:", snap.size);

//         const list = snap.docs.map((doc) => {
//           const data = doc.data();
//           return {
//             id: doc.id,
//             ...data,
//           } as Exercise;
//         });

//         // Sort by name or fallback to description or id
//         list.sort((a, b) => {
//           const aName = (a.name || a.description || a.id || "").toLowerCase();
//           const bName = (b.name || b.description || b.id || "").toLowerCase();
//           return aName.localeCompare(bName);
//         });

//         setExercises(list);
//       } catch (err: any) {
//         console.error("Exercises fetch error:", err);
//         const msg = err.code === "permission-denied"
//           ? "Permission denied. Make sure you are logged in as a physiotherapist with a document in /Physiotherapists."
//           : err.message || "Failed to load exercises";
//         setExercisesError(msg);
//       } finally {
//         setLoadingExercises(false);
//       }
//     }

//     fetchExercises();
//   }, [user]);

//   // ──────────────────────────────────────────────
//   // Computed values
//   // ──────────────────────────────────────────────

//   const filteredExercises = exercises.filter((ex) =>
//     (ex.name || ex.description || ex.id || "")
//       .toLowerCase()
//       .includes(searchExercise.toLowerCase())
//   );

//   const toggleExercise = (id: string) => {
//     setSelectedExerciseIds((prev) =>
//       prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
//     );
//   };

//   const resetCreateForm = () => {
//     setName("");
//     setDescription("");
//     setTotalDays("42");
//     setSelectedExerciseIds([]);
//     setSearchExercise("");
//   };

//   // ──────────────────────────────────────────────
//   // Create program
//   // ──────────────────────────────────────────────

//   const handleCreateProgram = async () => {
//     if (!user) {
//       alert("You must be logged in to create programs.");
//       return;
//     }
//     if (!name.trim() || selectedExerciseIds.length === 0) {
//       alert("Program name and at least one exercise are required.");
//       return;
//     }

//     try {
//       const docRef = await addDoc(collection(db, "programs"), {
//         name: name.trim(),
//         description: description.trim(),
//         created_by: user.uid,                    // ← FIXED: use real UID
//         totalDays: parseInt(totalDays) || 42,
//         exercises: selectedExerciseIds,
//         created_at: serverTimestamp(),
//         updatedAt: serverTimestamp(),
//       });

//       const newProgram: Program = {
//         id: docRef.id,
//         name: name.trim(),
//         description: description.trim(),
//         created_by: user.uid,
//         totalDays: parseInt(totalDays) || 42,
//         exercises: selectedExerciseIds,
//         created_at: new Date(),
//       };

//       setActivePrograms((prev) => [newProgram, ...prev]);
//       resetCreateForm();
//       setIsCreateOpen(false);
//       alert("Program created successfully!");
//     } catch (err: any) {
//       console.error("Create program failed:", err);
//       alert("Failed to create program: " + (err.message || "Unknown error"));
//     }
//   };

//   // ──────────────────────────────────────────────
//   // Assign patient (simplified – replace select with real query later)
//   // ──────────────────────────────────────────────

//   const handleAddPatientToProgram = async () => {
//     if (!selectedProgramId || !selectedPatientUid) return;

//     const customization: Record<string, any> = {};
//     if (customSets) customization.sets = parseInt(customSets);
//     if (customReps) customization.reps = customReps;
//     if (customHold) customization.holdTime = parseInt(customHold);
//     if (customRomMin || customRomMax) {
//       customization.romTargets = [{
//         joint: "elbow",
//         min: customRomMin ? parseInt(customRomMin) : 0,
//         max: customRomMax ? parseInt(customRomMax) : 145,
//         unit: "degrees",
//       }];
//     }
//     if (customNotes.trim()) customization.notes = customNotes.trim();

//     try {
//       const programRef = doc(db, "programs", selectedProgramId);
//       await updateDoc(programRef, {
//         assignedPatients: arrayUnion({
//           patientUid: selectedPatientUid,
//           customizations: customization,
//         }),
//         updatedAt: serverTimestamp(),
//       });

//       // Update local state
//       setActivePrograms((prev) =>
//         prev.map((p) =>
//           p.id === selectedProgramId
//             ? {
//                 ...p,
//                 assignedPatients: [
//                   ...(p.assignedPatients || []),
//                   { patientUid: selectedPatientUid, customizations: customization },
//                 ],
//               }
//             : p
//         )
//       );

//       setIsAddPatientOpen(false);
//       setSelectedPatientUid("");
//       setCustomSets("");
//       setCustomReps("");
//       setCustomHold("");
//       setCustomRomMin("");
//       setCustomRomMax("");
//       setCustomNotes("");
//       alert("Patient assigned successfully!");
//     } catch (err: any) {
//       console.error("Assign patient failed:", err);
//       alert("Failed to assign patient: " + err.message);
//     }
//   };

//   // ──────────────────────────────────────────────
//   // Render
//   // ──────────────────────────────────────────────

//   if (userLoading) {
//     return <div className="p-8 text-center">Loading authentication...</div>;
//   }

//   if (!user) {
//     return <div className="p-8 text-center">Please sign in to access this page.</div>;
//   }

//   return (
//     <div className="space-y-8 p-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-3xl font-bold text-[#155d57]">Exercise Plans</h1>
//           <p className="text-slate-600 mt-1">Create and assign personalized rehab programs</p>
//         </div>
//         <Button
//           onClick={() => setIsCreateOpen(true)}
//           className="bg-[#155d57] hover:bg-[#124a45] text-white gap-2"
//         >
//           <Plus className="w-4 h-4" /> Create Program
//         </Button>
//       </div>

//       {/* Loading / error state for exercises */}
//       {exercisesError && (
//         <div className="p-6 bg-red-50 border border-red-200 rounded-xl text-red-700">
//           <strong>Error loading exercises:</strong> {exercisesError}
//           <p className="mt-2 text-sm">
//             Most common cause: You need a document in the <code>Physiotherapists</code> collection with ID = your user UID ({user.uid.substring(0,8)}...).
//           </p>
//         </div>
//       )}

//       {/* Active Programs */}
//       {activePrograms.length > 0 ? (
//         <div className="space-y-6">
//           <h2 className="text-2xl font-semibold text-[#155d57]">
//             Your Programs ({activePrograms.length})
//           </h2>
//           {/* ... rest remains the same ... */}
//         </div>
//       ) : (
//         <div className="rounded-3xl border-2 border-dashed border-[#a9ebdf]/50 bg-white/50 p-12 text-center">
//           <Dumbbell className="mx-auto h-12 w-12 text-[#155d57]/40" />
//           <h3 className="mt-4 text-xl font-semibold text-[#155d57]">No Programs Yet</h3>
//           <p className="mt-2 text-slate-500">Create your first rehabilitation program above.</p>
//         </div>
//       )}

//       {/* CREATE DIALOG – unchanged except minor spacing */}
//       <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
//         <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl">
//           <DialogHeader className="bg-[#155d57] text-white p-6 -mx-6 -mt-6 rounded-t-3xl">
//             <DialogTitle className="text-2xl">Create Rehabilitation Program</DialogTitle>
//             <DialogDescription className="text-[#a9ebdf] mt-1">
//               Define name, duration and select exercises from library.
//             </DialogDescription>
//           </DialogHeader>

//           <div className="space-y-6 py-6">
//             {/* Name & Description */}
//             <div className="grid gap-4 md:grid-cols-2">
//               <div>
//                 <Label className="text-[#155d57] font-semibold">Program Name *</Label>
//                 <Input
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   placeholder="e.g. Bicep Tendon Recovery – Phase 1"
//                   className="mt-1"
//                 />
//               </div>
//               <div>
//                 <Label className="text-[#155d57] font-semibold">Description</Label>
//                 <Input
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   placeholder="Safe strengthening protocol..."
//                   className="mt-1"
//                 />
//               </div>
//             </div>

//             <div>
//               <Label className="text-[#155d57] font-semibold">Total Days</Label>
//               <Input
//                 type="number"
//                 value={totalDays}
//                 onChange={(e) => setTotalDays(e.target.value)}
//                 min={7}
//                 className="mt-1 w-40"
//               />
//             </div>

//             {/* Exercises */}
//             <div>
//               <Label className="text-[#155d57] font-semibold mb-3 block">
//                 <Dumbbell className="inline mr-2" /> Select Exercises
//               </Label>

//               <div className="relative mb-3">
//                 <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
//                 <Input
//                   placeholder="Search exercises..."
//                   className="pl-10"
//                   value={searchExercise}
//                   onChange={(e) => setSearchExercise(e.target.value)}
//                 />
//               </div>

//               <ScrollArea className="h-72 rounded-xl border">
//                 <div className="p-4 space-y-3">
//                   {loadingExercises ? (
//                     <p className="text-center text-slate-500 py-12">Loading exercise library...</p>
//                   ) : exercisesError ? (
//                     <p className="text-center text-red-600 py-12">{exercisesError}</p>
//                   ) : filteredExercises.length === 0 ? (
//                     <p className="text-center text-slate-400 py-12">
//                       {searchExercise ? "No matching exercises" : "No exercises found"}
//                     </p>
//                   ) : (
//                     filteredExercises.map((ex) => {
//                       const displayName =
//                         ex.name ||
//                         ex.description?.substring(0, 40) + "..." ||
//                         ex.id.replace("exercise_", "").replace(/_/g, " ");

//                       const isSelected = selectedExerciseIds.includes(ex.id);

//                       return (
//                         <div
//                           key={ex.id}
//                           className={`p-4 rounded-xl border transition-all ${
//                             isSelected
//                               ? "border-[#155d57] bg-[#a9ebdf]/10"
//                               : "border-slate-200 hover:border-[#a9ebdf]"
//                           }`}
//                         >
//                           <div className="flex justify-between items-start gap-4">
//                             <div className="flex-1">
//                               <h4 className="font-semibold text-[#155d57]">{displayName}</h4>
//                               <p className="text-sm text-slate-500 mt-1">
//                                 {ex.type || "—"} •{" "}
//                                 {ex.defaultSets ? `${ex.defaultSets} sets • ` : ""}
//                                 {ex.defaultReps || ex.defaultHoldTime
//                                   ? `${ex.defaultReps || ex.defaultHoldTime}`
//                                   : ""}
//                               </p>
//                             </div>
//                             <Button
//                               size="sm"
//                               variant={isSelected ? "default" : "outline"}
//                               className={isSelected ? "bg-[#155d57] hover:bg-[#124a45]" : ""}
//                               onClick={() => toggleExercise(ex.id)}
//                             >
//                               {isSelected ? "Added" : "Add"}
//                             </Button>
//                           </div>
//                         </div>
//                       );
//                     })
//                   )}
//                 </div>
//               </ScrollArea>
//             </div>
//           </div>

//           <DialogFooter className="pt-4 border-t">
//             <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
//               Cancel
//             </Button>
//             <Button
//               onClick={handleCreateProgram}
//               disabled={!name.trim() || selectedExerciseIds.length === 0}
//               className="bg-[#155d57] hover:bg-[#124a45] text-white"
//             >
//               Add Program
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       {/* ADD PATIENT DIALOG – unchanged for now */}
//       {/* ... your existing add patient dialog code ... */}
//     </div>
//   );
// }
//2222222222222222222222222222222222222
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useMemo } from "react";
// import { format, addDays } from "date-fns";
// import {
//   Plus,
//   Search,
//   Dumbbell,
//   UserPlus,
//   Calendar,
//   Trash2,
//   Users,
//   ChevronRight,
//   Save,
//   Activity,
//   RotateCcw,
//   Check,
//   X,
//   Settings,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Badge } from "@/components/ui/badge";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Separator } from "@/components/ui/separator";

// // ──────────────────────────────────────────────
// // Types
// // ──────────────────────────────────────────────

// interface RomTarget {
//   joint: string;
//   movement: string;
//   min: number;
//   max: number;
//   unit: string;
// }

// interface Exercise {
//   id: string;
//   name: string;
//   category: string;
//   type: "rep-based" | "hold-based" | "rom-based" | "cardio";
//   defaultSets: number;
//   defaultReps: string | number | null;
//   defaultHoldTime: number | null;
//   romTargets: RomTarget[] | null;
//   difficulty: string;
// }

// interface Program {
//   id: string;
//   name: string;
//   description: string;
//   totalDays: number;
//   defaultAccuracyThreshold: number;
//   exercises: string[]; // exercise IDs
//   createdAt: Date;
//   assignedPatients?: Array<{
//     patientId: string;
//     startDate: string;
//     customizations: Record<string, {
//       sets?: number;
//       reps?: string | number;
//       holdTime?: number;
//       romTargets?: RomTarget[];
//     }>;
//   }>;
// }

// // Mock data (replace with Firestore later)
// const MOCK_EXERCISES: Exercise[] = [
//   {
//     id: "exercise_bicep_curl",
//     name: "Bicep Curls",
//     category: "Strength",
//     type: "rep-based",
//     defaultSets: 3,
//     defaultReps: "10-12",
//     defaultHoldTime: null,
//     romTargets: [{ joint: "elbow", movement: "flexion", min: 0, max: 145, unit: "°" }],
//     difficulty: "intermediate",
//   },
//   {
//     id: "exercise_wall_slides",
//     name: "Wall Slides",
//     category: "Mobility",
//     type: "rep-based",
//     defaultSets: 3,
//     defaultReps: "10",
//     defaultHoldTime: null,
//     romTargets: [{ joint: "shoulder", movement: "flexion", min: 0, max: 160, unit: "°" }],
//     difficulty: "beginner",
//   },
//   {
//     id: "exercise_pendulum",
//     name: "Pendulum Swing",
//     category: "Recovery",
//     type: "hold-based",
//     defaultSets: 1,
//     defaultReps: null,
//     defaultHoldTime: 120,
//     romTargets: null,
//     difficulty: "beginner",
//   },
// ];

// const MOCK_PATIENTS = [
//   { id: "p1", name: "Aarav Patel", condition: "Distal Bicep Repair" },
//   { id: "p2", name: "Diya Sharma", condition: "Rotator Cuff Tear" },
//   { id: "p3", name: "Rohan Gupta", condition: "ACL Reconstruction" },
// ];

// export default function ExercisePlans() {
//   const [programs, setPrograms] = useState<Program[]>([]);

//   // Create modal
//   const [createOpen, setCreateOpen] = useState(false);
//   const [programName, setProgramName] = useState("");
//   const [programDesc, setProgramDesc] = useState("");
//   const [totalDays, setTotalDays] = useState("42");
//   const [accuracyThreshold, setAccuracyThreshold] = useState("85");
//   const [selectedExercises, setSelectedExercises] = useState<string[]>([]);
//   const [exerciseSearch, setExerciseSearch] = useState("");

//   // Assign flow
//   const [assignOpen, setAssignOpen] = useState(false);
//   const [customizeOpen, setCustomizeOpen] = useState(false);
//   const [currentProgram, setCurrentProgram] = useState<Program | null>(null);
//   const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
//   const [startDate, setStartDate] = useState(format(new Date(), "yyyy-MM-dd"));

//   // Per-exercise customization
//   const [customData, setCustomData] = useState<Record<string, any>>({});

//   // ──────────────────────────────────────────────
//   // Computed
//   // ──────────────────────────────────────────────

//   const filteredExercises = useMemo(() => {
//     if (!exerciseSearch.trim()) return MOCK_EXERCISES;
//     const term = exerciseSearch.toLowerCase();
//     return MOCK_EXERCISES.filter(
//       (ex) =>
//         ex.name.toLowerCase().includes(term) ||
//         ex.category.toLowerCase().includes(term)
//     );
//   }, [exerciseSearch]);

//   // ──────────────────────────────────────────────
//   // Handlers – Create Program
//   // ──────────────────────────────────────────────

//   const toggleExercise = (id: string) => {
//     setSelectedExercises((prev) =>
//       prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
//     );
//   };

//   const handleCreate = () => {
//     if (!programName.trim() || selectedExercises.length === 0) {
//       alert("Name and at least one exercise required.");
//       return;
//     }

//     const newProgram: Program = {
//       id: `prog_${Date.now()}`,
//       name: programName.trim(),
//       description: programDesc.trim(),
//       totalDays: parseInt(totalDays) || 42,
//       defaultAccuracyThreshold: parseInt(accuracyThreshold) || 85,
//       exercises: selectedExercises,
//       createdAt: new Date(),
//       assignedPatients: [],
//     };

//     setPrograms((prev) => [newProgram, ...prev]);
//     resetCreate();
//     setCreateOpen(false);
//   };

//   const resetCreate = () => {
//     setProgramName("");
//     setProgramDesc("");
//     setTotalDays("42");
//     setAccuracyThreshold("85");
//     setSelectedExercises([]);
//     setExerciseSearch("");
//   };

//   // ──────────────────────────────────────────────
//   // Handlers – Assign & Customize
//   // ──────────────────────────────────────────────

//   const startAssign = (program: Program) => {
//     setCurrentProgram(program);
//     setSelectedPatientId(null);
//     setAssignOpen(true);
//   };

//   const selectPatient = (id: string) => {
//     setSelectedPatientId(id);
//   };

//   const goToCustomize = () => {
//     if (!currentProgram || !selectedPatientId) return;

//     const initialCustom: Record<string, any> = {};
//     currentProgram.exercises.forEach((exId) => {
//       const ex = MOCK_EXERCISES.find((e) => e.id === exId);
//       if (ex) {
//         initialCustom[exId] = {
//           sets: ex.defaultSets,
//           reps: ex.defaultReps,
//           holdTime: ex.defaultHoldTime,
//           romTargets: ex.romTargets ? [...ex.romTargets] : null,
//         };
//       }
//     });

//     setCustomData(initialCustom);
//     setAssignOpen(false);
//     setCustomizeOpen(true);
//   };

//   const updateCustom = (exId: string, field: string, value: any) => {
//     setCustomData((prev) => ({
//       ...prev,
//       [exId]: {
//         ...prev[exId],
//         [field]: value,
//       },
//     }));
//   };

//   const updateRom = (exId: string, index: number, field: "min" | "max", val: string) => {
//     setCustomData((prev) => {
//       const rom = [...(prev[exId]?.romTargets || [])];
//       if (rom[index]) {
//         rom[index] = { ...rom[index], [field]: parseInt(val) || 0 };
//       }
//       return {
//         ...prev,
//         [exId]: { ...prev[exId], romTargets: rom },
//       };
//     });
//   };

//   const confirmAssign = () => {
//     if (!currentProgram || !selectedPatientId) return;

//     const patientAssignment = {
//       patientId: selectedPatientId,
//       startDate,
//       customizations: customData,
//     };

//     setPrograms((prev) =>
//       prev.map((p) =>
//         p.id === currentProgram.id
//           ? {
//               ...p,
//               assignedPatients: [...(p.assignedPatients || []), patientAssignment],
//             }
//           : p
//       )
//     );

//     setCustomizeOpen(false);
//     setCurrentProgram(null);
//     setSelectedPatientId(null);
//     alert("Patient assigned with custom settings!");
//   };

//   // ──────────────────────────────────────────────
//   // Render
//   // ──────────────────────────────────────────────

//   return (
//     <div className="space-y-8 p-6 max-w-7xl mx-auto">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <div>
//           <h1 className="text-3xl font-bold text-[#155d57]">Exercise Plans</h1>
//           <p className="text-slate-600 mt-1">
//             Create program templates and assign customized versions to patients.
//           </p>
//         </div>
//         <Button
//           onClick={() => setCreateOpen(true)}
//           className="bg-[#155d57] hover:bg-[#124a45] text-white gap-2"
//         >
//           <Plus className="w-4 h-4" /> Create Program
//         </Button>
//       </div>

//       {/* Programs Grid */}
//       {programs.length === 0 ? (
//         <div className="rounded-3xl border-2 border-dashed border-[#a9ebdf]/50 bg-white/50 p-12 text-center">
//           <Dumbbell className="mx-auto h-12 w-12 text-[#155d57]/40" />
//           <h3 className="mt-4 text-xl font-semibold text-[#155d57]">No Programs Yet</h3>
//           <p className="mt-2 text-slate-500">Create your first program template above.</p>
//         </div>
//       ) : (
//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {programs.map((prog) => (
//             <div
//               key={prog.id}
//               className="rounded-2xl border bg-white shadow-sm hover:shadow-md transition-all p-6"
//             >
//               <div className="flex justify-between items-start">
//                 <h3 className="font-bold text-xl text-[#155d57]">{prog.name}</h3>
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="text-red-500 hover:text-red-600"
//                   onClick={() => setPrograms((prev) => prev.filter((p) => p.id !== prog.id))}
//                 >
//                   <Trash2 className="w-4 h-4" />
//                 </Button>
//               </div>

//               <p className="text-sm text-slate-600 mt-2 line-clamp-2">{prog.description || "No description"}</p>

//               <div className="flex flex-wrap gap-2 mt-4">
//                 <Badge className="bg-[#a9ebdf]/30 text-[#155d57] hover:bg-[#a9ebdf]/50">
//                   <Calendar className="w-3 h-3 mr-1" /> {prog.totalDays} days
//                 </Badge>
//                 <Badge className="bg-[#fbd7ba]/30 text-[#155d57] hover:bg-[#fbd7ba]/50">
//                   ≥{prog.defaultAccuracyThreshold}% accuracy
//                 </Badge>
//                 <Badge className="bg-slate-100 text-slate-600">
//                   {prog.exercises.length} exercises
//                 </Badge>
//               </div>

//               <div className="mt-6">
//                 <Button
//                   variant="outline"
//                   className="w-full border-[#155d57] text-[#155d57] hover:bg-[#155d57]/10"
//                   onClick={() => startAssign(prog)}
//                 >
//                   <UserPlus className="w-4 h-4 mr-2" /> Assign to Patient
//                 </Button>
//               </div>

//               {prog.assignedPatients && prog.assignedPatients.length > 0 && (
//                 <div className="mt-4 text-sm text-slate-600">
//                   Assigned to {prog.assignedPatients.length} patient(s)
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}

//       {/* ── CREATE PROGRAM ── */}
//       <Dialog open={createOpen} onOpenChange={setCreateOpen}>
//         <DialogContent className="max-w-3xl rounded-3xl">
//           <DialogHeader className="bg-[#155d57] text-white p-6 -mx-6 -mt-6 rounded-t-3xl">
//             <DialogTitle className="text-2xl">Create Program Template</DialogTitle>
//             <DialogDescription className="text-[#a9ebdf] mt-1">
//               Define name, duration, accuracy and select exercises.
//             </DialogDescription>
//           </DialogHeader>

//           <div className="space-y-6 py-6">
//             <div className="grid gap-4 md:grid-cols-2">
//               <div>
//                 <Label className="text-[#155d57] font-semibold">Program Name *</Label>
//                 <Input
//                   value={programName}
//                   onChange={(e) => setProgramName(e.target.value)}
//                   placeholder="e.g. Bicep Tendon Recovery – Phase 1"
//                   className="mt-1"
//                 />
//               </div>
//               <div>
//                 <Label className="text-[#155d57] font-semibold">Description</Label>
//                 <Input
//                   value={programDesc}
//                   onChange={(e) => setProgramDesc(e.target.value)}
//                   placeholder="Safe post-surgical strengthening"
//                   className="mt-1"
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-3 gap-4">
//               <div>
//                 <Label className="text-[#155d57] font-semibold">Total Days</Label>
//                 <Input
//                   type="number"
//                   value={totalDays}
//                   onChange={(e) => setTotalDays(e.target.value)}
//                   min={7}
//                   className="mt-1"
//                 />
//               </div>
//               <div>
//                 <Label className="text-[#155d57] font-semibold">Accuracy Threshold (%)</Label>
//                 <Input
//                   type="number"
//                   value={accuracyThreshold}
//                   onChange={(e) => setAccuracyThreshold(e.target.value)}
//                   min={50}
//                   max={100}
//                   className="mt-1"
//                 />
//               </div>
//               <div>
//                 <Label className="text-[#155d57] font-semibold">End Date (auto)</Label>
//                 <div className="mt-1 h-10 flex items-center px-3 bg-slate-100 rounded-md text-slate-600">
//                   {totalDays ? format(addDays(new Date(), parseInt(totalDays)), "dd MMM yyyy") : "—"}
//                 </div>
//               </div>
//             </div>

//             {/* Exercises */}
//             <div>
//               <Label className="text-[#155d57] font-semibold mb-3 block">
//                 <Dumbbell className="inline mr-2" /> Select Exercises
//               </Label>
//               <div className="relative mb-3">
//                 <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
//                 <Input
//                   placeholder="Search exercises..."
//                   className="pl-10"
//                   value={exerciseSearch}
//                   onChange={(e) => setExerciseSearch(e.target.value)}
//                 />
//               </div>

//               <ScrollArea className="h-64 rounded-xl border bg-white/50">
//                 <div className="p-4 space-y-3">
//                   {filteredExercises.map((ex) => {
//                     const selected = selectedExercises.includes(ex.id);
//                     return (
//                       <div
//                         key={ex.id}
//                         className={`p-4 rounded-xl border transition-all ${
//                           selected ? "border-[#155d57] bg-[#a9ebdf]/10" : "border-slate-200 hover:border-[#a9ebdf]"
//                         }`}
//                       >
//                         <div className="flex justify-between items-center">
//                           <div>
//                             <h4 className="font-semibold text-[#155d57]">{ex.name}</h4>
//                             <p className="text-sm text-slate-500">
//                               {ex.category} • {ex.type}{" "}
//                               {ex.type === "rep-based" && `• ${ex.defaultReps} reps`}
//                               {ex.type === "hold-based" && `• ${ex.defaultHoldTime}s`}
//                             </p>
//                           </div>
//                           <Button
//                             size="sm"
//                             variant={selected ? "default" : "outline"}
//                             className={selected ? "bg-[#155d57] hover:bg-[#124a45]" : ""}
//                             onClick={() => toggleExercise(ex.id)}
//                           >
//                             {selected ? "Added" : "Add"}
//                           </Button>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </ScrollArea>
//             </div>
//           </div>

//           <DialogFooter>
//             <Button variant="outline" onClick={() => setCreateOpen(false)}>
//               Cancel
//             </Button>
//             <Button
//               onClick={handleCreate}
//               disabled={!programName.trim() || selectedExercises.length === 0}
//               className="bg-[#155d57] hover:bg-[#124a45]"
//             >
//               Create Program
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       {/* ── SELECT PATIENT (one at a time) ── */}
//       <Dialog open={assignOpen} onOpenChange={setAssignOpen}>
//         <DialogContent className="max-w-md rounded-3xl">
//           <DialogHeader className="bg-[#155d57] text-white p-6 -mx-6 -mt-6 rounded-t-3xl">
//             <DialogTitle className="text-xl flex items-center gap-2">
//               <UserPlus className="w-5 h-5" /> Assign to Patient
//             </DialogTitle>
//             <DialogDescription className="text-[#a9ebdf]">
//               Choose one patient for <strong>{currentProgram?.name}</strong>
//             </DialogDescription>
//           </DialogHeader>

//           <ScrollArea className="max-h-80 mt-4">
//             <div className="space-y-3 pr-4">
//               {MOCK_PATIENTS.map((p) => (
//                 <div
//                   key={p.id}
//                   onClick={() => selectPatient(p.id)}
//                   className={`p-4 rounded-xl border cursor-pointer transition-all ${
//                     selectedPatientId === p.id
//                       ? "border-[#155d57] bg-[#a9ebdf]/10"
//                       : "border-slate-200 hover:border-[#a9ebdf]"
//                   }`}
//                 >
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 rounded-full bg-[#155d57]/10 flex items-center justify-center text-[#155d57] font-medium">
//                       {p.name[0]}
//                     </div>
//                     <div>
//                       <p className="font-medium text-[#155d57]">{p.name}</p>
//                       <p className="text-sm text-slate-500">{p.condition}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </ScrollArea>

//           <DialogFooter className="mt-6">
//             <Button variant="outline" onClick={() => setAssignOpen(false)}>
//               Cancel
//             </Button>
//             <Button
//               onClick={goToCustomize}
//               disabled={!selectedPatientId}
//               className="bg-[#155d57] hover:bg-[#124a45]"
//             >
//               Customize & Assign
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       {/* ── CUSTOMIZE PER PATIENT ── */}
//       <Dialog open={customizeOpen} onOpenChange={setCustomizeOpen}>
//         <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl">
//           <DialogHeader className="bg-[#155d57] text-white p-6 -mx-6 -mt-6 rounded-t-3xl">
//             <DialogTitle className="text-xl">Customize for {MOCK_PATIENTS.find(p => p.id === selectedPatientId)?.name}</DialogTitle>
//             <DialogDescription className="text-[#a9ebdf]">
//               Adjust parameters for <strong>{currentProgram?.name}</strong>
//             </DialogDescription>
//           </DialogHeader>

//           <div className="p-6 space-y-8">
//             {/* Date range */}
//             <div className="grid grid-cols-2 gap-6">
//               <div>
//                 <Label className="text-[#155d57] font-semibold">Start Date</Label>
//                 <Input
//                   type="date"
//                   value={startDate}
//                   onChange={(e) => setStartDate(e.target.value)}
//                   className="mt-1"
//                 />
//               </div>
//               <div>
//                 <Label className="text-[#155d57] font-semibold">End Date (auto)</Label>
//                 <div className="mt-1 h-10 px-4 flex items-center bg-slate-100 rounded-md text-slate-700">
//                   {startDate && totalDays
//                     ? format(addDays(new Date(startDate), currentProgram?.totalDays || 42), "dd MMM yyyy")
//                     : "—"}
//                 </div>
//               </div>
//             </div>

//             <Separator />

//             {/* Per-exercise customization */}
//             <div className="space-y-6">
//               <h3 className="font-semibold text-lg text-[#155d57] flex items-center gap-2">
//                 <Settings className="w-5 h-5" /> Exercise Customizations
//               </h3>

//               {currentProgram?.exercises.map((exId) => {
//                 const ex = MOCK_EXERCISES.find((e) => e.id === exId);
//                 if (!ex) return null;

//                 const custom = customData[exId] || {};

//                 return (
//                   <div key={exId} className="border rounded-xl p-5 bg-white shadow-sm">
//                     <div className="flex justify-between items-center mb-4">
//                       <h4 className="font-bold text-[#155d57]">{ex.name}</h4>
//                       <Badge variant="outline">{ex.type}</Badge>
//                     </div>

//                     <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
//                       <div>
//                         <Label className="text-sm text-slate-600">Sets</Label>
//                         <Input
//                           type="number"
//                           value={custom.sets ?? ex.defaultSets}
//                           onChange={(e) => updateCustom(exId, "sets", parseInt(e.target.value))}
//                           min={1}
//                           className="mt-1"
//                         />
//                       </div>

//                       {ex.type === "rep-based" && (
//                         <div>
//                           <Label className="text-sm text-slate-600">Reps</Label>
//                           <Input
//                             value={custom.reps ?? ex.defaultReps ?? ""}
//                             onChange={(e) => updateCustom(exId, "reps", e.target.value)}
//                             className="mt-1"
//                           />
//                         </div>
//                       )}

//                       {ex.type === "hold-based" && (
//                         <div>
//                           <Label className="text-sm text-slate-600">Hold Time (s)</Label>
//                           <Input
//                             type="number"
//                             value={custom.holdTime ?? ex.defaultHoldTime ?? 0}
//                             onChange={(e) => updateCustom(exId, "holdTime", parseInt(e.target.value))}
//                             min={0}
//                             className="mt-1"
//                           />
//                         </div>
//                       )}
//                     </div>

//                     {ex.romTargets && ex.romTargets.length > 0 && (
//                       <div className="mt-4 pt-4 border-t">
//                         <Label className="text-sm font-medium text-slate-600 mb-2 block">
//                           Range of Motion Targets ({ex.romTargets[0].unit})
//                         </Label>
//                         {ex.romTargets.map((rom, idx) => (
//                           <div key={idx} className="flex items-center gap-4 mb-2">
//                             <span className="w-32 text-sm font-medium capitalize">{rom.joint} {rom.movement}:</span>
//                             <div className="flex items-center gap-2">
//                               <Input
//                                 type="number"
//                                 value={custom.romTargets?.[idx]?.min ?? rom.min}
//                                 onChange={(e) => updateRom(exId, idx, "min", e.target.value)}
//                                 className="w-20"
//                               />
//                               <span className="text-slate-400">–</span>
//                               <Input
//                                 type="number"
//                                 value={custom.romTargets?.[idx]?.max ?? rom.max}
//                                 onChange={(e) => updateRom(exId, idx, "max", e.target.value)}
//                                 className="w-20"
//                               />
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           <DialogFooter className="p-6 border-t">
//             <Button variant="outline" onClick={() => setCustomizeOpen(false)}>
//               Cancel
//             </Button>
//             <Button
//               onClick={confirmAssign}
//               className="bg-[#155d57] hover:bg-[#124a45] gap-2"
//             >
//               <Save className="w-4 h-4" /> Save & Assign
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useMemo } from "react";
import { format, addDays } from "date-fns";
import {
  Plus,
  Search,
  Dumbbell,
  UserPlus,
  Calendar,
  Trash2,
  Users,
  ChevronRight,
  Save,
  Activity,
  RotateCcw,
  Check,
  X,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db, auth } from "../config/firebase"; // adjust path if needed
import { useAuthState } from "react-firebase-hooks/auth";

// ──────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────

interface RomTarget {
  joint: string;
  movement: string;
  min: number;
  max: number;
  unit: string;
}

interface Exercise {
  id: string;
  name: string;
  category: string;
  type: "rep-based" | "hold-based" | "rom-based" | "cardio";
  defaultSets: number;
  defaultReps: string | number | null;
  defaultHoldTime: number | null;
  romTargets: RomTarget[] | null;
  difficulty: string;
}

interface Program {
  id: string;
  name: string;
  description: string;
  totalDays: number;
  defaultAccuracyThreshold: number;
  exercises: string[]; // exercise IDs
  createdAt: Date;
  assignedPatients?: Array<{
    patientId: string;
    startDate: string;
    customizations: Record<string, {
      sets?: number;
      reps?: string | number;
      holdTime?: number;
      romTargets?: RomTarget[];
    }>;
  }>;
}

interface Patient {
  id: string;
  name: string;
  condition?: string; // optional – you can add more fields later
}

// ──────────────────────────────────────────────
// Component
// ──────────────────────────────────────────────

export default function ExercisePlans() {
  const [user, userLoading] = useAuthState(auth);

  const [programs, setPrograms] = useState<Program[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);

  const [loadingExercises, setLoadingExercises] = useState(true);
  const [loadingPatients, setLoadingPatients] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Create modal states
  const [createOpen, setCreateOpen] = useState(false);
  const [programName, setProgramName] = useState("");
  const [programDesc, setProgramDesc] = useState("");
  const [totalDays, setTotalDays] = useState("42");
  const [accuracyThreshold, setAccuracyThreshold] = useState("85");
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);
  const [exerciseSearch, setExerciseSearch] = useState("");

  // Assign flow states
  const [assignOpen, setAssignOpen] = useState(false);
  const [customizeOpen, setCustomizeOpen] = useState(false);
  const [currentProgram, setCurrentProgram] = useState<Program | null>(null);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [startDate, setStartDate] = useState(format(new Date(), "yyyy-MM-dd"));

  // Per-exercise customization
  const [customData, setCustomData] = useState<Record<string, any>>({});

  // ──────────────────────────────────────────────
  // Load data from Firestore
  // ──────────────────────────────────────────────

  // Load exercises
  useEffect(() => {
    async function fetchExercises() {
      if (!user) return;
      try {
        setLoadingExercises(true);
        const q = query(collection(db, "Exercises"));
        const snapshot = await getDocs(q);
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Exercise[];
        setExercises(items);
      } catch (err: any) {
        console.error("Error loading exercises:", err);
        setError("Failed to load exercises: " + err.message);
      } finally {
        setLoadingExercises(false);
      }
    }
    fetchExercises();
  }, [user]);

  // Load patients
  useEffect(() => {
    async function fetchPatients() {
      if (!user) return;
      try {
        setLoadingPatients(true);
        // You can add: where("physiotherapistAssigned", "==", user.uid)
        const q = query(
          collection(db, "Users"),
          where("role", "==", "patient")
        );
        const snapshot = await getDocs(q);
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name || "Unnamed",
          condition: doc.data().condition || "", // optional field
        })) as Patient[];
        setPatients(items);
      } catch (err: any) {
        console.error("Error loading patients:", err);
        setError("Failed to load patients: " + err.message);
      } finally {
        setLoadingPatients(false);
      }
    }
    fetchPatients();
  }, [user]);

  // ──────────────────────────────────────────────
  // Computed
  // ──────────────────────────────────────────────

  const filteredExercises = useMemo(() => {
    if (!exerciseSearch.trim()) return exercises;
    const term = exerciseSearch.toLowerCase();
    return exercises.filter(
      (ex) =>
        ex.name?.toLowerCase().includes(term) ||
        ex.category?.toLowerCase().includes(term)
    );
  }, [exercises, exerciseSearch]);

  // ──────────────────────────────────────────────
  // Handlers – Create Program
  // ──────────────────────────────────────────────

  const toggleExercise = (id: string) => {
    setSelectedExercises((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  const handleCreate = () => {
    if (!programName.trim() || selectedExercises.length === 0) {
      alert("Name and at least one exercise required.");
      return;
    }

    const newProgram: Program = {
      id: `prog_${Date.now()}`,
      name: programName.trim(),
      description: programDesc.trim(),
      totalDays: parseInt(totalDays) || 42,
      defaultAccuracyThreshold: parseInt(accuracyThreshold) || 85,
      exercises: selectedExercises,
      createdAt: new Date(),
      assignedPatients: [],
    };

    setPrograms((prev) => [newProgram, ...prev]);
    resetCreate();
    setCreateOpen(false);
  };

  const resetCreate = () => {
    setProgramName("");
    setProgramDesc("");
    setTotalDays("42");
    setAccuracyThreshold("85");
    setSelectedExercises([]);
    setExerciseSearch("");
  };

  // ──────────────────────────────────────────────
  // Handlers – Assign & Customize
  // ──────────────────────────────────────────────

  const startAssign = (program: Program) => {
    setCurrentProgram(program);
    setSelectedPatientId(null);
    setAssignOpen(true);
  };

  const selectPatient = (id: string) => {
    setSelectedPatientId(id);
  };

  const goToCustomize = () => {
    if (!currentProgram || !selectedPatientId) return;

    const initialCustom: Record<string, any> = {};
    currentProgram.exercises.forEach((exId) => {
      const ex = exercises.find((e) => e.id === exId);
      if (ex) {
        initialCustom[exId] = {
          sets: ex.defaultSets,
          reps: ex.defaultReps,
          holdTime: ex.defaultHoldTime,
          romTargets: ex.romTargets ? [...ex.romTargets] : null,
        };
      }
    });

    setCustomData(initialCustom);
    setAssignOpen(false);
    setCustomizeOpen(true);
  };

  const updateCustom = (exId: string, field: string, value: any) => {
    setCustomData((prev) => ({
      ...prev,
      [exId]: {
        ...prev[exId],
        [field]: value,
      },
    }));
  };

  const updateRom = (exId: string, index: number, field: "min" | "max", val: string) => {
    setCustomData((prev) => {
      const rom = [...(prev[exId]?.romTargets || [])];
      if (rom[index]) {
        rom[index] = { ...rom[index], [field]: parseInt(val) || 0 };
      }
      return {
        ...prev,
        [exId]: { ...prev[exId], romTargets: rom },
      };
    });
  };

  const confirmAssign = () => {
    if (!currentProgram || !selectedPatientId) return;

    const patientAssignment = {
      patientId: selectedPatientId,
      startDate,
      customizations: customData,
    };

    setPrograms((prev) =>
      prev.map((p) =>
        p.id === currentProgram.id
          ? {
              ...p,
              assignedPatients: [...(p.assignedPatients || []), patientAssignment],
            }
          : p
      )
    );

    setCustomizeOpen(false);
    setCurrentProgram(null);
    setSelectedPatientId(null);
    alert("Patient assigned with custom settings!");
  };

  // ──────────────────────────────────────────────
  // Render
  // ──────────────────────────────────────────────

  if (userLoading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#155d57]">Exercise Plans</h1>
          <p className="text-slate-600 mt-1">
            Create program templates and assign customized versions to patients.
          </p>
        </div>
        <Button
          onClick={() => setCreateOpen(true)}
          className="bg-[#155d57] hover:bg-[#124a45] text-white gap-2"
        >
          <Plus className="w-4 h-4" /> Create Program
        </Button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
          {error}
        </div>
      )}

      {/* Programs Grid */}
      {programs.length === 0 ? (
        <div className="rounded-3xl border-2 border-dashed border-[#a9ebdf]/50 bg-white/50 p-12 text-center">
          <Dumbbell className="mx-auto h-12 w-12 text-[#155d57]/40" />
          <h3 className="mt-4 text-xl font-semibold text-[#155d57]">No Programs Yet</h3>
          <p className="mt-2 text-slate-500">Create your first program template above.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((prog) => (
            <div
              key={prog.id}
              className="rounded-2xl border bg-white shadow-sm hover:shadow-md transition-all p-6"
            >
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-xl text-[#155d57]">{prog.name}</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-600"
                  onClick={() => setPrograms((prev) => prev.filter((p) => p.id !== prog.id))}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <p className="text-sm text-slate-600 mt-2 line-clamp-2">{prog.description || "No description"}</p>

              <div className="flex flex-wrap gap-2 mt-4">
                <Badge className="bg-[#a9ebdf]/30 text-[#155d57] hover:bg-[#a9ebdf]/50">
                  <Calendar className="w-3 h-3 mr-1" /> {prog.totalDays} days
                </Badge>
                <Badge className="bg-[#fbd7ba]/30 text-[#155d57] hover:bg-[#fbd7ba]/50">
                  ≥{prog.defaultAccuracyThreshold}% accuracy
                </Badge>
                <Badge className="bg-slate-100 text-slate-600">
                  {prog.exercises.length} exercises
                </Badge>
              </div>

              <div className="mt-6">
                <Button
                  variant="outline"
                  className="w-full border-[#155d57] text-[#155d57] hover:bg-[#155d57]/10"
                  onClick={() => startAssign(prog)}
                >
                  <UserPlus className="w-4 h-4 mr-2" /> Assign to Patient
                </Button>
              </div>

              {prog.assignedPatients && prog.assignedPatients.length > 0 && (
                <div className="mt-4 text-sm text-slate-600">
                  Assigned to {prog.assignedPatients.length} patient(s)
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* CREATE PROGRAM DIALOG */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="max-w-3xl rounded-3xl">
          <DialogHeader className="bg-[#155d57] text-white p-6 -mx-6 -mt-6 rounded-t-3xl">
            <DialogTitle className="text-2xl">Create Program Template</DialogTitle>
            <DialogDescription className="text-[#a9ebdf] mt-1">
              Define name, duration, accuracy and select exercises.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-6">
            {/* Name & Description */}
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label className="text-[#155d57] font-semibold">Program Name *</Label>
                <Input
                  value={programName}
                  onChange={(e) => setProgramName(e.target.value)}
                  placeholder="e.g. Bicep Tendon Recovery – Phase 1"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-[#155d57] font-semibold">Description</Label>
                <Input
                  value={programDesc}
                  onChange={(e) => setProgramDesc(e.target.value)}
                  placeholder="Safe post-surgical strengthening"
                  className="mt-1"
                />
              </div>
            </div>

            {/* Duration & Accuracy */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="text-[#155d57] font-semibold">Total Days</Label>
                <Input
                  type="number"
                  value={totalDays}
                  onChange={(e) => setTotalDays(e.target.value)}
                  min={7}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-[#155d57] font-semibold">Accuracy Threshold (%)</Label>
                <Input
                  type="number"
                  value={accuracyThreshold}
                  onChange={(e) => setAccuracyThreshold(e.target.value)}
                  min={50}
                  max={100}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-[#155d57] font-semibold">End Date (auto)</Label>
                <div className="mt-1 h-10 flex items-center px-3 bg-slate-100 rounded-md text-slate-600">
                  {totalDays ? format(addDays(new Date(), parseInt(totalDays)), "dd MMM yyyy") : "—"}
                </div>
              </div>
            </div>

            {/* Exercises */}
            <div>
              <Label className="text-[#155d57] font-semibold mb-3 block">
                <Dumbbell className="inline mr-2" /> Select Exercises
              </Label>
              <div className="relative mb-3">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search exercises..."
                  className="pl-10"
                  value={exerciseSearch}
                  onChange={(e) => setExerciseSearch(e.target.value)}
                />
              </div>

              <ScrollArea className="h-64 rounded-xl border bg-white/50">
                {loadingExercises ? (
                  <div className="p-4 text-center text-slate-500">Loading exercises...</div>
                ) : (
                  <div className="p-4 space-y-3">
                    {filteredExercises.map((ex) => {
                      const selected = selectedExercises.includes(ex.id);
                      return (
                        <div
                          key={ex.id}
                          className={`p-4 rounded-xl border transition-all ${
                            selected ? "border-[#155d57] bg-[#a9ebdf]/10" : "border-slate-200 hover:border-[#a9ebdf]"
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-semibold text-[#155d57]">{ex.name}</h4>
                              <p className="text-sm text-slate-500">
                                {ex.category} • {ex.type}{" "}
                                {ex.type === "rep-based" && `• ${ex.defaultReps} reps`}
                                {ex.type === "hold-based" && `• ${ex.defaultHoldTime}s`}
                              </p>
                            </div>
                            <Button
                              size="sm"
                              variant={selected ? "default" : "outline"}
                              className={selected ? "bg-[#155d57] hover:bg-[#124a45]" : ""}
                              onClick={() => toggleExercise(ex.id)}
                            >
                              {selected ? "Added" : "Add"}
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </ScrollArea>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              disabled={!programName.trim() || selectedExercises.length === 0}
              className="bg-[#155d57] hover:bg-[#124a45]"
            >
              Create Program
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* SELECT PATIENT */}
      <Dialog open={assignOpen} onOpenChange={setAssignOpen}>
        <DialogContent className="max-w-md rounded-3xl">
          <DialogHeader className="bg-[#155d57] text-white p-6 -mx-6 -mt-6 rounded-t-3xl">
            <DialogTitle className="text-xl flex items-center gap-2">
              <UserPlus className="w-5 h-5" /> Assign to Patient
            </DialogTitle>
            <DialogDescription className="text-[#a9ebdf]">
              Choose one patient for <strong>{currentProgram?.name}</strong>
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="max-h-80 mt-4">
            {loadingPatients ? (
              <div className="p-4 text-center text-slate-500">Loading patients...</div>
            ) : (
              <div className="space-y-3 pr-4">
                {patients.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => selectPatient(p.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedPatientId === p.id
                        ? "border-[#155d57] bg-[#a9ebdf]/10"
                        : "border-slate-200 hover:border-[#a9ebdf]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#155d57]/10 flex items-center justify-center text-[#155d57] font-medium">
                        {p.name?.[0] || "?"}
                      </div>
                      <div>
                        <p className="font-medium text-[#155d57]">{p.name}</p>
                        {p.condition && (
                          <p className="text-sm text-slate-500">{p.condition}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {patients.length === 0 && (
                  <div className="text-center text-slate-500 py-8">
                    No patients found
                  </div>
                )}
              </div>
            )}
          </ScrollArea>

          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setAssignOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={goToCustomize}
              disabled={!selectedPatientId}
              className="bg-[#155d57] hover:bg-[#124a45]"
            >
              Customize & Assign
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* CUSTOMIZE PER PATIENT*/}
       <Dialog open={customizeOpen} onOpenChange={setCustomizeOpen}>
         <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl">
           <DialogHeader className="bg-[#155d57] text-white p-6 -mx-6 -mt-6 rounded-t-3xl">
            <DialogTitle className="text-xl">Customize for {patients.find(p => p.id === selectedPatientId)?.name}</DialogTitle>
            <DialogDescription className="text-[#a9ebdf]">
              Adjust parameters for <strong>{currentProgram?.name}</strong>
            </DialogDescription>
          </DialogHeader>

          <div className="p-6 space-y-8">
            {/* Date range */}
           <div className="grid grid-cols-2 gap-6">
              <div>
                <Label className="text-[#155d57] font-semibold">Start Date</Label>
               <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-[#155d57] font-semibold">End Date (auto)</Label>
                <div className="mt-1 h-10 px-4 flex items-center bg-slate-100 rounded-md text-slate-700">
                  {startDate && totalDays
                    ? format(addDays(new Date(startDate), currentProgram?.totalDays || 42), "dd MMM yyyy")
                    : "—"}
                </div>
              </div>
            </div>

            <Separator />

            {/* Per-exercise customization */}
            <div className="space-y-6">
              <h3 className="font-semibold text-lg text-[#155d57] flex items-center gap-2">
                <Settings className="w-5 h-5" /> Exercise Customizations
              </h3>

              {currentProgram?.exercises.map((exId) => {
                const ex = exercises.find((e) => e.id === exId);
                if (!ex) return null;

                const custom = customData[exId] || {};

                return (
                  <div key={exId} className="border rounded-xl p-5 bg-white shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-bold text-[#155d57]">{ex.name}</h4>
                      <Badge variant="outline">{ex.type}</Badge>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                      <div>
                        <Label className="text-sm text-slate-600">Sets</Label>
                        <Input
                          type="number"
                          value={custom.sets ?? ex.defaultSets}
                          onChange={(e) => updateCustom(exId, "sets", parseInt(e.target.value))}
                          min={1}
                          className="mt-1"
                        />
                      </div>

                      {ex.type === "rep-based" && (
                        <div>
                          <Label className="text-sm text-slate-600">Reps</Label>
                          <Input
                            value={custom.reps ?? ex.defaultReps ?? ""}
                            onChange={(e) => updateCustom(exId, "reps", e.target.value)}
                            className="mt-1"
                          />
                        </div>
                      )}

                      {ex.type === "hold-based" && (
                        <div>
                          <Label className="text-sm text-slate-600">Hold Time (s)</Label>
                          <Input
                            type="number"
                            value={custom.holdTime ?? ex.defaultHoldTime ?? 0}
                            onChange={(e) => updateCustom(exId, "holdTime", parseInt(e.target.value))}
                            min={0}
                            className="mt-1"
                          />
                        </div>
                      )}
                    </div>

                    {ex.romTargets && ex.romTargets.length > 0 && (
                      <div className="mt-4 pt-4 border-t">
                        <Label className="text-sm font-medium text-slate-600 mb-2 block">
                          Range of Motion Targets ({ex.romTargets[0].unit})
                        </Label>
                        {ex.romTargets.map((rom, idx) => (
                          <div key={idx} className="flex items-center gap-4 mb-2">
                            <span className="w-32 text-sm font-medium capitalize">{rom.joint} {rom.movement}:</span>
                            <div className="flex items-center gap-2">
                              <Input
                                type="number"
                                value={custom.romTargets?.[idx]?.min ?? rom.min}
                                onChange={(e) => updateRom(exId, idx, "min", e.target.value)}
                                className="w-20"
                              />
                              <span className="text-slate-400">–</span>
                              <Input
                                type="number"
                                value={custom.romTargets?.[idx]?.max ?? rom.max}
                                onChange={(e) => updateRom(exId, idx, "max", e.target.value)}
                                className="w-20"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <DialogFooter className="p-6 border-t">
            <Button variant="outline" onClick={() => setCustomizeOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={confirmAssign}
              className="bg-[#155d57] hover:bg-[#124a45] gap-2"
            >
              <Save className="w-4 h-4" /> Save & Assign
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}