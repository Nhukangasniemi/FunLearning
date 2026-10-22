import { BookType, UnitType, VocabularyItemType, FullUnitPayload } from "@/types";
import { FOOD_ITEMS } from "@/data/foodItems";
import { BOOK_QUIZ_QUESTIONS } from "@/data/quizQuestions";

// =========================================================================
// 1. OFFICIAL CAMBRIDGE BOOKS (Starters, Movers, Flyers)
// =========================================================================
export const BOOKS: BookType[] = [
  {
    id: "book-starters",
    slug: "starters",
    title: "Get Ready for Starters",
    series: "Starters",
    level: "Pre-A1",
    targetAge: "3-8",
    description: "Foundational English for young learners: phonics, tactile vocabulary, companion Lily, and Cambridge YLE Starters practice tests.",
    themeColor: "#ec4899",
    sortOrder: 1,
    isPublished: true,
  },
  {
    id: "book-movers",
    slug: "movers",
    title: "Get Ready for Movers",
    series: "Movers",
    level: "A1",
    targetAge: "8-10",
    description: "Expanded grammar, descriptive storytelling, prepositions of place, and Cambridge YLE Movers practice dialogues.",
    themeColor: "#8b5cf6",
    sortOrder: 2,
    isPublished: true,
  },
  {
    id: "book-flyers",
    slug: "flyers",
    title: "Get Ready for Flyers",
    series: "Flyers",
    level: "A2",
    targetAge: "10-13",
    description: "Fluent reading comprehension, grammar challenges, AI riddles, and junior exam preparation.",
    themeColor: "#3b82f6",
    sortOrder: 3,
    isPublished: true,
  },
];

// =========================================================================
// 2. UNITS FOR GET READY FOR STARTERS
// =========================================================================
export const STARTERS_UNITS: UnitType[] = [
  {
    id: "starters-u1-classroom",
    bookId: "book-starters",
    unitNumber: 1,
    slug: "unit-1-classroom",
    title: "Hello & Classroom",
    description: "Learn classroom supplies, greetings, and school object vocabulary.",
    icon: "GraduationCap",
    themeColor: "#3b82f6",
    companion: "lily",
    sortOrder: 1,
    isPublished: true,
  },
  {
    id: "starters-u2-family",
    bookId: "book-starters",
    unitNumber: 2,
    slug: "unit-2-family",
    title: "My Family & Friends",
    description: "Meet family members: mum, dad, brother, sister, grandpa, and grandma.",
    icon: "Users",
    themeColor: "#10b981",
    companion: "lily",
    sortOrder: 2,
    isPublished: true,
  },
  {
    id: "starters-u3-toys",
    bookId: "book-starters",
    unitNumber: 3,
    slug: "unit-3-toys",
    title: "Playtime & Toys",
    description: "Explore favourite toys: robot, teddy bear, kite, ball, bike, and train.",
    icon: "Gamepad2",
    themeColor: "#f59e0b",
    companion: "lily",
    sortOrder: 3,
    isPublished: true,
  },
  {
    id: "starters-u4-food",
    bookId: "book-starters",
    unitNumber: 4,
    slug: "unit-4-food",
    title: "Food & Drinks!",
    description: "Lily's delicious meals, tropical fruits, snacks, and Cambridge practice exam questions.",
    icon: "Utensils",
    themeColor: "#ec4899",
    companion: "lily",
    sortOrder: 4,
    isPublished: true,
  },
  {
    id: "starters-u5-animals",
    bookId: "book-starters",
    unitNumber: 5,
    slug: "unit-5-animals",
    title: "Animals & Pets",
    description: "Friendly pets and wild zoo creatures: dog, cat, monkey, elephant, and giraffe.",
    icon: "Heart",
    themeColor: "#14b8a6",
    companion: "lily",
    sortOrder: 5,
    isPublished: true,
  },
  {
    id: "starters-u6-clothes",
    bookId: "book-starters",
    unitNumber: 6,
    slug: "unit-6-clothes",
    title: "Clothes & Dressing",
    description: "Dress Lily for sunshine and rain: hat, dress, shirt, shoes, jacket, and socks.",
    icon: "Shirt",
    themeColor: "#a855f7",
    companion: "lily",
    sortOrder: 6,
    isPublished: true,
  },
];

