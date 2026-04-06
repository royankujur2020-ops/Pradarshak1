import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

export interface ExplanationResult {
  text: string;
  language: string;
  metaphorUsed: string;
}

export async function explainProblem(imageBase64: string, language: 'Bengali' | 'Nepali' | 'English' = 'English'): Promise<ExplanationResult> {
  const apiKey = process.env.GEMINI_API_KEY || import.meta.env.VITE_GEMINI_API;
  
  if (!apiKey) {
    throw new Error("Gemini API key is not configured. Please add GEMINI_API_KEY or VITE_GEMINI_API to your environment variables.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const systemInstruction = `
    You are "Pradarshak", a visual mentor for rural students in India and Nepal.
    Your goal is to explain textbook diagrams, math problems, or text captured via OCR.
    
    Rules:
    1. Identify the problem or diagram in the image.
    2. Provide a 30-second read explanation.
    3. Use local metaphors (e.g., explaining Gravity using a falling mango, or geometry using field boundaries).
    4. If the requested language is Bengali or Nepali, respond primarily in that language but keep technical terms in English with local phonetic spelling if helpful.
    5. Be encouraging, like a kind village teacher.
    6. Format the output as a clear explanation with a "Mentor's Hint" section.
  `;

  const prompt = `Explain this textbook page in ${language}. Focus on the main diagram or problem. Use a local metaphor.`;

  const imagePart = {
    inlineData: {
      mimeType: "image/jpeg",
      data: imageBase64.split(',')[1] || imageBase64,
    },
  };

  const response: GenerateContentResponse = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: { parts: [imagePart, { text: prompt }] },
    config: {
      systemInstruction,
      temperature: 0.7,
    },
  });

  const text = response.text || "I couldn't quite see that. Can you try taking a clearer picture?";
  
  return {
    text,
    language,
    metaphorUsed: "Local Context",
  };
}
