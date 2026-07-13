import { PersonaType } from "./personaConfig";

/**
 * Main conversational AI
 */
export const getAIResponse = async (
  userQuery: string,
  persona: PersonaType
): Promise<string> => {
  try {
    const response = await fetch('/.netlify/functions/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userQuery,
        persona,
        mode: 'assistant'
      })
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err?.error || `AI request failed with status ${response.status}`);
    }

    const data = await response.json();
    
    if (!data?.response) {
      throw new Error("AI returned an empty response.");
    }

    return data.response;
  } catch (error: any) {
    console.error("AI Assistant error:", error);
    throw new Error(error?.message || "AI request failed. Please try again.");
  }
};

/**
 * Product analysis mode
 */
export const getProductAnalysis = async (
  query: string,
  persona: PersonaType = "browsing"
): Promise<string> => {
  try {
    const response = await fetch('/.netlify/functions/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userQuery: query,
        persona,
        mode: 'analysis'
      })
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err?.error || `AI analysis request failed with status ${response.status}`);
    }

    const data = await response.json();
    
    if (!data?.response) {
      throw new Error("AI analysis unavailable.");
    }

    return data.response;
  } catch (error: any) {
    console.error("AI Analysis error:", error);
    throw new Error(error?.message || "AI analysis failed. Please try again.");
  }
};