// =========================================================================
// 3. VOCABULARY ITEMS FOR UNITS
// =========================================================================

// Convert Food Items into VocabularyItemType
const FOOD_VOCABULARY_ITEMS: VocabularyItemType[] = FOOD_ITEMS.map((item, idx) => ({
  id: item.id,
  unitId: "starters-u4-food",
  word: item.name,
  displayName: item.displayName,
  phonics: item.phonics,
  partOfSpeech: "noun",
  category: item.category,
  exampleSentence: item.sentence,
  definition: `Cambridge Starters word for ${item.displayName}`,
  svg: item.svg || null,
  imageUrl: item.imageUrl || null,
  audioUrl: null,
  isFromBook: item.isFromBook,
  bookSource: item.source,
  sortOrder: idx + 1,
  gameMetadata: {
    suitableMeals: item.suitableMeals,
    bookQuestionRef: item.bookQuestionRef,
  },
  userId: item.userId || null,
}));

// Unit 1 Classroom Items
const CLASSROOM_ITEMS: VocabularyItemType[] = [
  {
    id: "pencil",
    unitId: "starters-u1-classroom",
    word: "pencil",
    displayName: "Pencil",
    phonics: "pen · cil",
    partOfSpeech: "noun",
    category: "stationery",
    exampleSentence: "I write my name with a sharp yellow pencil.",
    definition: "An instrument for writing or drawing.",
    svg: `<svg viewBox="0 0 100 100" class="food-svg"><polygon points="20,80 30,85 25,75" fill="#f59e0b"/><rect x="25" y="25" width="50" height="20" transform="rotate(-45 50 35)" rx="4" fill="#fbbf24"/><polygon points="15,85 20,80 25,85" fill="#1e293b"/></svg>`,
    isFromBook: true,
    bookSource: "Page 6",
    sortOrder: 1,
  },
  {
    id: "book",
    unitId: "starters-u1-classroom",
    word: "book",
    displayName: "Book",
    phonics: "book",
    partOfSpeech: "noun",
    category: "stationery",
    exampleSentence: "Lily loves reading her English story book.",
    definition: "Pages bound together for reading.",
    svg: `<svg viewBox="0 0 100 100" class="food-svg"><path d="M20 30 Q50 35 50 75 Q20 70 20 30 Z" fill="#3b82f6"/><path d="M80 30 Q50 35 50 75 Q80 70 80 30 Z" fill="#60a5fa"/><line x1="50" y1="35" x2="50" y2="75" stroke="#1d4ed8" stroke-width="3"/></svg>`,
    isFromBook: true,
    bookSource: "Page 6",
    sortOrder: 2,
  },
  {
    id: "ruler",
    unitId: "starters-u1-classroom",
    word: "ruler",
    displayName: "Ruler",
    phonics: "rul · er",
    partOfSpeech: "noun",
    category: "stationery",
    exampleSentence: "Draw a straight blue line with your ruler.",
    definition: "A strip of wood or plastic used to draw straight lines.",
    svg: `<svg viewBox="0 0 100 100" class="food-svg"><rect x="15" y="42" width="70" height="16" rx="2" fill="#38bdf8" stroke="#0284c7" stroke-width="2"/><line x1="25" y1="42" x2="25" y2="50" stroke="#0369a1" stroke-width="2"/><line x1="35" y1="42" x2="35" y2="48" stroke="#0369a1" stroke-width="2"/><line x1="45" y1="42" x2="45" y2="50" stroke="#0369a1" stroke-width="2"/><line x1="55" y1="42" x2="55" y2="48" stroke="#0369a1" stroke-width="2"/><line x1="65" y1="42" x2="65" y2="50" stroke="#0369a1" stroke-width="2"/></svg>`,
    isFromBook: true,
    bookSource: "Page 6",
    sortOrder: 3,
  },
  {
    id: "schoolbag",
    unitId: "starters-u1-classroom",
    word: "schoolbag",
    displayName: "School Bag",
    phonics: "school · bag",
    partOfSpeech: "noun",
    category: "stationery",
    exampleSentence: "Pack your books and lunch in your big red school bag.",
    definition: "A bag used by school students for carrying books.",
    svg: `<svg viewBox="0 0 100 100" class="food-svg"><rect x="25" y="35" width="50" height="45" rx="8" fill="#ef4444"/><rect x="35" y="45" width="30" height="25" rx="4" fill="#f87171"/><path d="M40 35 Q50 20 60 35" stroke="#b91c1c" stroke-width="4" fill="none"/></svg>`,
    isFromBook: true,
    bookSource: "Page 7",
    sortOrder: 4,
  },
  {
    id: "rubber",
    unitId: "starters-u1-classroom",
    word: "rubber",
    displayName: "Rubber (Eraser)",
    phonics: "rub · ber",
    partOfSpeech: "noun",
    category: "stationery",
    exampleSentence: "Rub away the pencil mistake with the soft pink rubber.",
    definition: "A piece of rubber used for rubbing out pencil marks.",
    svg: `<svg viewBox="0 0 100 100" class="food-svg"><polygon points="30,70 55,70 75,45 50,45" fill="#f43f5e"/><polygon points="20,55 45,55 30,70 10,70" fill="#3b82f6"/><polygon points="45,55 70,55 55,70 30,70" fill="#ec4899"/></svg>`,
    isFromBook: true,
    bookSource: "Page 7",
    sortOrder: 5,
  },
  {
    id: "desk",
    unitId: "starters-u1-classroom",
    word: "desk",
    displayName: "Desk",
    phonics: "desk",
    partOfSpeech: "noun",
    category: "furniture",
    exampleSentence: "Sit nicely at your wooden classroom desk.",
    definition: "A table used in school for studying.",
    svg: `<svg viewBox="0 0 100 100" class="food-svg"><rect x="20" y="45" width="60" height="10" rx="2" fill="#d97706"/><line x1="28" y1="55" x2="28" y2="80" stroke="#92400e" stroke-width="4"/><line x1="72" y1="55" x2="72" y2="80" stroke="#92400e" stroke-width="4"/></svg>`,
    isFromBook: true,
    bookSource: "Page 8",
    sortOrder: 6,
  },
];

