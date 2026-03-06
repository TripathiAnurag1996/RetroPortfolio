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
 * Intent keyword map
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
    "current role"
  ],
  playful_redirect: [
    "salary",
    "ctc",
    "compensation",
    "married",
    "single",
    "girlfriend"
  ],
  easter_eggs: [
    "joke",
    "sing",
    "dance",
    "are you real",
    "turing test",
    "meaning of life"
  ],
  off_limits: [
    "politics",
    "political",
    "religion",
    "sexuality",
    "controversial"
  ]
};

/**
 * Improved intent classifier
 */
const classifyIntent = (query: string): Intent => {
  const q = query.toLowerCase();

  const scores: Record<Intent, number> = {
    professional: 0,
    playful_redirect: 0,
    easter_eggs: 0,
    off_limits: 0
  };

  for (const intent in intentWeights) {
    for (const keyword of intentWeights[intent as Intent]) {
      const regex = new RegExp(`\\b${keyword}\\b`, "i");
      if (regex.test(q)) scores[intent as Intent]++;
    }
  }

  if (scores.off_limits > 0) return "off_limits";

  const best = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];

  return best[1] > 0 ? (best[0] as Intent) : "professional";
};

/**
 * Intent behavior rules
 */
const intentConstraints: Record<Intent, string> = {
  professional: `
- Be direct and structured.
- Avoid unnecessary background.
- Speak like a thoughtful senior PM.
`,

  playful_redirect: `
- Do NOT reveal private details.
- Use light humor.
- Set a boundary politely.
- Redirect toward work or product impact.
`,

  easter_eggs: `
- Light clever response allowed.
- Keep it short and warm.
- End with gentle redirect to work.
`,

  off_limits: `
- Do NOT engage the topic.
- Calm polite deflection.
- Redirect to professional topics.
`
};

/**
 * Identity prompt
 */
const baseIdentity = `
You are Anurag Kumar Tripathi speaking in first person.

Tone:
- Calm
- Confident
- Natural
- Senior Product Manager mindset
- No buzzwords or resume dumping
`;

/**
 * Build system instructions
 */
const buildSystemInstructions = (
  persona: PersonaType,
  intent: Intent
) => {
  const personaContext = personaPrompts[persona] || "";
  const intentContext = intentConstraints[intent] || "";

  const contextData = JSON.stringify(anuragContext);

  return `
[ROLE]
${baseIdentity}

[PERSONALITY_LENS]
${personaContext}

[DATA_SOURCE_FACTS]
${contextData}

[INTENT_RULES]
${intentContext}

[CRITICAL_RESPONSE_RULES]
1. Answer clearly and completely.
2. Provide exact number of points if requested.
3. Never stop mid-sentence.
4. Stay grounded in DATA_SOURCE_FACTS.
5. If missing data, admit it and redirect.
`;
};

/**
 * Fetch with timeout
 */
const fetchWithTimeout = async (
  url: string,
  options: RequestInit,
  timeout = 20000
) => {
  const controller = new AbortController();

  const id = setTimeout(() => controller.abort(), timeout);

  const response = await fetch(url, {
    ...options,
    signal: controller.signal
  });

  clearTimeout(id);

  return response;
};

/**
 * Main conversational AI
 */
export const getAIResponse = async (
  userQuery: string,
  persona: PersonaType
) => {
  if (!API_KEY) {
    throw new Error("Gemini API key missing.");
  }

  const intent = classifyIntent(userQuery);
  const instructions = buildSystemInstructions(persona, intent);

  try {
    const response = await fetchWithTimeout(
      `${API_URL}?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: instructions }]
          },
          contents: [
            {
              role: "user",
              parts: [{ text: userQuery }]
            }
          ],
          generationConfig: {
            maxOutputTokens: 2048,
            temperature: persona === "browsing" ? 0.7 : 0.35,
            topP: 0.95
          }
        })
      },
      20000
    );

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(
        err?.error?.message ||
          `Gemini API failed with status ${response.status}`
      );
    }

    const data = await response.json();

    const parts =
      data?.candidates?.[0]?.content?.parts || [];

    const text = parts
      .map((p: any) => p?.text || "")
      .join("")
      .trim();

    if (!text) {
      throw new Error("AI returned empty response.");
    }

    return text;
  } catch (error: any) {
    console.error("Gemini error:", error);
    throw new Error(error?.message || "AI request failed");
  }
};

/**
 * Product analysis mode
 */
export const getProductAnalysis = async (
  query: string,
  persona: PersonaType = "browsing"
) => {
  if (!API_KEY) {
    throw new Error("Gemini API key missing.");
  }

  const systemPrompt = `
You are an experienced AI Product Manager.

Always structure responses:

1. Problem Insight
2. Key Hypotheses (3–5)
3. Recommended Experiments
4. Metrics to Watch

Focus on real product decisions.

Persona context: ${persona}
`;

  try {
    const response = await fetchWithTimeout(
      `${API_URL}?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
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
            temperature: 0.45
          }
        })
      },
      20000
    );

    const data = await response.json();

    const text =
      data?.candidates?.[0]?.content?.parts
        ?.map((p: any) => p.text || "")
        .join("") || "";

    if (!text) {
      throw new Error("AI analysis unavailable.");
    }

    return text;
  } catch (error: any) {
    console.error("Gemini analysis error:", error);
    throw new Error(error?.message || "AI analysis failed");
  }
};