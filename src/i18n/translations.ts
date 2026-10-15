export type UILanguage = 'vi' | 'en' | 'ja' | 'fr';

export interface Translations {
  appName: string;
  appTagline: string;
  newIdea: string;
  garden: string;
  gardenTitle: string;
  login: string;
  languageSettings: string;
  languageSettingsDesc: string;
  uiLanguageLabel: string;
  aiOutputLanguageLabel: string;
  autoDetect: string;
  saveSettings: string;
  heroBadge: string;
  heroTitlePrefix: string;
  heroTitleHighlight: string;
  heroDesc: string;
  incubatorTitle: string;
  incubatorSubtitle: string;
  textareaPlaceholder: string;
  voiceDump: string;
  listening: string;
  characters: string;
  depthLabel: string;
  depthQuick: string;
  depthStandard: string;
  depthDeep: string;
  sproutButton: string;
  sprouting: string;
  seedInspiration: string;
  readyToInspect: string;
  sampleConcept: string;
  viewBlueprint: string;
  methodologyTitle: string;
  methodologySubtitle: string;
  methodologyStep1Title: string;
  methodologyStep1Desc: string;
  methodologyStep2Title: string;
  methodologyStep2Desc: string;
  methodologyStep3Title: string;
  methodologyStep3Desc: string;
  methodologyStep4Title: string;
  methodologyStep4Desc: string;
  tabAll: string;
  tabOverview: string;
  tabExpansion: string;
  tabDraft: string;
  tabVideo: string;
  tabMarkdown: string;
  tabConsult: string;
  copyMarkdown: string;
  copied: string;
  downloadMd: string;
  onePager: string;
}