// Unit 6 Clothes Items
const CLOTHES_ITEMS: VocabularyItemType[] = [
  {
    id: "hat",
    unitId: "starters-u6-clothes",
    word: "hat",
    displayName: "Hat",
    phonics: "hat",
    partOfSpeech: "noun",
    category: "clothes",
    exampleSentence: "Lily wears a sunny yellow hat in the garden.",
    definition: "A shaped covering for the head.",
    svg: `<svg viewBox="0 0 100 100" class="food-svg"><ellipse cx="50" cy="65" rx="36" ry="12" fill="#f59e0b"/><path d="M30 60 C30 35, 70 35, 70 60 Z" fill="#fbbf24"/><rect x="30" y="55" width="40" height="5" fill="#ef4444"/></svg>`,
    isFromBook: true,
    bookSource: "Page 42",
    sortOrder: 1,
    gameMetadata: { clothingSlot: "head", weather: "sunny" },
  },
  {
    id: "dress",
    unitId: "starters-u6-clothes",
    word: "dress",
    displayName: "Dress",
    phonics: "dress",
    partOfSpeech: "noun",
    category: "clothes",
    exampleSentence: "Lily wears her favourite pink party dress.",
    definition: "A one-piece garment for a girl or woman.",
    svg: `<svg viewBox="0 0 100 100" class="food-svg"><polygon points="40,30 60,30 75,75 25,75" fill="#ec4899"/><circle cx="50" cy="40" r="4" fill="#ffffff"/><circle cx="50" cy="55" r="4" fill="#ffffff"/></svg>`,
    isFromBook: true,
    bookSource: "Page 42",
    sortOrder: 2,
    gameMetadata: { clothingSlot: "body", weather: "warm" },
  },
  {
    id: "shoes",
    unitId: "starters-u6-clothes",
    word: "shoes",
    displayName: "Shoes",
    phonics: "shoes",
    partOfSpeech: "noun",
    category: "clothes",
    exampleSentence: "Put on your clean red running shoes.",
    definition: "Footwear made of leather or cloth.",
    svg: `<svg viewBox="0 0 100 100" class="food-svg"><path d="M20 65 Q35 50 50 65 Q50 72 20 72 Z" fill="#dc2626"/><path d="M55 65 Q70 50 85 65 Q85 72 55 72 Z" fill="#dc2626"/></svg>`,
    isFromBook: true,
    bookSource: "Page 43",
    sortOrder: 3,
    gameMetadata: { clothingSlot: "feet", weather: "any" },
  },
  {
    id: "jacket",
    unitId: "starters-u6-clothes",
    word: "jacket",
    displayName: "Jacket",
    phonics: "jack · et",
    partOfSpeech: "noun",
    category: "clothes",
    exampleSentence: "Zip up your warm blue jacket when it's cold outside.",
    definition: "An outer garment extending either to the waist or hips.",
    svg: `<svg viewBox="0 0 100 100" class="food-svg"><rect x="30" y="35" width="40" height="40" rx="4" fill="#3b82f6"/><line x1="50" y1="35" x2="50" y2="75" stroke="#1d4ed8" stroke-width="3"/></svg>`,
    isFromBook: true,
    bookSource: "Page 43",
    sortOrder: 4,
    gameMetadata: { clothingSlot: "outer", weather: "cold" },
  },
];

