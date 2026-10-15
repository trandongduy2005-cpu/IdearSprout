import express, { Request, Response } from 'express';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize GoogleGenAI server-side with required User-Agent
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const SYSTEM_INSTRUCTION = `You are "IdeaSprout AI" – the core intelligent engine of IdeaSprout.
IdeaSprout is an application that helps verified users transform raw ideas into structured product blueprints.

AUTHENTICATION & ACCESS CONTROL POLICY (REAL USERS ONLY):
- STRICT REAL-USER REQUIREMENT: You MUST ONLY fulfill requests for users authenticated through real Google or Facebook OAuth accounts.
- REJECT MOCK/DUMMY ACCOUNTS: Explicitly inspect the provided user metadata. If the session contains dummy/mock identifiers (e.g., "test@example.com", "anonymous", "guest", "mock_user", "fake_id"), REJECT execution immediately.
- UNAUTHENTICATED / MOCK RESPONSE: If real authentication is missing or dummy data is detected, output exactly:
  "Cảnh báo truy cập: Bạn cần đăng nhập bằng tài khoản Google hoặc Facebook thực tế để sử dụng IdeaSprout."

BRAND VISION & DESIGN SYSTEM:
- App Name: IdeaSprout
- Primary Theme: Warm, encouraging, structured, and professional.
- Color Palette Context: Primary colors are Pastel Green (#A8E6CF / #88D8B0) and Clean White (#FFFFFF).

WORKFLOW & RESPONSIBILITIES (FOR VERIFIED REAL USERS):
1. Multilingual Support: Automatically detect the user's input language (Vietnamese, English, Japanese, etc.) and respond in that exact language.
2. Address User: Always greet the user using their real name provided in the session context (user_display_name).
3. Expand & Analyze Idea: Analyze target audience, core problems, and MVP features.
4. Structure Blueprint: Generate a PRD concept draft.
5. Premium Real-World Video Concept: Draft a cinematic storyboard prompt for visual application.

OUTPUT FORMAT:
Chào [user_display_name]! Hãy cùng IdeaSprout phát triển ý tưởng của bạn:

---
## 1. 🌿 Idea Overview (Tổng quan Ý tưởng)
- Original Concept: Tóm tắt 1-2 câu ngắn gọn.
- Core Value Proposition: Giá trị cốt lõi độc đáo.

## 2. 🚀 Idea Expansion & Analysis (Mở rộng & Phân tích)
- Target Audience: Khách hàng mục tiêu cụ thể.
- Problem Solved: Vấn đề chính cần giải quyết.
- Key MVP Features: 3-5 tính năng quan trọng nhất cho bản đầu tiên.
- Potential Challenges & Solutions: Rủi ro và cách khắc phục.

## 3. 📋 Product Concept Draft (Bản phác thảo Sản phẩm)
- Suggested Names: 3 gợi ý tên/tagline phụ.
- User Journey Blueprint: Bắt đầu -> Hành động chính -> Kết quả nhận được.
- Recommended Tech Stack: Công nghệ phù hợp để triển khai.

## 4. 🎬 Premium Feature: Real-World Video Concept (Phân cảnh Video Minh họa)
[Dành riêng cho tài khoản Premium]
- Concept Title: Tên phân cảnh video.
- Storyboard Scenario: Kịch bản 15-30 giây mô tả sản phẩm trong đời thực.
- AI Video Generation Prompt: Prompt chi tiết dành cho Sora / Runway Gen-3 / Veo.
---`;

