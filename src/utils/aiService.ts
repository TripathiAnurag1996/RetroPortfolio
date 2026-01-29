import { anuragContext } from "./knowledgeBase";
import { personaPrompts, PersonaType } from "./personaConfig";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

/**
 * Intent Types
 */
type Intent =
  | "professional"
  | "playful_redirect"
  | "easter_eggs"
  | "off_limits";

/**
 * Weighted intent keywords (more robust than naive includes)
 */
const intentWeights: Record<Intent, string[]> = {
  professional: [
    "experience",
    "work",
    "role",
    "product",
    "projects",
    "skills",
    "strategy",
    "building",
    "current role",
  ],
  playful_redirect: [
    "salary",
    "ctc",
    "compensation",
    "married",
    "single",
    "girlfriend",
    "relationship",
  ],
  easter_eggs: [
    "joke",
    "sing",
    "dance",
    "are you real",
    "turing test",
    "meaning of life",
  ],
  off_limits: [
    "politics",
    "political",
    "religion",
    "sexuality",
    "controversial",
  ],
};

/**
 * Intent classifier with scoring + safe fallback
 */
const classifyIntent = (query: string): Intent => {
  const q = query.toLowerCase();

  const scores: Record<Intent, number> = {
    professional: 0,
    playful_redirect: 0,
    easter_eggs: 0,
    off_limits: 0,
  };

  for (const intent in intentWeights) {
    for (const keyword of intentWeights[intent as Intent]) {
      if (q.includes(keyword)) scores[intent as Intent]++;
    }
  }

  if (scores.off_limits > 0) return "off_limits";

  const bestMatch = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
  return bestMatch[1] > 0 ? (bestMatch[0] as Intent) : "professional";
};

/**
 * Intent-specific response constraints
 * (Explicit > vibes)
 */
const intentConstraints: Record<Intent, string> = {
  professional: `
- Be direct and clear.
- Avoid unnecessary background.
- Sound like a senior PM thinking out loud.
`,

  playful_redirect: `
- Do NOT reveal personal or private details.
- Use light, respectful humor.
- Set a boundary calmly.
- Redirect toward work, products, or impact.
- No sarcasm or punchlines.
`,

  easter_eggs: `
- Light, clever response is allowed.
- Keep it short and warm.
- Avoid gimmicks.
- End with a gentle redirect to work or product thinking.
`,

  off_limits: `
- Do NOT engage with the topic.
- No humor.
- Calm, polite deflection.
- Redirect strictly to professional work.
`
};

/**
 * Prompt Layers (separation of concerns)
 */
const baseIdentity = `
You are Anurag Kumar Tripathi’s AI OS Assistant.
You speak in first person ("I").

TONE
- Calm, confident, and human
- Senior Product Manager energy
- Natural conversational flow
- No hype, no buzzwords, no resume dumping
- Never sound like a chatbot or assistant
`;

const buildSystemInstructions = (
  persona: PersonaType,
  intent: Intent
) => {
  const personaContext = personaPrompts[persona] || '';
  const intentContext = intentConstraints[intent] || '';
  
  return `
[ROLE]
${baseIdentity}

[PERSONALITY_LENS]
${personaContext}

[DATA_SOURCE_FACTS]
${JSON.stringify(anuragContext)}

[INTENT_RULES]
${intentContext}

[CRITICAL_RESPONSE_RULES]
1. Answer clearly, accurately, and COMPLETELY.
2. If the user asks for a specific number of points (e.g., "3 things" or "5 factors"), you MUST provide exactly that many.
3. NEVER end a response mid-sentence or mid-list.
4. Stay grounded in the provided DATA_SOURCE_FACTS. If information is missing, admit it and redirect.
5. Provide interview-grade, professional quality answers.
`;
};

/**
 * Main conversational response
 */
