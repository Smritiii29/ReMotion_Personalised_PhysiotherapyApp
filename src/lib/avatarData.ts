// src/lib/avatarData.ts

export type AvatarId = 'archer' | 'footballer' | 'girl' | 'granny' | 'hiphop' | 'ninja';

export interface AvatarConfig {
  id: AvatarId;
  name: string;
  trait: string;
  description: string;
  introModel: string;
  BicepCurlModel: string; // Default/Curl model
  squatModel: string;    // NEW: Squat model
  color: string;
  bgGradient: string;
  accent: string;
}

export const AVATARS: AvatarConfig[] = [
  {
    id: 'ninja',
    name: 'Hades',
    trait: 'The Shadow Walker',
    description: 'Master of stealth and precision.',
    introModel: '/avatar_intro/ninja_intro.glb',
    BicepCurlModel: '/avatars/BicepCurl/ninja_curl.glb',
    squatModel: '/avatars/squat/ninja_squat.glb', 
    color: 'text-emerald-400',
    bgGradient: 'from-emerald-900 to-slate-900',
    accent: '#34d399',
  },
  {
    id: 'archer',
    name: 'Artemis',
    trait: 'The Huntress',
    description: 'Unmatched focus and accuracy.',
    introModel: '/avatar_intro/archer_intro.glb',
    BicepCurlModel: '/avatars/BicepCurl/archer_curl.glb',
    squatModel: '/avatars/squat/archer_squat.glb',
    color: 'text-teal-400',
    bgGradient: 'from-teal-900 to-slate-900',
    accent: '#2dd4bf',
  },
  {
    id: 'footballer',
    name: 'Hermes',
    trait: 'The Swift',
    description: 'Speed and agility incarnate.',
    introModel: '/avatar_intro/football_intro.glb',
    BicepCurlModel: '/avatars/BicepCurl/football_curl.glb',
    squatModel: '/avatars/squat/football_squat.glb',
    color: 'text-blue-500',
    bgGradient: 'from-blue-900 to-slate-900',
    accent: '#3b82f6',
  },
  {
    id: 'girl',
    name: 'Athena',
    trait: 'The Strategist',
    description: 'Wisdom guiding every movement.',
    introModel: '/avatar_intro/girl_intro.glb',
    BicepCurlModel: '/avatars/BicepCurl/girl_curl.glb',
    squatModel: '/avatars/squat/girl_squat.glb',
    color: 'text-cyan-400',
    bgGradient: 'from-cyan-900 to-slate-900',
    accent: '#22d3ee',
  },
  {
    id: 'hiphop',
    name: 'Dionysus',
    trait: 'The Rhythm',
    description: 'Energy, flow, and celebration.',
    introModel: '/avatar_intro/hiphop_intro.glb',
    BicepCurlModel: '/avatars/BicepCurl/hiphop_curl.glb',
    squatModel: '/avatars/squat/hiphop_squat.glb',
    color: 'text-indigo-400',
    bgGradient: 'from-indigo-900 to-slate-900',
    accent: '#818cf8',
  },
  {
    id: 'granny',
    name: 'Hestia',
    trait: 'The Eternal',
    description: 'Strength that defies time.',
    introModel: '/avatar_intro/granny_intro.glb',
    BicepCurlModel: '/avatars/BicepCurl/granny_curl.glb',
    squatModel: '/avatars/squat/granny_squat.glb',
    color: 'text-sky-300',
    bgGradient: 'from-sky-900 to-slate-900',
    accent: '#7dd3fc',
  },
];