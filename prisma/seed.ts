import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config();

import bcrypt from "bcryptjs";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../src/generated/prisma";
import { FOOD_ITEMS } from "../src/data/foodItems";
import { BOOK_QUIZ_QUESTIONS } from "../src/data/quizQuestions";

const connectionString = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL or DATABASE_URL_UNPOOLED is not set in environment.");
}

const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Starting FunEnglish Cambridge Curriculum Database Seeding...");

  // =========================================================================
  // 1. DEMO USER: LiLy
  // =========================================================================
  console.log("👤 Seeding demo user LiLy...");
  const hashedPassword = await bcrypt.hash("12345678", 12);
  const lilyUser = await prisma.user.upsert({
    where: { email: "lily@funlearning.io" },
    update: {
      name: "LiLy",
      password: hashedPassword,
      isPro: true,
      emailVerified: new Date(),
    },
    create: {
      email: "lily@funlearning.io",
      name: "LiLy",
      password: hashedPassword,
      isPro: true,
      emailVerified: new Date(),
    },
  });
  console.log(`✅ Demo user seeded: ${lilyUser.email} (ID: ${lilyUser.id})`);

  // =========================================================================
  // 2. CAMBRIDGE YLE BOOKS
  // =========================================================================
  console.log("📚 Seeding Cambridge books (Starters, Movers, Flyers)...");

  const startersBook = await prisma.book.upsert({
    where: { slug: "starters" },
    update: {
      title: "Get Ready for Starters",
      series: "Starters",
      level: "Pre-A1",
      targetAge: "3-8",
      description: "Foundational English for young learners based on Oxford Get Ready for Starters (2nd Ed). Features friendly companion Lily, phonics decoding, interactive vocabulary feeds, and Cambridge YLE exam practice.",
      coverImage: "https://lh3.googleusercontent.com/aida/AEtjO1Wf3Dz-PRlx-FPb5aVjDYIfDH_-TJymvWVhq6wYWSB1NHl39h1NpZ7ZHIvkCIzVGfv68",
      themeColor: "#ec4899",
      sortOrder: 1,
      isPublished: true,
    },
    create: {
      slug: "starters",
      title: "Get Ready for Starters",
      series: "Starters",
      level: "Pre-A1",
      targetAge: "3-8",
      description: "Foundational English for young learners based on Oxford Get Ready for Starters (2nd Ed). Features friendly companion Lily, phonics decoding, interactive vocabulary feeds, and Cambridge YLE exam practice.",
      coverImage: "https://lh3.googleusercontent.com/aida/AEtjO1Wf3Dz-PRlx-FPb5aVjDYIfDH_-TJymvWVhq6wYWSB1NHl39h1NpZ7ZHIvkCIzVGfv68",
      themeColor: "#ec4899",
      sortOrder: 1,
      isPublished: true,
    },
  });

  const moversBook = await prisma.book.upsert({
    where: { slug: "movers" },
    update: {
      title: "Get Ready for Movers",
      series: "Movers",
      level: "A1",
      targetAge: "8-10",
      description: "Intermediate junior English course based on Oxford Get Ready for Movers (2nd Ed). Expands grammar patterns, prepositions, dialogues, and multi-speaker listening comprehension.",
      coverImage: "https://lh3.googleusercontent.com/aida/AEtjO1WT26-pRP8Xdtm65xaRvRbbMH9bUnx1C_MhpMG5oNpnAzTtGMYZ49gbBDOgSBkHKU8dTkoO",
      themeColor: "#8b5cf6",
      sortOrder: 2,
      isPublished: true,
    },
    create: {
      slug: "movers",
      title: "Get Ready for Movers",
      series: "Movers",
      level: "A1",
      targetAge: "8-10",
      description: "Intermediate junior English course based on Oxford Get Ready for Movers (2nd Ed). Expands grammar patterns, prepositions, dialogues, and multi-speaker listening comprehension.",
      coverImage: "https://lh3.googleusercontent.com/aida/AEtjO1WT26-pRP8Xdtm65xaRvRbbMH9bUnx1C_MhpMG5oNpnAzTtGMYZ49gbBDOgSBkHKU8dTkoO",
      themeColor: "#8b5cf6",
      sortOrder: 2,
      isPublished: true,
    },
  });

  const flyersBook = await prisma.book.upsert({
    where: { slug: "flyers" },
    update: {
      title: "Get Ready for Flyers",
      series: "Flyers",
      level: "A2",
      targetAge: "10-13",
      description: "Advanced junior Cambridge course based on Oxford Get Ready for Flyers (2nd Ed). Develops fluent reading comprehension, complex syntax, narrative riddle puzzles, and full exam readiness.",
      coverImage: "https://lh3.googleusercontent.com/aida/AEtjO1UonMMkpaIv3WR1we12mIu2bxussB-vSUvPo0KgaFzdwQrcOXbXdseuXb0VrI_4V7jUAtqJ",
      themeColor: "#3b82f6",
      sortOrder: 3,
      isPublished: true,
    },
    create: {
      slug: "flyers",
      title: "Get Ready for Flyers",
      series: "Flyers",
      level: "A2",
      targetAge: "10-13",
      description: "Advanced junior Cambridge course based on Oxford Get Ready for Flyers (2nd Ed). Develops fluent reading comprehension, complex syntax, narrative riddle puzzles, and full exam readiness.",
      coverImage: "https://lh3.googleusercontent.com/aida/AEtjO1UonMMkpaIv3WR1we12mIu2bxussB-vSUvPo0KgaFzdwQrcOXbXdseuXb0VrI_4V7jUAtqJ",
      themeColor: "#3b82f6",
      sortOrder: 3,
      isPublished: true,
    },
  });

  console.log("✅ Books seeded successfully.");

  // =========================================================================
  // 3. UNITS SEEDING
  // =========================================================================
  console.log("📖 Seeding curriculum units...");

  // Starters Units (Full 12 units based on Get Ready for Starters)
  const startersUnitsData = [
    { num: 1, slug: "unit-1-classroom", title: "Hello & Classroom", desc: "School supplies, greetings, and classroom stationery.", icon: "GraduationCap", color: "#3b82f6" },
    { num: 2, slug: "unit-2-home", title: "At Home", desc: "Living room, bedroom, kitchen, and house furniture.", icon: "Home", color: "#10b981" },
    { num: 3, slug: "unit-3-family", title: "Family & Friends", desc: "Mum, dad, brother, sister, and describing relatives.", icon: "Users", color: "#f59e0b" },
    { num: 4, slug: "unit-4-food", title: "Food & Meals", desc: "Pat's favourite food, fruits, vegetables, and mealtime snacks.", icon: "Utensils", color: "#ec4899" },
    { num: 5, slug: "unit-5-clothes", title: "Clothes & Dressing", desc: "Dressing for the weather: hats, dresses, shoes, and jackets.", icon: "Shirt", color: "#a855f7" },
    { num: 6, slug: "unit-6-animals", title: "Animals & Pets", desc: "Cute pets and wild zoo creatures: dogs, cats, monkeys, and crocodiles.", icon: "Heart", color: "#14b8a6" },
    { num: 7, slug: "unit-7-body", title: "My Body & Face", desc: "Head, shoulders, eyes, ears, and active movement verbs.", icon: "Smile", color: "#e11d48" },
    { num: 8, slug: "unit-8-playtime", title: "Play Time & Toys", desc: "Kites, bikes, robots, dolls, and playground adventures.", icon: "Gamepad2", color: "#6366f1" },
    { num: 9, slug: "unit-9-sports", title: "Sports & Hobbies", desc: "Football, swimming, tennis, and favourite active games.", icon: "Trophy", color: "#f97316" },
    { num: 10, slug: "unit-10-town", title: "My Town & Transport", desc: "Buses, shops, parks, cars, and town street exploration.", icon: "Compass", color: "#06b6d4" },
    { num: 11, slug: "unit-11-party", title: "Party Time!", desc: "Birthday party celebrations, balloons, gifts, and songs.", icon: "Sparkles", color: "#d946ef" },
    { num: 12, slug: "unit-12-holidays", title: "Holidays & Weather", desc: "Sunny beaches, snowy slopes, raincoats, and seasons.", icon: "Sun", color: "#84cc16" },
  ];

  const createdStartersUnits: Record<string, string> = {};
  for (const u of startersUnitsData) {
    const unit = await prisma.unit.upsert({
      where: {
        bookId_slug: { bookId: startersBook.id, slug: u.slug },
      },
      update: {
        unitNumber: u.num,
        title: u.title,
        description: u.desc,
        icon: u.icon,
        themeColor: u.color,
        sortOrder: u.num,
        isPublished: true,
      },
      create: {
        bookId: startersBook.id,
        unitNumber: u.num,
        slug: u.slug,
        title: u.title,
        description: u.desc,
        icon: u.icon,
        themeColor: u.color,
        companion: "lily",
        sortOrder: u.num,
        isPublished: true,
      },
    });
    createdStartersUnits[u.slug] = unit.id;
  }

  // Movers Units (based on Get Ready for Movers)
  const moversUnitsData = [
    { num: 1, slug: "unit-1-park", title: "At the Park", desc: "Rollerblading, playground equipment, and outdoor fun.", icon: "Trees", color: "#10b981" },
    { num: 2, slug: "unit-2-busy-week", title: "A Busy Week", desc: "Days of the week, school subjects, and hobbies.", icon: "Calendar", color: "#3b82f6" },
    { num: 3, slug: "unit-3-town", title: "In the Town", desc: "Cinemas, hospitals, supermarkets, and asking directions.", icon: "Building", color: "#8b5cf6" },
    { num: 4, slug: "unit-4-home", title: "At Home", desc: "Balcony, basement, stairs, and household chores.", icon: "Home", color: "#f59e0b" },
    { num: 5, slug: "unit-5-holiday", title: "Let's Go on Holiday!", desc: "Packing suitcases, airports, beaches, and hotels.", icon: "Plane", color: "#ec4899" },
    { num: 6, slug: "unit-6-lunch", title: "What's for Lunch?", desc: "Ordering food, sandwiches, soups, and healthy recipes.", icon: "Utensils", color: "#f97316" },
    { num: 7, slug: "unit-7-animals", title: "Do You Like Animals?", desc: "Dolphins, penguins, bats, and natural habitats.", icon: "Heart", color: "#06b6d4" },
    { num: 8, slug: "unit-8-weather", title: "The Weather", desc: "Rain, fog, storms, temperatures, and climate.", icon: "CloudRain", color: "#0ea5e9" },
  ];

  const createdMoversUnits: Record<string, string> = {};
  for (const u of moversUnitsData) {
    const unit = await prisma.unit.upsert({
      where: {
        bookId_slug: { bookId: moversBook.id, slug: u.slug },
      },
      update: {
        unitNumber: u.num,
        title: u.title,
        description: u.desc,
        icon: u.icon,
        themeColor: u.color,
        sortOrder: u.num,
        isPublished: true,
      },
      create: {
        bookId: moversBook.id,
        unitNumber: u.num,
        slug: u.slug,
        title: u.title,
        description: u.desc,
        icon: u.icon,
        themeColor: u.color,
        companion: "lily",
        sortOrder: u.num,
        isPublished: true,
      },
    });
    createdMoversUnits[u.slug] = unit.id;
  }

  // Flyers Units (based on Get Ready for Flyers)
  const flyersUnitsData = [
    { num: 1, slug: "unit-1-our-home", title: "Our Home", desc: "Apartments, appliances, gadgets, and design.", icon: "Home", color: "#3b82f6" },
    { num: 2, slug: "unit-2-going-town", title: "Going to Town", desc: "Subways, department stores, theaters, and maps.", icon: "MapPin", color: "#8b5cf6" },
    { num: 3, slug: "unit-3-eating-out", title: "Eating Out", desc: "Restaurant menus, reservations, and chef specials.", icon: "Utensils", color: "#ec4899" },
    { num: 4, slug: "unit-4-jobs", title: "Dream Jobs", desc: "Pilots, journalists, engineers, and future careers.", icon: "Briefcase", color: "#6366f1" },
    { num: 5, slug: "unit-5-castle", title: "At the Castle", desc: "Knights, medieval history, towers, and treasures.", icon: "Castle", color: "#a855f7" },
    { num: 6, slug: "unit-6-camping", title: "Our Camping Adventure", desc: "Tents, campfires, flashlights, and nature survival.", icon: "Tent", color: "#14b8a6" },
  ];

  const createdFlyersUnits: Record<string, string> = {};
  for (const u of flyersUnitsData) {
    const unit = await prisma.unit.upsert({
      where: {
        bookId_slug: { bookId: flyersBook.id, slug: u.slug },
      },
      update: {
        unitNumber: u.num,
        title: u.title,
        description: u.desc,
        icon: u.icon,
        themeColor: u.color,
        sortOrder: u.num,
        isPublished: true,
      },
      create: {
        bookId: flyersBook.id,
        unitNumber: u.num,
        slug: u.slug,
        title: u.title,
        description: u.desc,
        icon: u.icon,
        themeColor: u.color,
        companion: "lily",
        sortOrder: u.num,
        isPublished: true,
      },
    });
    createdFlyersUnits[u.slug] = unit.id;
  }

  console.log("✅ Units seeded across Starters, Movers, and Flyers.");

  // =========================================================================
  // 4. VOCABULARY ITEMS SEEDING
  // =========================================================================
  console.log("🍎 Seeding authentic Cambridge vocabulary items...");

  // --- Starters Unit 4: Food & Meals (18 items from foodItems.ts) ---
  const foodUnitId = createdStartersUnits["unit-4-food"];
  for (let idx = 0; idx < FOOD_ITEMS.length; idx++) {
    const item = FOOD_ITEMS[idx];
    await prisma.vocabularyItem.upsert({
      where: { id: `starters-u4-${item.id}` },
      update: {
        unitId: foodUnitId,
        word: item.name.toLowerCase(),
        displayName: item.displayName,
        phonics: item.phonics,
        partOfSpeech: "noun",
        category: item.category,
        exampleSentence: item.sentence,
        definition: `Cambridge Starters word for ${item.displayName}`,
        svg: item.svg,
        imageUrl: item.imageUrl,
        isFromBook: item.isFromBook,
        bookSource: item.source,
        sortOrder: idx + 1,
        gameMetadata: {
          suitableMeals: item.suitableMeals,
          bookQuestionRef: item.bookQuestionRef,
        },
      },
      create: {
        id: `starters-u4-${item.id}`,
        unitId: foodUnitId,
        word: item.name.toLowerCase(),
        displayName: item.displayName,
        phonics: item.phonics,
        partOfSpeech: "noun",
        category: item.category,
        exampleSentence: item.sentence,
        definition: `Cambridge Starters word for ${item.displayName}`,
        svg: item.svg,
        imageUrl: item.imageUrl,
        isFromBook: item.isFromBook,
        bookSource: item.source,
        sortOrder: idx + 1,
        gameMetadata: {
          suitableMeals: item.suitableMeals,
          bookQuestionRef: item.bookQuestionRef,
        },
      },
    });
  }

  // --- Starters Unit 1: Classroom Supplies ---
  const classroomUnitId = createdStartersUnits["unit-1-classroom"];
  const classroomVocab = [
    { id: "pencil", word: "pencil", display: "Pencil", phonics: "pen · cil", cat: "stationery", sentence: "I write my name with a sharp yellow pencil.", page: "Page 6", svg: `<svg viewBox="0 0 100 100" class="food-svg"><polygon points="20,80 30,85 25,75" fill="#f59e0b"/><rect x="25" y="25" width="50" height="20" transform="rotate(-45 50 35)" rx="4" fill="#fbbf24"/><polygon points="15,85 20,80 25,85" fill="#1e293b"/></svg>` },
    { id: "book", word: "book", display: "Book", phonics: "book", cat: "stationery", sentence: "Lily loves reading her English story book.", page: "Page 6", svg: `<svg viewBox="0 0 100 100" class="food-svg"><path d="M20 30 Q50 35 50 75 Q20 70 20 30 Z" fill="#3b82f6"/><path d="M80 30 Q50 35 50 75 Q80 70 80 30 Z" fill="#60a5fa"/><line x1="50" y1="35" x2="50" y2="75" stroke="#1d4ed8" stroke-width="3"/></svg>` },
    { id: "ruler", word: "ruler", display: "Ruler", phonics: "rul · er", cat: "stationery", sentence: "Draw a straight blue line with your ruler.", page: "Page 6", svg: `<svg viewBox="0 0 100 100" class="food-svg"><rect x="15" y="42" width="70" height="16" rx="2" fill="#38bdf8" stroke="#0284c7" stroke-width="2"/><line x1="25" y1="42" x2="25" y2="50" stroke="#0369a1" stroke-width="2"/><line x1="35" y1="42" x2="35" y2="48" stroke="#0369a1" stroke-width="2"/><line x1="45" y1="42" x2="45" y2="50" stroke="#0369a1" stroke-width="2"/><line x1="55" y1="42" x2="55" y2="48" stroke="#0369a1" stroke-width="2"/><line x1="65" y1="42" x2="65" y2="50" stroke="#0369a1" stroke-width="2"/></svg>` },
    { id: "schoolbag", word: "schoolbag", display: "School Bag", phonics: "school · bag", cat: "stationery", sentence: "Pack your books and lunch in your big red school bag.", page: "Page 7", svg: `<svg viewBox="0 0 100 100" class="food-svg"><rect x="25" y="35" width="50" height="45" rx="8" fill="#ef4444"/><rect x="35" y="45" width="30" height="25" rx="4" fill="#f87171"/><path d="M40 35 Q50 20 60 35" stroke="#b91c1c" stroke-width="4" fill="none"/></svg>` },
    { id: "rubber", word: "rubber", display: "Rubber (Eraser)", phonics: "rub · ber", cat: "stationery", sentence: "Rub away the pencil mistake with the soft pink rubber.", page: "Page 7", svg: `<svg viewBox="0 0 100 100" class="food-svg"><polygon points="30,70 55,70 75,45 50,45" fill="#f43f5e"/><polygon points="20,55 45,55 30,70 10,70" fill="#3b82f6"/><polygon points="45,55 70,55 55,70 30,70" fill="#ec4899"/></svg>` },
    { id: "desk", word: "desk", display: "Desk", phonics: "desk", cat: "furniture", sentence: "Sit nicely at your wooden classroom desk.", page: "Page 8", svg: `<svg viewBox="0 0 100 100" class="food-svg"><rect x="20" y="45" width="60" height="10" rx="2" fill="#d97706"/><line x1="28" y1="55" x2="28" y2="80" stroke="#92400e" stroke-width="4"/><line x1="72" y1="55" x2="72" y2="80" stroke="#92400e" stroke-width="4"/></svg>` },
  ];

  for (let idx = 0; idx < classroomVocab.length; idx++) {
    const item = classroomVocab[idx];
    await prisma.vocabularyItem.upsert({
      where: { id: `starters-u1-${item.id}` },
      update: {
        unitId: classroomUnitId,
        word: item.word,
        displayName: item.display,
        phonics: item.phonics,
        partOfSpeech: "noun",
        category: item.cat,
        exampleSentence: item.sentence,
        svg: item.svg,
        isFromBook: true,
        bookSource: item.page,
        sortOrder: idx + 1,
      },
      create: {
        id: `starters-u1-${item.id}`,
        unitId: classroomUnitId,
        word: item.word,
        displayName: item.display,
        phonics: item.phonics,
        partOfSpeech: "noun",
        category: item.cat,
        exampleSentence: item.sentence,
        svg: item.svg,
        isFromBook: true,
        bookSource: item.page,
        sortOrder: idx + 1,
      },
    });
  }

  // --- Starters Unit 5: Clothes & Dressing ---
  const clothesUnitId = createdStartersUnits["unit-5-clothes"];
  const clothesVocab = [
    { id: "hat", word: "hat", display: "Hat", phonics: "hat", cat: "clothes", sentence: "Lily wears a sunny yellow hat in the garden.", page: "Page 42", slot: "head", svg: `<svg viewBox="0 0 100 100" class="food-svg"><ellipse cx="50" cy="65" rx="36" ry="12" fill="#f59e0b"/><path d="M30 60 C30 35, 70 35, 70 60 Z" fill="#fbbf24"/><rect x="30" y="55" width="40" height="5" fill="#ef4444"/></svg>` },
    { id: "dress", word: "dress", display: "Dress", phonics: "dress", cat: "clothes", sentence: "Lily wears her favourite pink party dress.", page: "Page 42", slot: "body", svg: `<svg viewBox="0 0 100 100" class="food-svg"><polygon points="40,30 60,30 75,75 25,75" fill="#ec4899"/><circle cx="50" cy="40" r="4" fill="#ffffff"/><circle cx="50" cy="55" r="4" fill="#ffffff"/></svg>` },
    { id: "shoes", word: "shoes", display: "Shoes", phonics: "shoes", cat: "clothes", sentence: "Put on your clean red running shoes.", page: "Page 43", slot: "feet", svg: `<svg viewBox="0 0 100 100" class="food-svg"><path d="M20 65 Q35 50 50 65 Q50 72 20 72 Z" fill="#dc2626"/><path d="M55 65 Q70 50 85 65 Q85 72 55 72 Z" fill="#dc2626"/></svg>` },
    { id: "jacket", word: "jacket", display: "Jacket", phonics: "jack · et", cat: "clothes", sentence: "Zip up your warm blue jacket when it's cold outside.", page: "Page 43", slot: "outer", svg: `<svg viewBox="0 0 100 100" class="food-svg"><rect x="30" y="35" width="40" height="40" rx="4" fill="#3b82f6"/><line x1="50" y1="35" x2="50" y2="75" stroke="#1d4ed8" stroke-width="3"/></svg>` },
    { id: "shirt", word: "shirt", display: "Shirt", phonics: "shirt", cat: "clothes", sentence: "He buttons up his crisp white school shirt.", page: "Page 44", slot: "top", svg: `<svg viewBox="0 0 100 100" class="food-svg"><polygon points="35,25 65,25 75,65 25,65" fill="#38bdf8"/></svg>` },
    { id: "socks", word: "socks", display: "Socks", phonics: "socks", cat: "clothes", sentence: "Pull on these warm striped woolly socks.", page: "Page 44", slot: "feet", svg: `<svg viewBox="0 0 100 100" class="food-svg"><path d="M35 30 L55 30 L55 65 Q55 75 40 75 L35 75 Z" fill="#8b5cf6"/></svg>` },
  ];

  for (let idx = 0; idx < clothesVocab.length; idx++) {
    const item = clothesVocab[idx];
    await prisma.vocabularyItem.upsert({
      where: { id: `starters-u5-${item.id}` },
      update: {
        unitId: clothesUnitId,
        word: item.word,
        displayName: item.display,
        phonics: item.phonics,
        partOfSpeech: "noun",
        category: item.cat,
        exampleSentence: item.sentence,
        svg: item.svg,
        isFromBook: true,
        bookSource: item.page,
        sortOrder: idx + 1,
        gameMetadata: { clothingSlot: item.slot },
      },
      create: {
        id: `starters-u5-${item.id}`,
        unitId: clothesUnitId,
        word: item.word,
        displayName: item.display,
        phonics: item.phonics,
        partOfSpeech: "noun",
        category: item.cat,
        exampleSentence: item.sentence,
        svg: item.svg,
        isFromBook: true,
        bookSource: item.page,
        sortOrder: idx + 1,
        gameMetadata: { clothingSlot: item.slot },
      },
    });
  }

  // --- Starters Unit 6: Animals & Pets ---
  const animalsUnitId = createdStartersUnits["unit-6-animals"];
  const animalVocab = [
    { id: "dog", word: "dog", display: "Dog", phonics: "dog", cat: "pet", sentence: "The happy brown dog wags its tail.", page: "Page 14", svg: `<svg viewBox="0 0 100 100" class="food-svg"><circle cx="50" cy="50" r="25" fill="#b45309"/><ellipse cx="30" cy="40" rx="8" ry="16" fill="#78350f"/><ellipse cx="70" cy="40" rx="8" ry="16" fill="#78350f"/></svg>` },
    { id: "cat", word: "cat", display: "Cat", phonics: "cat", cat: "pet", sentence: "The little white cat drinks fresh milk.", page: "Page 14", svg: `<svg viewBox="0 0 100 100" class="food-svg"><circle cx="50" cy="55" r="22" fill="#f97316"/><polygon points="32,40 38,20 48,36" fill="#ea580c"/><polygon points="68,40 62,20 52,36" fill="#ea580c"/></svg>` },
    { id: "elephant", word: "elephant", display: "Elephant", phonics: "el · e · phant", cat: "wild", sentence: "The big grey elephant has enormous floppy ears.", page: "Page 15", svg: `<svg viewBox="0 0 100 100" class="food-svg"><circle cx="45" cy="50" r="26" fill="#94a3b8"/><path d="M55 50 Q75 60 70 80" stroke="#64748b" stroke-width="6" fill="none"/></svg>` },
    { id: "monkey", word: "monkey", display: "Monkey", phonics: "mon · key", cat: "wild", sentence: "The silly monkey swings in the tall jungle trees.", page: "Page 15", svg: `<svg viewBox="0 0 100 100" class="food-svg"><circle cx="50" cy="50" r="22" fill="#78350f"/><circle cx="30" cy="48" r="8" fill="#d97706"/><circle cx="70" cy="48" r="8" fill="#d97706"/></svg>` },
  ];

  for (let idx = 0; idx < animalVocab.length; idx++) {
    const item = animalVocab[idx];
    await prisma.vocabularyItem.upsert({
      where: { id: `starters-u6-${item.id}` },
      update: {
        unitId: animalsUnitId,
        word: item.word,
        displayName: item.display,
        phonics: item.phonics,
        partOfSpeech: "noun",
        category: item.cat,
        exampleSentence: item.sentence,
        svg: item.svg,
        isFromBook: true,
        bookSource: item.page,
        sortOrder: idx + 1,
      },
      create: {
        id: `starters-u6-${item.id}`,
        unitId: animalsUnitId,
        word: item.word,
        displayName: item.display,
        phonics: item.phonics,
        partOfSpeech: "noun",
        category: item.cat,
        exampleSentence: item.sentence,
        svg: item.svg,
        isFromBook: true,
        bookSource: item.page,
        sortOrder: idx + 1,
      },
    });
  }

  // --- Movers Unit 1: At the Park ---
  const moversParkUnitId = createdMoversUnits["unit-1-park"];
  const moversVocab = [
    { id: "rollerblades", word: "rollerblades", display: "Rollerblades", phonics: "roll · er · blades", cat: "outdoor", sentence: "He glides fast across the smooth park pavement on his rollerblades.", page: "Page 4" },
    { id: "helmet", word: "helmet", display: "Helmet", phonics: "hel · met", cat: "safety", sentence: "Always wear your protective helmet when you ride.", page: "Page 4" },
    { id: "picnic", word: "picnic", display: "Picnic", phonics: "pic · nic", cat: "food", sentence: "Our family ate fresh sandwiches on the picnic blanket.", page: "Page 5" },
    { id: "skateboard", word: "skateboard", display: "Skateboard", phonics: "skate · board", cat: "outdoor", sentence: "Sam practices jumping on his cool wooden skateboard.", page: "Page 6" },
  ];

  for (let idx = 0; idx < moversVocab.length; idx++) {
    const item = moversVocab[idx];
    await prisma.vocabularyItem.upsert({
      where: { id: `movers-u1-${item.id}` },
      update: {
        unitId: moversParkUnitId,
        word: item.word,
        displayName: item.display,
        phonics: item.phonics,
        partOfSpeech: "noun",
        category: item.cat,
        exampleSentence: item.sentence,
        isFromBook: true,
        bookSource: item.page,
        sortOrder: idx + 1,
      },
      create: {
        id: `movers-u1-${item.id}`,
        unitId: moversParkUnitId,
        word: item.word,
        displayName: item.display,
        phonics: item.phonics,
        partOfSpeech: "noun",
        category: item.cat,
        exampleSentence: item.sentence,
        isFromBook: true,
        bookSource: item.page,
        sortOrder: idx + 1,
      },
    });
  }

  // --- Flyers Unit 4: Dream Jobs ---
  const flyersJobsUnitId = createdFlyersUnits["unit-4-jobs"];
  const flyersVocab = [
    { id: "astronaut", word: "astronaut", display: "Astronaut", phonics: "as · tro · naut", cat: "profession", sentence: "The brave astronaut floated peacefully outside the International Space Station.", page: "Page 34" },
    { id: "journalist", word: "journalist", display: "Journalist", phonics: "jour · nal · ist", cat: "profession", sentence: "The curious journalist wrote an exciting front-page newspaper article.", page: "Page 35" },
    { id: "mechanic", word: "mechanic", display: "Mechanic", phonics: "me · chan · ic", cat: "profession", sentence: "The skilled mechanic repaired the racing car's engine.", page: "Page 36" },
    { id: "architect", word: "architect", display: "Architect", phonics: "ar · chi · tect", cat: "profession", sentence: "The talented architect designed a sustainable skyscraper.", page: "Page 37" },
  ];

  for (let idx = 0; idx < flyersVocab.length; idx++) {
    const item = flyersVocab[idx];
    await prisma.vocabularyItem.upsert({
      where: { id: `flyers-u4-${item.id}` },
      update: {
        unitId: flyersJobsUnitId,
        word: item.word,
        displayName: item.display,
        phonics: item.phonics,
        partOfSpeech: "noun",
        category: item.cat,
        exampleSentence: item.sentence,
        isFromBook: true,
        bookSource: item.page,
        sortOrder: idx + 1,
      },
      create: {
        id: `flyers-u4-${item.id}`,
        unitId: flyersJobsUnitId,
        word: item.word,
        displayName: item.display,
        phonics: item.phonics,
        partOfSpeech: "noun",
        category: item.cat,
        exampleSentence: item.sentence,
        isFromBook: true,
        bookSource: item.page,
        sortOrder: idx + 1,
      },
    });
  }

  console.log("✅ Vocabulary items seeded successfully.");

  // =========================================================================
  // 5. PRACTICE QUIZ QUESTIONS & OPTIONS
  // =========================================================================
  console.log("❓ Seeding Cambridge practice quiz questions...");

  for (let idx = 0; idx < BOOK_QUIZ_QUESTIONS.length; idx++) {
    const q = BOOK_QUIZ_QUESTIONS[idx];
    const quizQ = await prisma.quizQuestion.upsert({
      where: { id: q.id },
      update: {
        unitId: foodUnitId,
        bookPage: q.bookPage,
        part: q.part,
        question: q.question,
        instruction: q.instruction,
        audioTranscript: q.audioTranscript,
        correctOption: q.correctOption,
        multiChoice: q.multiChoice || false,
        explanation: q.explanation,
        sortOrder: idx + 1,
      },
      create: {
        id: q.id,
        unitId: foodUnitId,
        bookPage: q.bookPage,
        part: q.part,
        question: q.question,
        instruction: q.instruction,
        audioTranscript: q.audioTranscript,
        correctOption: q.correctOption,
        multiChoice: q.multiChoice || false,
        explanation: q.explanation,
        sortOrder: idx + 1,
      },
    });

    // Seed options
    for (const opt of q.options) {
      const vocabRef = opt.foodId ? `starters-u4-${opt.foodId}` : (opt.vocabularyItemId || null);
      await prisma.quizOption.upsert({
        where: { id: opt.id },
        update: {
          questionId: quizQ.id,
          text: opt.text,
          isCorrect: opt.isCorrect,
          imageLabel: opt.imageLabel,
          combo: opt.combo || [],
          vocabularyItemId: vocabRef,
        },
        create: {
          id: opt.id,
          questionId: quizQ.id,
          text: opt.text,
          isCorrect: opt.isCorrect,
          imageLabel: opt.imageLabel,
          combo: opt.combo || [],
          vocabularyItemId: vocabRef,
        },
      });
    }
  }

  console.log("✅ Cambridge practice quiz questions seeded.");

  // =========================================================================
  // 6. SAMPLE PROGRESS (LiLy)
  // =========================================================================
  console.log("⭐ Seeding demo progress metrics for LiLy...");

  // Unit 4 (Food) - Fully Completed
  await prisma.unitProgress.upsert({
    where: {
      userId_unitId: {
        userId: lilyUser.id,
        unitId: foodUnitId,
      },
    },
    update: {
      starsEarned: 15,
      isCompleted: true,
      learnCompleted: true,
      flashcardsCompleted: true,
      gamesCompleted: true,
      quizScore: 100,
      completedAt: new Date(),
    },
    create: {
      userId: lilyUser.id,
      unitId: foodUnitId,
      starsEarned: 15,
      isCompleted: true,
      learnCompleted: true,
      flashcardsCompleted: true,
      gamesCompleted: true,
      quizScore: 100,
      completedAt: new Date(),
    },
  });

  // Unit 1 (Classroom) - In Progress
  await prisma.unitProgress.upsert({
    where: {
      userId_unitId: {
        userId: lilyUser.id,
        unitId: classroomUnitId,
      },
    },
    update: {
      starsEarned: 6,
      isCompleted: false,
      learnCompleted: true,
      flashcardsCompleted: true,
      gamesCompleted: false,
      quizScore: 0,
    },
    create: {
      userId: lilyUser.id,
      unitId: classroomUnitId,
      starsEarned: 6,
      isCompleted: false,
      learnCompleted: true,
      flashcardsCompleted: true,
      gamesCompleted: false,
      quizScore: 0,
    },
  });

  // Word Progress records for spaced repetition demo
  const sampleWords = ["chicken", "pineapple", "mango", "banana", "bread"];
  for (const w of sampleWords) {
    const vocab = await prisma.vocabularyItem.findFirst({
      where: { word: w },
    });
    if (vocab) {
      await prisma.wordProgress.upsert({
        where: {
          userId_vocabularyItemId: {
            userId: lilyUser.id,
            vocabularyItemId: vocab.id,
          },
        },
        update: {
          masteryLevel: 2, // Mastered
          reviewCount: 4,
          mistakeCount: 0,
          lastReviewedAt: new Date(),
        },
        create: {
          userId: lilyUser.id,
          vocabularyItemId: vocab.id,
          masteryLevel: 2,
          reviewCount: 4,
          mistakeCount: 0,
          lastReviewedAt: new Date(),
        },
      });
    }
  }

  console.log("✅ Progress metrics seeded.");

  console.log("🎉 DATABASE SEEDING COMPLETED SUCCESSFULLY!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed with error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
