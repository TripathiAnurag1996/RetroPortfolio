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
`,
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

const responseRules = `
RESPONSE RULES
1. Answer the question clearly and early.
2. Choose the response shape intentionally:
   - Factual → 1–2 sentences
   - Summary → single paragraph (no bullets)
   - Evaluative → judgment + 1–2 concrete examples
   - Exploratory → brief answer + invite follow-up
3. Use bullet points ONLY if the user explicitly asks.
4. Avoid over-explaining or teaching.
5. If information is missing:
   - Be honest and brief
   - Redirect naturally (no documentation tone)
6. Never reveal private or sensitive details.
7. Light retro-OS personality is welcome.
8. Vary sentence structure to avoid repetition.
`;

const buildSystemPrompt = (
  userQuery: string,
  persona: PersonaType,
  intent: Intent,
) => `
${baseIdentity}

====================
PERSONA CONTEXT
====================
${personaPrompts[persona]}
Apply this persona naturally. Never overperform it.

====================
SOURCE OF TRUTH
====================
Use ONLY the information below.
Do NOT infer, guess, or invent.

${JSON.stringify(anuragContext, null, 2)}

====================
INTENT CONTEXT
====================
Detected user intent: ${intent}

${intentConstraints[intent]}

====================
RESPONSE DISCIPLINE
====================
${responseRules}

====================
USER QUESTION
====================
"${userQuery}"
`;

/**
 * Main conversational response
 */
export const getAIResponse = async (
  userQuery: string,
  persona: PersonaType,
) => {
  if (!API_KEY) {
    throw new Error(
      "Gemini API key is missing. Please check your environment variables.",
    );
  }

  const intent = classifyIntent(userQuery);
  const systemPrompt = buildSystemPrompt(userQuery, persona, intent);

  // Combine system prompt and user query to fit the strict {contents: [{parts: [{text: "..."}]}]} schema
  const combinedPrompt = `${systemPrompt}\n\nUSER INPUT: ${userQuery}`;

  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: combinedPrompt }],
          },
        ],
        generationConfig: {
          maxOutputTokens: 500,
          temperature:
            persona === "browsing"
              ? 0.6
              : intent === "professional"
                ? 0.35
                : 0.55,
          topP: 0.9,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Gemini API error:", errorData);
      throw new Error(
        errorData.error?.message ||
          `Gemini API request failed with status ${response.status}`,
      );
    }

    const data = await response.json();

    const responseText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!responseText) {
      console.error("Empty response from Gemini API:", data);
      throw new Error("AI returned an empty response. Please try again.");
    }

    return responseText;
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
You are Anurag Kumar Tripathi’s AI Product Strategy Simulator.
You demonstrate product judgment, structured thinking, and clarity.

====================
CONTEXT
====================
This is a Product Insight demo.
You simulate how I analyze a product problem.

Focus on:
- User psychology
- Product friction
- Data-backed hypotheses
- AI / GenAI trade-offs

====================
PERSONA LENS
====================
The analysis should reflect the perspective of: ${persona.toUpperCase()}

- Engineer → systems, constraints, feasibility
- Recruiter → impact, signal, clarity
- Founder → first principles, risk/reward
- Browsing/Student → clarity and reasoning

====================
RESPONSE STRUCTURE
====================
1. The Analysis (1–2 paragraphs)
2. One ASCII diagram (simple, text-only)
3. 2–3 actionable product moves
4. Trade-offs considered (short)

====================
STYLE RULES
====================
- Speak in first person ("I")
- Calm, senior, insightful
- No markdown tables or code blocks
- MAX 350 words

====================
USER SCENARIO
====================
"${query}"
`;

  // Combine system prompt and user query to fit the strict {contents: [{parts: [{text: "..."}]}]} schema
  const combinedPrompt = `${systemPrompt}\n\nUSER INPUT: ${query}`;

  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: combinedPrompt }]
          }
        ],
        generationConfig: {
          maxOutputTokens: 600,
          temperature: 0.4,
          topP: 0.9
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Gemini API error:', errorData);
      throw new Error(
        errorData.error?.message || `Gemini API request failed with status ${response.status}`
      );
    }

    const data = await response.json();

    const responseText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!responseText) {
      console.error('Empty response from Gemini API:', data);
      throw new Error('AI analysis unavailable. Please try again.');
    }

    return responseText;
  } catch (error: any) {
    console.error('Gemini API error:', error);
    throw new Error(error?.message || 'AI analysis request failed');
  }
};