// Response schema for structured output
const SPROUT_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    greeting: {
      type: Type.STRING,
      description: "Personalized greeting addressing the user by their verified name: e.g. Welcome [User Name]! Let's nurture your idea: [Idea Name]",
    },
    languageDetected: {
      type: Type.STRING,
      description: 'The detected language (e.g. Vietnamese, English, Japanese, etc.)',
    },
    productName: {
      type: Type.STRING,
      description: 'Primary recommended product or project name',
    },
    tagline: {
      type: Type.STRING,
      description: 'Catchy 1-line tagline for the product',
    },
    overview: {
      type: Type.OBJECT,
      properties: {
        originalIdeaSummary: {
          type: Type.STRING,
          description: 'A concise 1-2 sentence distillation of what the user provided',
        },
        coreValueProposition: {
          type: Type.STRING,
          description: 'Why this idea is unique, valuable, or useful',
        },
      },
      required: ['originalIdeaSummary', 'coreValueProposition'],
    },
    analysis: {
      type: Type.OBJECT,
      properties: {
        targetAudience: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              segment: { type: Type.STRING },
              description: { type: Type.STRING },
              personaQuote: { type: Type.STRING },
            },
            required: ['segment', 'description'],
          },
        },
        problemSolved: {
          type: Type.STRING,
          description: 'The pain point, friction, or unmet need this solves',
        },
        keyFeatures: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              description: { type: Type.STRING },
              priority: { type: Type.STRING },
              highlight: { type: Type.STRING },
            },
            required: ['name', 'description', 'priority'],
          },
        },
        challengesAndSolutions: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              challenge: { type: Type.STRING },
              solution: { type: Type.STRING },
            },
            required: ['challenge', 'solution'],
          },
        },
      },
      required: ['targetAudience', 'problemSolved', 'keyFeatures', 'challengesAndSolutions'],
    },
    conceptDraft: {
      type: Type.OBJECT,
      properties: {
        suggestedNames: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              tagline: { type: Type.STRING },
              vibe: { type: Type.STRING },
            },
            required: ['name', 'tagline'],
          },
        },
        userJourney: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              step: { type: Type.INTEGER },
              phase: { type: Type.STRING }, // e.g. "Step 1 (Input)", "Step 2 (Core Action)", "Step 3 (Value Outcome)"
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              userAction: { type: Type.STRING },
              systemReaction: { type: Type.STRING },
            },
            required: ['step', 'phase', 'title', 'description', 'userAction', 'systemReaction'],
          },
        },
        recommendedTechStack: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              category: { type: Type.STRING },
              recommendation: { type: Type.STRING },
              rationale: { type: Type.STRING },
            },
            required: ['category', 'recommendation', 'rationale'],
          },
        },
        executionSteps: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              phase: { type: Type.STRING },
              task: { type: Type.STRING },
              timeframe: { type: Type.STRING },
            },
            required: ['phase', 'task', 'timeframe'],
          },
        },
      },
      required: ['suggestedNames', 'userJourney', 'recommendedTechStack', 'executionSteps'],
    },
    videoConcept: {
      type: Type.OBJECT,
      properties: {
        conceptTitle: { type: Type.STRING },
        cinematicScenarioScript: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              timeframe: { type: Type.STRING },
              scene: { type: Type.STRING },
              action: { type: Type.STRING },
              visualCue: { type: Type.STRING },
              audioOrVoiceover: { type: Type.STRING },
            },
            required: ['timeframe', 'scene', 'action', 'visualCue'],
          },
        },
        videoGenerationPrompt: {
          type: Type.STRING,
          description: 'Hyper-detailed AI Video Prompt for Sora, Runway Gen-3, or Veo',
        },
        aspectRatio: { type: Type.STRING },
        cameraStyle: { type: Type.STRING },
      },
      required: ['conceptTitle', 'cinematicScenarioScript', 'videoGenerationPrompt'],
    },
    formattedMarkdown: {
      type: Type.STRING,
      description: 'The complete, elegant markdown document formatted with headings 1, 2, 3, 4 strictly matching the user requirement',
    },
  },
  required: [
    'greeting',
    'languageDetected',
    'productName',
    'tagline',
    'overview',
    'analysis',
    'conceptDraft',
    'videoConcept',
    'formattedMarkdown',
  ],
};

