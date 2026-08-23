import { GoogleGenAI } from '@google/genai';

// Initialize the Google GenAI client using the public Expo environment variable.
// Note: EXPO_PUBLIC_ variables are embedded in the JS bundle and are safe for public keys.

const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.warn('EXPO_PUBLIC_GEMINI_API_KEY is not set. Gemini client will not function without it.');
}

export const geminiClient = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export default geminiClient;