export const TRANSLATIONS: Record<UILanguage, Translations> = {
  vi: {
    appName: 'IdeaSprout',
    appTagline: 'Ươm mầm ý tưởng thô sơ thành bản phác thảo sản phẩm hoàn chỉnh',
    newIdea: 'Ý Tưởng Mới',
    garden: 'Vườn Ý Tưởng',
    gardenTitle: 'Kho Ý Tưởng Đã Ươm Mầm',
    login: 'Đăng Nhập',
    languageSettings: 'Cài Đặt Ngôn Ngữ',
    languageSettingsDesc: 'Tùy chỉnh ngôn ngữ hiển thị giao diện và ngôn ngữ AI phản hồi',
    uiLanguageLabel: 'Ngôn ngữ giao diện ứng dụng',
    aiOutputLanguageLabel: 'Ngôn ngữ bản phác thảo AI (Mặc định)',
    autoDetect: 'Tự động phát hiện (Cùng ngôn ngữ với ý tưởng)',
    saveSettings: 'Lưu Cài Đặt',
    heroBadge: 'Công Cụ Ươm Mầm Ý Tưởng Thông Minh',
    heroTitlePrefix: 'Nơi những ý tưởng thô sơ ',
    heroTitleHighlight: 'nở rộ thành sản phẩm',
    heroDesc: 'Biến những suy nghĩ lộn xộn, ghi chú rời rạc thành Bản Phác Thảo Sản Phẩm 4 phần: Tổng quan & UVP, Phân tích thị trường & MVP, Bản thiết kế hành trình người dùng, và Video minh họa điện ảnh.',
    incubatorTitle: 'Gieo hạt mầm ý tưởng của bạn vào đây',
    incubatorSubtitle: 'Chấp nhận mọi ý tưởng lộn xộn bằng bất kỳ ngôn ngữ nào • Tự động nhận diện & trả lời tự nhiên',
    textareaPlaceholder: 'Nhập bất kỳ ý tưởng thô sơ nào của bạn... Ví dụ: "Ứng dụng cho thuê đồ cắm trại giữa các hộ dân trong chung cư", "Một ứng dụng hẹn hò tìm bạn cùng học tiếng Anh theo sở thích..."',
    voiceDump: 'Nói Ý Tưởng (Voice)',
    listening: 'Đang lắng nghe...',
    characters: 'ký tự',
    depthLabel: 'Độ sâu:',
    depthQuick: '🌱 Mầm Nhanh (MVP Tinh Gọn)',
    depthStandard: '🌿 Tiêu Chuẩn (PRD Toàn Diện)',
    depthDeep: '🌳 Chuyên Sâu (Blueprint Đầy Đủ)',
    sproutButton: 'Ươm Mầm Ý Tưởng',
    sprouting: 'Đang Ươm Mầm...',
    seedInspiration: 'Cần cảm hứng? Thử một trong các hạt giống mẫu dưới đây:',
    readyToInspect: 'Đã sẵn sàng khám phá',
    sampleConcept: 'Ý Tưởng Mẫu Minh Họa',
    viewBlueprint: 'Xem Bản Phác Thảo 4 Phần',
    methodologyTitle: 'Quy Trình Ươm Mầm IdeaSprout',
    methodologySubtitle: 'Đưa nhà sáng tạo từ suy nghĩ mơ hồ đến sản phẩm rõ ràng, sẵn sàng thuyết trình',
    methodologyStep1Title: '🌿 Lắng Nghe & Xác Thực',
    methodologyStep1Desc: 'Chắt lọc ý tưởng ban đầu thành bản tóm tắt súc tích và Tuyên ngôn Giá trị Cốt lõi (UVP).',
    methodologyStep2Title: '🚀 Mở Rộng & Nuôi Dưỡng',
    methodologyStep2Desc: 'Phân tích chân dung khách hàng, vấn đề cốt lõi, 3-5 tính năng MVP và giải pháp vượt qua rào cản.',
    methodologyStep3Title: '📋 Phác Thảo Sản Phẩm',
    methodologyStep3Desc: '3 phương án đặt tên & slogan, Hành trình người dùng 3 bước (Đầu vào → Hành động → Giá trị) và Tech Stack.',
    methodologyStep4Title: '🎬 Phân Cảnh Video',
    methodologyStep4Desc: 'Kịch bản phân cảnh 15-30 giây ngoài đời thực kèm Video Prompt chi tiết cho Sora, Runway Gen-3 hoặc Veo.',
    tabAll: '🌱 Toàn Bộ Bản Phác Thảo',
    tabOverview: '🌿 1. Tổng Quan',
    tabExpansion: '🚀 2. Mở Rộng',
    tabDraft: '📋 3. Phác Thảo',
    tabVideo: '🎬 4. Video Minh Họa',
    tabMarkdown: '📄 Xem Markdown',
    tabConsult: '💬 Trò Chuyện Cùng AI',
    copyMarkdown: 'Sao Chép Markdown',
    copied: 'Đã Sao Chép!',
    downloadMd: 'Tải File .md',
    onePager: 'Bản Tóm Tắt One-Pager',
  },
  en: {
    appName: 'IdeaSprout',
    appTagline: 'Transform raw brain dumps into actionable product blueprints',
    newIdea: 'New Idea',
    garden: 'Sprout Garden',
    gardenTitle: 'Nurtured Product Library',
    login: 'Log In',
    languageSettings: 'Language Settings',
    languageSettingsDesc: 'Customize display interface language and default AI output language',
    uiLanguageLabel: 'App Interface Language',
    aiOutputLanguageLabel: 'Default AI Output Language',
    autoDetect: 'Auto-Detect (Same language as your idea)',
    saveSettings: 'Save Preferences',
    heroBadge: 'IdeaSprout AI Intelligent Incubator',
    heroTitlePrefix: 'Where raw brain dumps ',
    heroTitleHighlight: 'bloom into products',
    heroDesc: 'Transform brief, messy thoughts into a structured 4-part Product Concept Blueprint: Overview & UVP, Market Expansion & MVP, 3-Step User Journey Timeline, and Premium Cinematic Video Prompts.',
    incubatorTitle: 'Plant your raw brain dump below',
    incubatorSubtitle: 'Accepts messy drafts in any language • Detects & replies naturally',
    textareaPlaceholder: 'Spill your unformed thought here... E.g. "A peer-to-peer equipment sharing locker for apartment complexes with QR deposit...", "An app connecting local artisanal tailors with fashion designers..."',
    voiceDump: 'Voice Dump',
    listening: 'Listening...',
    characters: 'characters',
    depthLabel: 'Depth:',
    depthQuick: '🌱 Quick Seed (Fast MVP)',
    depthStandard: '🌿 Balanced Sprout (Full PRD)',
    depthDeep: '🌳 Deep Forest (Thorough Blueprint)',
    sproutButton: 'Sprout Idea',
    sprouting: 'Nurturing Sprout...',
    seedInspiration: 'Need inspiration? Try one of these starter seeds:',
    readyToInspect: 'Ready to inspect',
    sampleConcept: 'Sample Concept',
    viewBlueprint: 'View 4-Part Blueprint',
    methodologyTitle: 'The IdeaSprout Methodology',
    methodologySubtitle: 'Guiding creators from messy confusion to pitch-ready clarity',
    methodologyStep1Title: '🌿 Listen & Validate',
    methodologyStep1Desc: 'Distills unstructured brain dumps into a sharp original idea summary and core value proposition (UVP).',
    methodologyStep2Title: '🚀 Expand & Nurture',
    methodologyStep2Desc: 'Maps target audience personas, isolates pain points, defines 3-5 MVP features, and anticipates roadblocks.',
    methodologyStep3Title: '📋 Structure Draft',
    methodologyStep3Desc: '3 creative naming taglines, a 3-step User Journey (Input → Core Action → Value Outcome), and tech stack.',
    methodologyStep4Title: '🎬 Video Concept',
    methodologyStep4Desc: 'Premium real-world application storyboard and hyper-detailed AI video prompt for Veo, Runway, or Sora.',
    tabAll: '🌱 Complete Blueprint',
    tabOverview: '🌿 1. Overview',
    tabExpansion: '🚀 2. Expansion',
    tabDraft: '📋 3. Concept Draft',
    tabVideo: '🎬 4. Video Concept',
    tabMarkdown: '📄 Markdown View',
    tabConsult: '💬 Consult AI',
    copyMarkdown: 'Copy Markdown',
    copied: 'Copied!',
    downloadMd: 'Download .md',
    onePager: 'One-Pager Summary',
  },
  ja: {
    appName: 'IdeaSprout',
    appTagline: '未完成のアイデアを行動可能なプロダクト構想へ',
    newIdea: '新しいアイデア',
    garden: 'アイデアガーデン',
    gardenTitle: '育成されたアイデア一覧',
    login: 'ログイン',
    languageSettings: '言語設定',
    languageSettingsDesc: 'インターフェース言語とAI出力言語を設定',
    uiLanguageLabel: '画面表示言語',
    aiOutputLanguageLabel: 'AI出力言語 (デフォルト)',
    autoDetect: '自動検出 (入力と同じ言語)',
    saveSettings: '設定を保存',
    heroBadge: 'IdeaSprout AI インテリジェント・インキュベーター',
    heroTitlePrefix: '粗削りなアイデアが、',
    heroTitleHighlight: '本物のプロダクトに芽吹く場所',
    heroDesc: '断片的な思考を、概要とUVP、市場分析とMVP機能、3ステップのユーザージャーニー、そしてリアルな動画シナリオの4部構成の設計図へと育て上げます。',
    incubatorTitle: 'あなたのアイデアの種をここに植えてください',
    incubatorSubtitle: 'どんな言語のラフなメモでもOK • 自動言語認識',
    textareaPlaceholder: '思いついたことをそのまま入力してください...',
    voiceDump: '音声入力',
    listening: '聞き取り中...',
    characters: '文字',
    depthLabel: '深度:',
    depthQuick: '🌱 クイック (MVP基本構成)',
    depthStandard: '🌿 スタンダード (本格PRD)',
    depthDeep: '🌳 ディープ (詳細設計図)',
    sproutButton: 'アイデアを芽吹かせる',
    sprouting: '育成中...',
    seedInspiration: 'ヒントをお探しですか？以下のシードをお試しください:',
    readyToInspect: 'プレビュー可能',
    sampleConcept: 'サンプル構想',
    viewBlueprint: '4部構成の設計図を見る',
    methodologyTitle: 'IdeaSprout メソドロジー',
    methodologySubtitle: '混乱から明晰なピッチレディへ',
    methodologyStep1Title: '🌿 傾聴と検証',
    methodologyStep1Desc: '粗いアイデアから本質的な要約とコアバリュープロポジションを抽出します。',
    methodologyStep2Title: '🚀 拡張と育成',
    methodologyStep2Desc: 'ターゲットペルソナ、MVP機能、障害と解決策を整理します。',
    methodologyStep3Title: '📋 プロダクト設計',
    methodologyStep3Desc: '3つのネーミング案、3ステップのユーザージャーニー、推奨技術スタック。',
    methodologyStep4Title: '🎬 動画コンセプト',
    methodologyStep4Desc: '実世界での利用シーンを描く絵コンテと詳細なAI動画プロンプト。',
    tabAll: '🌱 設計図全体',
    tabOverview: '🌿 1. 概要',
    tabExpansion: '🚀 2. 拡張分析',
    tabDraft: '📋 3. プロダクト設計',
    tabVideo: '🎬 4. 動画コンセプト',
    tabMarkdown: '📄 Markdown',
    tabConsult: '💬 AIに相談',
    copyMarkdown: 'Markdownをコピー',
    copied: 'コピーしました!',
    downloadMd: '.mdをダウンロード',
    onePager: 'ワンペーパー概要',
  },
  fr: {
    appName: 'IdeaSprout',
    appTagline: 'Transformez vos idées brutes en concepts de produits actionnables',
    newIdea: 'Nouvelle idée',
    garden: 'Jardin des Idées',
    gardenTitle: 'Bibliothèque des concepts',
    login: 'Connexion',
    languageSettings: 'Paramètres de langue',
    languageSettingsDesc: 'Personnalisez la langue de l’interface et la sortie de l’IA',
    uiLanguageLabel: 'Langue de l’interface',
    aiOutputLanguageLabel: 'Langue de réponse IA par défaut',
    autoDetect: 'Détection automatique (Même langue que votre idée)',
    saveSettings: 'Enregistrer',
    heroBadge: 'Incubateur Intelligent IdeaSprout AI',
    heroTitlePrefix: 'Là où les idées brutes ',
    heroTitleHighlight: 'fleurissent en produits',
    heroDesc: 'Transformez vos pensées désordonnées en un plan de produit structuré en 4 parties : Vue d’ensemble, Analyse & MVP, Parcours utilisateur en 3 étapes, et Scénarios vidéo cinématiques.',
    incubatorTitle: 'Déposez votre idée brute ci-dessous',
    incubatorSubtitle: 'Accepte les ébauches dans n’importe quelle langue • Détection automatique',
    textareaPlaceholder: 'Écrivez votre idée brute ici...',
    voiceDump: 'Dictée vocale',
    listening: 'Écoute en cours...',
    characters: 'caractères',
    depthLabel: 'Profondeur :',
    depthQuick: '🌱 Rapide (MVP)',
    depthStandard: '🌿 Équilibré (PRD)',
    depthDeep: '🌳 Approfondi (Blueprint)',
    sproutButton: 'Faire germer l’idée',
    sprouting: 'Germination en cours...',
    seedInspiration: 'Besoin d’inspiration ? Essayez une de ces idées de départ :',
    readyToInspect: 'Prêt à explorer',
    sampleConcept: 'Concept d’exemple',
    viewBlueprint: 'Voir le plan en 4 parties',
    methodologyTitle: 'La Méthodologie IdeaSprout',
    methodologySubtitle: 'Guider les créateurs de la confusion à la clarté',
    methodologyStep1Title: '🌿 Écoute & Validation',
    methodologyStep1Desc: 'Distille les pensées brutes en un résumé clair et une proposition de valeur unique.',
    methodologyStep2Title: '🚀 Expansion & Nutrition',
    methodologyStep2Desc: 'Cartographie des personas, fonctionnalités MVP et anticipation des défis.',
    methodologyStep3Title: '📋 Ébauche de Produit',
    methodologyStep3Desc: '3 suggestions de noms, parcours utilisateur en 3 étapes et pile technique.',
    methodologyStep4Title: '🎬 Scénario Vidéo',
    methodologyStep4Desc: 'Storyboarding en conditions réelles et prompt vidéo IA détaillé pour Sora ou Veo.',
    tabAll: '🌱 Plan complet',
    tabOverview: '🌿 1. Aperçu',
    tabExpansion: '🚀 2. Expansion',
    tabDraft: '📋 3. Ébauche',
    tabVideo: '🎬 4. Vidéo',
    tabMarkdown: '📄 Markdown',
    tabConsult: '💬 Consulter l’IA',
    copyMarkdown: 'Copier Markdown',
    copied: 'Copié !',
    downloadMd: 'Télécharger .md',
    onePager: 'Résumé One-Pager',
  },
};
