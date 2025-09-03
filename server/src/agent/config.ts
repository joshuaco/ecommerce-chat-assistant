import { ChatGoogleGenerativeAI } from '@langchain/google-genai';

// Initialize the AI model (Google's Gemini)
export function initializeModel(tools: any) {
  const model = new ChatGoogleGenerativeAI({
    model: 'gemini-2.5-flash', //  Use Gemini 2.5 Flash model
    temperature: 0, // Deterministic responses (no randomness)
    maxRetries: 0, // Disable built-in retries (we handle our own)
    apiKey: process.env.GOOGLE_API_KEY // Google API key from environment
  }).bindTools(tools); // Bind our custom tools to the model

  return model;
}

export type ModelType = ReturnType<typeof initializeModel>;
