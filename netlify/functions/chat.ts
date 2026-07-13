import { anuragContext, personaPrompts, PersonaType } from "./lib/context";

const API_KEY = process.env.NVIDIA_API_KEY;
const API_URL = "https://integrate.api.nvidia.com/v1/chat/completions";

type Intent = "professional" | "playful_redirect" | "easter_eggs" | "off_limits";

const intentWeights: Record<Intent, string[]> = {
  professional: ["experience", "work", "role", "product", "projects", "skills", "strategy", "building", "current role"],
  playful_redirect: ["salary", "ctc", "compensation", "married", "single", "girlfriend"],
  easter_eggs: ["joke", "sing", "dance", "are you real", "turing test", "meaning of life"],
  off_limits: ["politics", "political", "religion", "sexuality", "controversial"]
};

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

type Topic = "products" | "experience" | "skills" | "education" | "philosophy" | "general";

const topicWeights: Record<Exclude<Topic, "general">, string[]> = {
  products: ["promptive", "sentry", "product", "built", "launch", "portfolio", "projects"],
  experience: ["worked", "experience", "companies", "role", "job", "career", "history"],
  skills: ["skills", "tech", "stack", "know", "tools", "technology", "proficient", "framework"],
  education: ["education", "degree", "university", "college", "studied", "graduated", "school"],
  philosophy: ["philosophy", "approach", "believe", "think", "mindset", "values", "principles"]
};

const classifyTopic = (query: string): Topic => {
  const q = query.toLowerCase();
  const scores: Record<Topic, number> = {
    products: 0, experience: 0, skills: 0, education: 0, philosophy: 0, general: 0
  };
  
  for (const t in topicWeights) {
    for (const keyword of topicWeights[t as Exclude<Topic, "general">]) {
      const regex = new RegExp(`\\b${keyword}\\b`, "i");
      if (regex.test(q)) scores[t as Topic]++;
    }
  }

  const best = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
  return best[1] > 0 ? (best[0] as Topic) : "general";
};

const getRelevantContext = (topic: Topic) => {
  // @ts-ignore: To allow destructuring even if some fields are technically optional in the source type, though they exist in knowledgeBase.ts
  const { basics, products, differentiators, experience, currentStatus, skills, primaryExpertise, domainFocus, education, certifications, careerPhilosophy, commonQuestions, professionalSummary, recruiterQuickPitch, socialProof } = anuragContext;
  
  switch (topic) {
    case "products": return { basics, products, differentiators };
    case "experience": return { basics, experience, currentStatus };
    case "skills": return { basics, skills, primaryExpertise, domainFocus };
    case "education": return { basics, education, certifications };
    case "philosophy": return { basics, careerPhilosophy, commonQuestions };
    case "general":
    default:
      return { basics, professionalSummary, recruiterQuickPitch, socialProof };
  }
};

const intentConstraints: Record<Intent, string> = {
  professional: `\n- Be direct and structured.\n- Avoid unnecessary background.\n- Speak like a thoughtful senior PM.\n`,
  playful_redirect: `\n- Do NOT reveal private details.\n- Use light humor.\n- Set a boundary politely.\n- Redirect toward work or product impact.\n`,
  easter_eggs: `\n- Light clever response allowed.\n- Keep it short and warm.\n- End with gentle redirect to work.\n`,
  off_limits: `\n- Do NOT engage the topic.\n- Calm polite deflection.\n- Redirect to professional topics.\n`
};

const baseIdentity = `
You are Anurag Kumar Tripathi speaking in first person.
Never refer to yourself in third person, including in the opening words of a response, even if the user's question uses third-person phrasing (e.g. 'tell me about him'). Always answer entirely in first person, from the very first word.

Tone:
- Calm
- Confident
- Natural
- Senior Product Manager mindset
- No buzzwords or resume dumping
`;

const buildSystemInstructions = (persona: PersonaType, intent: Intent, topic: Topic) => {
  const personaContext = personaPrompts[persona] || "";
  const intentContext = intentConstraints[intent] || "";
  const contextData = JSON.stringify(getRelevantContext(topic));

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
4. Vary sentence structure and phrasing throughout the response. Do not repeat similar sentence templates back-to-back (e.g. reusing 'It was a [adjective] experience' for multiple items in a list). Each point should be worded distinctly.
5. Promptive Sentry, Promptive Sentry for IDE, and Piqque are PRODUCTS I built — NOT separate companies. Xenriq Systems is the company/studio under which these products were built. Never refer to the products themselves as companies.
6. Stay grounded in DATA_SOURCE_FACTS.
7. If missing data, admit it and redirect.
`;
};

const fetchWithTimeout = async (url: string, options: RequestInit, timeout = 24000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const response = await fetch(url, { ...options, signal: controller.signal });
  clearTimeout(id);
  return response;
};

export const handler = async (event: any) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method Not Allowed" }) };
  }

  if (!API_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: "NVIDIA_API_KEY missing from environment variables." }) };
  }

  let body: any;
  try {
    if (!event.body) throw new Error("empty body");
    body = JSON.parse(event.body);
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ error: "Request body is required and must be valid JSON" }) };
  }

  try {
    const { userQuery, persona, mode } = body;

    if (!userQuery || !persona || !mode) {
      return { statusCode: 400, body: JSON.stringify({ error: "Missing required fields" }) };
    }

    if (userQuery.length > 2000) {
      return { statusCode: 400, body: JSON.stringify({ error: "Query is too long. Please limit to 2000 characters." }) };
    }

    let systemPrompt = "";

    if (mode === "assistant") {
      const intent = classifyIntent(userQuery);
      const topic = classifyTopic(userQuery);
      systemPrompt = buildSystemInstructions(persona, intent, topic);
    } else if (mode === "analysis") {
      systemPrompt = `\nYou are an experienced AI Product Manager.\n\nAlways structure responses:\n\n1. Problem Insight\n2. Key Hypotheses (3–5)\n3. Recommended Experiments\n4. Metrics to Watch\n\nFocus on real product decisions.\n\nPersona context: ${persona}\n`;
    } else {
      return { statusCode: 400, body: JSON.stringify({ error: "Invalid mode" }) };
    }

    const response = await fetchWithTimeout(
      API_URL,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: "meta/llama-3.1-8b-instruct",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userQuery }
          ],
          max_tokens: 1250,
          temperature: persona === "browsing" ? 0.7 : 0.35,
          top_p: 0.95
        })
      },
      24000
    );

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      // Using proper backticks for the template literal
      return { 
        statusCode: response.status, 
        body: JSON.stringify({ error: err?.error?.message || `NVIDIA API failed with status ${response.status}` }) 
      };
    }

    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content?.trim();

    if (!text) {
      return { statusCode: 500, body: JSON.stringify({ error: "AI returned empty response." }) };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ response: text })
    };

  } catch (error: any) {
    console.error("NVIDIA API error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error?.message || "AI request failed" })
    };
  }
};