export const getAIResponse = async (
  userQuery: string,
  persona: PersonaType
) => {
  if (!API_KEY) {
    throw new Error(
      "Gemini API key is missing. Please check your environment variables."
    );
  }

  const intent = classifyIntent(userQuery);
  const instructions = buildSystemInstructions(persona, intent);

  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: instructions }]
        },
        contents: [
          {
            role: "user",
            parts: [{ text: userQuery }],
          },
        ],
        generationConfig: {
          maxOutputTokens: 2048,
          temperature: persona === "browsing" ? 0.7 : 0.4,
          topP: 0.95
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_ONLY_HIGH",
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_ONLY_HIGH",
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_ONLY_HIGH",
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_ONLY_HIGH",
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Gemini API error:", errorData);
      
      // Handle the specific "model output must contain..." error with more context
      const apiErrorMessage = errorData.error?.message || "";
      if (apiErrorMessage.includes("must contain either output text or tool calls")) {
        throw new Error("The AI model was unable to generate a response. This often happens if the query triggers a safety filter or is too complex for the current persona. Please try rephrasing.");
      }

      throw new Error(
        apiErrorMessage || `Gemini API request failed with status ${response.status}`
      );
    }

    const data = await response.json();
    const candidates = data?.candidates || [];
    
    if (candidates.length === 0 || !candidates[0].content?.parts) {
      // If there's no content, check for a finish reason
      const finishReason = candidates[0]?.finishReason;
      if (finishReason === "SAFETY") {
        throw new Error("I apologize, but I cannot answer that due to safety guidelines. Let's talk about my professional work or product strategy instead.");
      }
      
      console.error("Empty Gemini response candidates:", data);
      throw new Error("AI returned no results. Detailed logs in console.");
    }

    // Join all parts (text and thinking/thought if present in future versions)
    const fullText = candidates[0].content.parts
      .map((part: any) => part.text || "")
      .join("")
      .trim();

    if (!fullText) {
      throw new Error("AI returned an empty response. Please try again.");
    }

    return fullText;
  } catch (error: any) {
    console.error("Gemini API error:", error);
    throw new Error(error?.message || "AI request failed");
  }
};

/**
 * Product Strategy / Analysis Mode
 */
export const getProductAnalysis = async (
  query: string,
  persona: PersonaType = 'browsing'
) => {
  if (!API_KEY) {
    throw new Error('Gemini API key is missing. Please check your environment variables.');
  }

  const systemPrompt = `
You are an experienced Product Manager and AI Product Analyst.

For every product or business scenario:
1. Always clearly identify the core problem or signal.
2. Always list 3–5 concrete hypotheses explaining *why* this might be happening.
   - Hypotheses must be specific, testable, and grounded in real product behavior.
3. Always propose clear next actions or experiments to validate or fix the issue.
   - Actions should be practical (analytics, UX changes, experiments, instrumentation).
4. When relevant, mention key metrics to monitor.

Response structure is mandatory:
- Problem Insight
- Key Hypotheses (bulleted or numbered)
- Recommended Actions / Experiments
- Metrics to Watch (optional but preferred)

Tone rules:
- Be confident and structured.
- Avoid vague language.
- Do not stop mid-sentence.
- Do not provide placeholder or partial answers.
- Optimize for interview-grade and real-world product decision making.

Persona adaptation (Current Focus: ${persona.toUpperCase()}):
- RECRUITER → focus on clarity, impact, and decision quality.
- FOUNDER → focus on growth, revenue, and prioritization.
- ENGINEER → focus on feasibility, systems, and implementation signals.
`;

  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: systemPrompt }]
        },
        contents: [
          {
            role: "user",
            parts: [{ text: query }]
          }
        ],
        generationConfig: {
          maxOutputTokens: 2048,
          temperature: 0.45,
          topP: 0.95
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_ONLY_HIGH",
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_ONLY_HIGH",
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_ONLY_HIGH",
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_ONLY_HIGH",
          },
        ],
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Gemini API error:', errorData);
      
      const apiErrorMessage = errorData.error?.message || "";
      if (apiErrorMessage.includes("must contain either output text or tool calls")) {
        throw new Error("The AI analyst was unable to generate a response. Please try a different product scenario.");
      }

      throw new Error(
        apiErrorMessage || `Gemini API request failed with status ${response.status}`
      );
    }

    const data = await response.json();
    const candidates = data?.candidates || [];
    
    if (candidates.length === 0 || !candidates[0].content?.parts) {
      const finishReason = candidates[0]?.finishReason;
      if (finishReason === "SAFETY") {
        throw new Error("I apologize, but this analysis was restricted by safety guidelines. Please try a more business-focused scenario.");
      }

      console.error('Empty response from Gemini API:', data);
      throw new Error('AI analysis unavailable. Please try again.');
    }

    // Join all parts
    const responseText = candidates[0].content.parts
      .map((p: any) => p.text || "")
      .join("");

    if (!responseText) {
      throw new Error('AI returned an empty response. Please try again.');
    }

    return responseText;
  } catch (error: any) {
    console.error('Gemini API error:', error);
    throw new Error(error?.message || 'AI analysis request failed');
  }
};