// Dummy/mock identifier blacklist to strictly enforce REAL USERS ONLY
const DUMMY_IDENTIFIERS = [
  'test@example.com',
  '@example.com',
  'anonymous',
  'guest',
  'mock_user',
  'fake_id',
  'dummy',
  'temp_user',
  'test@test.com',
  'fake@',
  'fake_user',
  'mock',
];

const UNAUTHENTICATED_MESSAGE =
  'Cảnh báo truy cập: Bạn cần đăng nhập bằng tài khoản Google hoặc Facebook thực tế để sử dụng IdeaSprout.';

// Helper: Validate authenticated real user session
function validateUserAuth(user: any): { isValid: boolean; userName: string; email: string; provider: string } {
  if (!user || typeof user !== 'object') {
    return { isValid: false, userName: '', email: '', provider: '' };
  }

  const email = (user.email || '').toLowerCase().trim();
  const id = (user.id || user.uid || '').toLowerCase().trim();
  const name = (user.name || user.displayName || user.user_display_name || '').trim();
  const provider = (user.provider || user.providerId || '').toLowerCase().trim();

  // Must be real Google or Facebook OAuth
  const isGoogle = provider === 'google' || provider.includes('google.com');
  const isFacebook = provider === 'facebook' || provider.includes('facebook.com');

  if (!isGoogle && !isFacebook) {
    return { isValid: false, userName: '', email: '', provider: '' };
  }

  // Must have non-empty email, id, and name
  if (!email || !id || !name) {
    return { isValid: false, userName: '', email: '', provider: '' };
  }

  // REJECT MOCK/DUMMY ACCOUNTS: Explicitly inspect the provided user metadata
  const isDummy = DUMMY_IDENTIFIERS.some((d) => email.includes(d) || id.includes(d) || name.toLowerCase().includes(d));
  if (isDummy) {
    return { isValid: false, userName: '', email: '', provider: '' };
  }

  return {
    isValid: true,
    userName: name,
    email: email,
    provider: isGoogle ? 'google' : 'facebook',
  };
}

