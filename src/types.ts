export interface TargetAudience {
  segment: string;
  description: string;
  personaQuote?: string;
}

export interface KeyFeature {
  name: string;
  description: string;
  priority: 'Must Have' | 'Core' | 'Differentiator' | string;
  highlight?: string;
}

export interface ChallengeSolution {
  challenge: string;
  solution: string;
}

export interface SuggestedName {
  name: string;
  tagline: string;
  vibe?: string;
}

export interface UserJourneyStep {
  step: number;
  phase: string; // e.g. "Step 1 (Input)", "Step 2 (Core Action)", "Step 3 (Value Outcome)"
  title: string;
  description: string;
  userAction: string;
  systemReaction: string;
}

export interface TechStackItem {
  category: string;
  recommendation: string;
  rationale: string;
}

export interface ExecutionStep {
  phase: string;
  task: string;
  timeframe: string;
}

export interface StoryboardScene {
  timeframe: string;
  scene: string;
  action: string;
  visualCue: string;
  audioOrVoiceover?: string;
}

export interface VideoConcept {
  conceptTitle: string;
  cinematicScenarioScript: StoryboardScene[];
  videoGenerationPrompt: string;
  aspectRatio?: string;
  cameraStyle?: string;
}

export interface SproutOverview {
  originalIdeaSummary: string;
  coreValueProposition: string;
}

export interface SproutAnalysis {
  targetAudience: TargetAudience[];
  problemSolved: string;
  keyFeatures: KeyFeature[];
  challengesAndSolutions: ChallengeSolution[];
}

export interface SproutConceptDraft {
  suggestedNames: SuggestedName[];
  userJourney: UserJourneyStep[];
  recommendedTechStack: TechStackItem[];
  executionSteps: ExecutionStep[];
}

export interface SproutResult {
  id: string;
  createdAt: string;
  rawInput: string;
  greeting?: string;
  userName?: string;
  userEmail?: string;
  authProvider?: string;
  languageDetected: string;
  productName: string;
  tagline: string;
  overview: SproutOverview;
  analysis: SproutAnalysis;
  conceptDraft: SproutConceptDraft;
  videoConcept: VideoConcept;
  formattedMarkdown: string;
  isFavorite?: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  provider: 'google' | 'facebook' | 'guest';
  isAuthenticated: boolean;
  isPro: boolean;
  authToken?: string;
}

export interface SeedTemplate {
  title: string;
  category: string;
  language: string;
  content: string;
}