// Combine all unit items
export const ALL_VOCABULARY_ITEMS: Record<string, VocabularyItemType[]> = {
  "starters-u1-classroom": CLASSROOM_ITEMS,
  "starters-u4-food": FOOD_VOCABULARY_ITEMS,
  "starters-u6-clothes": CLOTHES_ITEMS,
};

// =========================================================================
// 4. CURRICULUM ACCESS FUNCTIONS
// =========================================================================

export function getBookBySlug(slug: string): BookType | undefined {
  return BOOKS.find((b) => b.slug.toLowerCase() === slug.toLowerCase());
}

export function getUnitsForBook(bookSlug: string): UnitType[] {
  if (bookSlug.toLowerCase() === "starters") {
    return STARTERS_UNITS;
  }
  return [];
}

export function getUnitBySlug(bookSlug: string, unitSlug: string): UnitType | undefined {
  const units = getUnitsForBook(bookSlug);
  return units.find((u) => u.slug.toLowerCase() === unitSlug.toLowerCase());
}

export function getVocabularyForUnit(unitId: string): VocabularyItemType[] {
  return ALL_VOCABULARY_ITEMS[unitId] || [];
}

export function getFullUnitPayload(bookSlug: string, unitSlug: string): FullUnitPayload | null {
  const book = getBookBySlug(bookSlug);
  if (!book) return null;

  const unit = getUnitBySlug(bookSlug, unitSlug);
  if (!unit) return null;

  const vocabulary = getVocabularyForUnit(unit.id);
  const quizQuestions = unit.id === "starters-u4-food" ? BOOK_QUIZ_QUESTIONS : [];

  return {
    book,
    unit,
    vocabulary,
    quizQuestions,
  };
}
