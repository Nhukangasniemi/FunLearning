export type MealType = "breakfast" | "lunch" | "dinner" | "dessert";

// Legacy FoodItem compatibility
export interface FoodItemType {
  id: string;
  name: string;
  displayName: string;
  phonics: string;
  category: string;
  suitableMeals: MealType[];
  source: string;
  isFromBook: boolean;
  sentence: string;
  bookQuestionRef?: string;
  svg?: string;
  imageUrl?: string;
  userId?: string | null;
}

// Generalized Vocabulary Item
export interface VocabularyItemType {
  id: string;
  unitId: string;
  word: string;
  displayName: string;
  phonics: string;
  partOfSpeech?: string | null;
  category?: string | null;
  exampleSentence: string;
  definition?: string | null;
  svg?: string | null;
  imageUrl?: string | null;
  audioUrl?: string | null;
  isFromBook: boolean;
  bookSource?: string | null;
  sortOrder: number;
  gameMetadata?: Record<string, unknown> | null;
  userId?: string | null;
}

export interface QuizOptionType {
  id: string;
  questionId?: string;
  text: string;
  isCorrect?: boolean;
  imageLabel?: string | null;
  combo?: string[];
  vocabularyItemId?: string | null;
  foodId?: string; // Legacy
  inBag?: boolean; // Legacy
  tag?: string;    // Legacy
}

export interface QuizQuestionType {
  id: string;
  unitId?: string;
  bookPage: string;
  part: string;
  question: string;
  instruction?: string | null;
  audioTranscript: string;
  correctOption: string;
  multiChoice?: boolean;
  fruitsInBag?: string[];
  explanation?: string | null;
  options: QuizOptionType[];
  sortOrder?: number;
}

export interface SpellingPuzzleType {
  word: string;
  letters: string[];
  foodId?: string;
  itemId?: string;
  hint: string;
  category?: string;
}

// Curriculum Models
export interface BookType {
  id: string;
  slug: string;
  title: string;
  series: string;
  level: string;
  targetAge: string;
  description?: string | null;
  coverImage?: string | null;
  themeColor: string;
  sortOrder: number;
  isPublished: boolean;
  units?: UnitType[];
}

export interface UnitType {
  id: string;
  bookId: string;
  unitNumber: number;
  slug: string;
  title: string;
  description?: string | null;
  icon: string;
  themeColor: string;
  companion: string;
  sortOrder: number;
  isPublished: boolean;
  vocabularyItems?: VocabularyItemType[];
  quizQuestions?: QuizQuestionType[];
}

// Progress Models
export interface UnitProgressType {
  id: string;
  userId: string;
  unitId: string;
  starsEarned: number;
  isCompleted: boolean;
  learnCompleted: boolean;
  flashcardsCompleted: boolean;
  gamesCompleted: boolean;
  quizScore: number;
  completedAt?: Date | string | null;
}

export interface WordProgressType {
  id: string;
  userId: string;
  vocabularyItemId: string;
  masteryLevel: number; // 0=new, 1=learning, 2=mastered
  reviewCount: number;
  mistakeCount: number;
  lastReviewedAt?: Date | string | null;
}

export interface UserProgressData {
  stars: number;
  completedMeals?: MealType[];
  quizScore: number;
  spellingScore: number;
}

export interface FullUnitPayload {
  book: BookType;
  unit: UnitType;
  vocabulary: VocabularyItemType[];
  quizQuestions: QuizQuestionType[];
  userProgress?: UnitProgressType | null;
  wordProgress?: Record<string, WordProgressType>;
}
