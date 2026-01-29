// // src/utils/generateFeedbackAudio.ts
// import { GoogleGenerativeAI } from '@google/generative-ai';

// export async function generateFeedbackAudio(
//   bodyPart: string,
//   angle :number
// ): Promise<{ audioUrl: string | null; text: string }> {
//   let fallbackText = "Please focus on keeping good form.";

//   try {
//     // 1. Generate friendly correction text with Gemini
//     // 1. Generate friendly correction text with Gemini
// const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });  // Older but usually higher free quota (~50–250 RPD)// ← FIXED HERE

//     const prompt = `
// Role: Warm physiotherapy coach. 
// Task: Give real-time voice feedback for a bicep curl.

// Input Data:
// - Body part: ${bodyPart}
// - Angle: ${angle} degrees

// Logic Rules:
// 1. If Body part is 'elbow' and angle > 15: Say "Great! Keep your elbows tucked in tight."
// 2. If Body part is 'elbow' and angle < 0: Say "Nice! Keep those elbows down."
// 3. If Body part is 'back' and angle > 10: Say "Doing well! Try to stand up straight."
// 4. If none of these match: Return an empty string "".

// Constraints:
// - Response must be under 10 words.
// - Tone: Encouraging and simple.
// - Output ONLY the spoken sentence or an empty string.
// `;

//     const result = await model.generateContent(prompt);
//     const generatedText = (await result.response.text()).trim();

//     const textToSpeak = generatedText || fallbackText;

//     // 2. Convert to speech using ElevenLabs
//     const voiceId = import.meta.env.VITE_ELEVENLABS_VOICE_ID;
//     const apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY;

//     if (!apiKey || !voiceId) {
//       console.error("Missing ElevenLabs API key or voice ID");
//       return { audioUrl: null, text: textToSpeak };
//     }

//     const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
//       method: "POST",
//       headers: {
//         "xi-api-key": apiKey,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         text: textToSpeak,
//         model_id: "eleven_multilingual_v2",
//         voice_settings: {
//           stability: 0.6,
//           similarity_boost: 0.8,
//           style: 0.5,
//           use_speaker_boost: true,
//         },
//       }),
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error("ElevenLabs API error:", errorText);
//       return { audioUrl: null, text: textToSpeak };
//     }

//     const blob = await response.blob();
//     const audioUrl = URL.createObjectURL(blob);

//     return { audioUrl, text: textToSpeak };
//   } catch (error) {
//     console.error("Error generating feedback audio:", error);
//     return { audioUrl: null, text: fallbackText };
//   }
// }

// src/utils/generateFeedbackAudio.ts

// import { GoogleGenerativeAI } from '@google/generative-ai';

// Simple cache to prevent generating the same audio twice in a session
// src/utils/generateFeedbackAudio.ts

// Simple cache to prevent generating the same audio twice in a session

// // src/utils/generateFeedbackAudio.ts
// const AUDIO_CACHE: Record<string, string> = {};

// export async function generateFeedbackAudio(
//   message: string, 
//   voiceIdEnv?: string,
//   apiKeyEnv?: string
// ): Promise<{ audioUrl: string | null; text: string }> {
  
//   // 1. Check Cache first
//   if (AUDIO_CACHE[message]) {
//     return { audioUrl: AUDIO_CACHE[message], text: message };
//   }

//   try {
//     const voiceId = voiceIdEnv || import.meta.env.VITE_ELEVENLABS_VOICE_ID;
//     const apiKey = apiKeyEnv || import.meta.env.VITE_ELEVENLABS_API_KEY;

//     if (!apiKey || !voiceId) {
//       console.warn("Missing ElevenLabs keys, returning text only.");
//       return { audioUrl: null, text: message };
//     }

//     // 2. Call ElevenLabs
//     const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
//       method: "POST",
//       headers: {
//         "xi-api-key": apiKey,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         text: message,
//         model_id: "eleven_multilingual_v2",
//         voice_settings: {
//           stability: 0.5,
//           similarity_boost: 0.75,
//         },
//       }),
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error("ElevenLabs API error:", errorText);
//       return { audioUrl: null, text: message };
//     }

//     const blob = await response.blob();
//     const audioUrl = URL.createObjectURL(blob);
    
//     // 3. Store in cache
//     AUDIO_CACHE[message] = audioUrl;

//     return { audioUrl, text: message };
//   } catch (error) {
//     console.error("Error generating feedback audio:", error);
//     return { audioUrl: null, text: message };
//   }
// }

// src/utils/generateFeedbackAudio.ts
// src/utils/generateFeedbackAudio.ts
const AUDIO_CACHE: Record<string, string> = {};

export async function generateFeedbackAudio(
  message: string, 
  voiceIdEnv?: string,
  apiKeyEnv?: string
): Promise<{ audioUrl: string | null; text: string }> {
  
  // 1. Check Cache first
  if (AUDIO_CACHE[message]) {
    return { audioUrl: AUDIO_CACHE[message], text: message };
  }

  try {
    const voiceId = voiceIdEnv || import.meta.env.VITE_ELEVENLABS_VOICE_ID;
    const apiKey = apiKeyEnv || import.meta.env.VITE_ELEVENLABS_API_KEY;

    if (!apiKey || !voiceId) {
      console.warn("Missing ElevenLabs keys, returning text only.");
      return { audioUrl: null, text: message };
    }

    // 2. Call ElevenLabs
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: "POST",
      headers: {
        "xi-api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: message,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("ElevenLabs API error:", errorText);
      return { audioUrl: null, text: message };
    }

    const blob = await response.blob();
    const audioUrl = URL.createObjectURL(blob);
    
    // 3. Store in cache
    AUDIO_CACHE[message] = audioUrl;

    return { audioUrl, text: message };
  } catch (error) {
    console.error("Error generating feedback audio:", error);
    return { audioUrl: null, text: message };
  }
}

export async function generateCorrectionMessage(
  exercise: string,
  baseIssue: string
): Promise<string | null> {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("Missing Gemini API key, using hardcoded message.");
      return null;
    }

    const prompt = `Generate a short, imperative correction message for the "${exercise}" exercise. The issue is: "${baseIssue}". Rephrase it naturally and keep it concise.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt }
              ]
            }
          ]
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error:", errorText);
      return null;
    }

    const data = await response.json();
    const generatedText = data.candidates[0].content.parts[0].text.trim();
    return generatedText;
  } catch (error) {
    console.error("Error generating correction message from Gemini:", error);
    return null;
  }
}