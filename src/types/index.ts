export type MealType = "breakfast" | "lunch" | "dinner" | "dessert";

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

export interface QuizOption {
  id: string;
  text: string;
  foodId?: string;
  combo?: string[];
  isCorrect?: boolean;
  inBag?: boolean;
  tag?: string;
  imageLabel?: string;
}

export interface QuizQuestionType {
  id: string;
  bookPage: string;
  part: string;
  question: string;
  instruction: string;
  audioTranscript: string;
  correctOption: string;
  multiChoice?: boolean;
  fruitsInBag?: string[];
  options: QuizOption[];
  explanation: string;
}

export interface SpellingPuzzleType {
  word: string;
  letters: string[];
  foodId: string;
  hint: string;
}

export interface UserProgressData {
  stars: number;
  completedMeals: MealType[];
  quizScore: number;
  spellingScore: number;
}