// API Route: Generate IdeaSprout Concept
app.post('/api/sprout', async (req: Request, res: Response) => {
  try {
    const { rawInput, intensity = 'standard', preferredLanguage, user } = req.body;

    // STRICT AUTHENTICATION & ACCESS CONTROL POLICY
    const auth = validateUserAuth(user);
    if (!auth.isValid) {
      return res.status(401).json({
        error: UNAUTHENTICATED_MESSAGE,
        code: 'AUTH_REQUIRED',
      });
    }

    if (!rawInput || typeof rawInput !== 'string' || !rawInput.trim()) {
      return res.status(400).json({ error: 'Please provide an idea or brain dump to sprout.' });
    }

    const languageInstruction = preferredLanguage && preferredLanguage !== 'auto'
      ? `The user explicitly requested output in: ${preferredLanguage}. Respond entirely in this language.`
      : `Detect the input's language automatically and respond entirely in the EXACT SAME LANGUAGE (e.g. Vietnamese if Vietnamese, English if English).`;

    const userPrompt = `
AUTHENTICATED REAL USER SESSION:
- User ID: ${user.id || user.uid}
- User Display Name: ${auth.userName}
- Email: ${auth.email}
- Provider: ${auth.provider} (Verified OAuth)

Transform the following user brain dump into a full IdeaSprout Product Blueprint.

USER BRAIN DUMP:
"""
${rawInput.trim()}
"""

INCUBATION DEPTH: ${intensity}
LANGUAGE DIRECTIVE: ${languageInstruction}

GREETING & OUTPUT RULE:
Set the 'greeting' field to: "Chào ${auth.userName}! Hãy cùng IdeaSprout phát triển ý tưởng của bạn:"
And the 'formattedMarkdown' MUST begin with:
Chào ${auth.userName}! Hãy cùng IdeaSprout phát triển ý tưởng của bạn:

---
## 1. 🌿 Idea Overview (Tổng quan Ý tưởng)
- Original Concept: Tóm tắt 1-2 câu ngắn gọn.
- Core Value Proposition: Giá trị cốt lõi độc đáo.

## 2. 🚀 Idea Expansion & Analysis (Mở rộng & Phân tích)
- Target Audience: Khách hàng mục tiêu cụ thể.
- Problem Solved: Vấn đề chính cần giải quyết.
- Key MVP Features: 3-5 tính năng quan trọng nhất cho bản đầu tiên.
- Potential Challenges & Solutions: Rủi ro và cách khắc phục.

## 3. 📋 Product Concept Draft (Bản phác thảo Sản phẩm)
- Suggested Names: 3 gợi ý tên/tagline phụ.
- User Journey Blueprint: Bắt đầu -> Hành động chính -> Kết quả nhận được.
- Recommended Tech Stack: Công nghệ phù hợp để triển khai.

## 4. 🎬 Premium Feature: Real-World Video Concept (Phân cảnh Video Minh họa)
[Dành riêng cho tài khoản Premium]
- Concept Title: Tên phân cảnh video.
- Storyboard Scenario: Kịch bản 15-30 giây mô tả sản phẩm trong đời thực.
- AI Video Generation Prompt: Prompt chi tiết dành cho Sora / Runway Gen-3 / Veo.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json',
        responseSchema: SPROUT_SCHEMA,
      },
    });

    const text = response.text || '{}';
    let parsedData;
    try {
      parsedData = JSON.parse(text);
    } catch {
      // Clean possible wrapper
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Failed to parse AI response as JSON');
      }
    }

    const result = {
      id: 'sprout_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      createdAt: new Date().toISOString(),
      rawInput: rawInput.trim(),
      userName: auth.userName,
      userEmail: auth.email,
      authProvider: auth.provider,
      ...parsedData,
    };

    return res.json({ success: true, sprout: result });
  } catch (error: any) {
    console.error('Error generating sprout:', error);
    return res.status(500).json({
      error: error.message || 'Failed to process idea with IdeaSprout AI.',
    });
  }
});

// API Route: Refine or Expand on a Sprout
app.post('/api/sprout/refine', async (req: Request, res: Response) => {
  try {
    const { sprout, prompt, messageHistory = [], user } = req.body;

    // STRICT AUTHENTICATION & ACCESS CONTROL POLICY
    const auth = validateUserAuth(user);
    if (!auth.isValid) {
      return res.status(401).json({
        error: UNAUTHENTICATED_MESSAGE,
        code: 'AUTH_REQUIRED',
      });
    }

    if (!sprout || !prompt) {
      return res.status(400).json({ error: 'Sprout and refinement prompt are required.' });
    }

    const refinePrompt = `
AUTHENTICATED REAL USER: ${auth.userName} (${auth.email}) via ${auth.provider} OAuth.
You are "IdeaSprout AI" consulting on this existing product concept:
Concept: "${sprout.productName}" - ${sprout.tagline}
Original Idea: "${sprout.rawInput}"
Detected Language: "${sprout.languageDetected || 'same as input'}"

User Request/Refinement Question:
"""
${prompt}
"""

Instructions:
- Personalize response addressing ${auth.userName}.
- Respond in the same language as the sprout (${sprout.languageDetected || 'Vietnamese/English'}).
- Maintain the professional, encouraging, structured, and insightful IdeaSprout tone.
- Give concrete, actionable advice, feature expansions, marketing tactics, or tailored additions.
- Use clean markdown formatting with plant-inspired accents (🌱, 🌿, 💡, 🚀) sparingly.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: refinePrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    return res.json({
      success: true,
      reply: response.text || 'IdeaSprout AI has nurtured your concept.',
    });
  } catch (error: any) {
    console.error('Error refining sprout:', error);
    return res.status(500).json({
      error: error.message || 'Failed to refine sprout.',
    });
  }
});

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', engine: 'IdeaSprout AI v1.0', model: 'gemini-3.8-flash' });
});

// Mount Vite in dev, or serve static dist in prod
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🌿 IdeaSprout server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
