import { FoodItemType } from "@/types";

export const FOOD_ITEMS: FoodItemType[] = [
  // --- Lesson 4 / Unit 4 Meals & Mains ---
  {
    "id": "chicken",
    "name": "chicken",
    "displayName": "Chicken",
    "phonics": "chick · en",
    "category": "meal",
    "suitableMeals": [
      "lunch",
      "dinner"
    ],
    "source": "Book Page 29 (Pat's favourite food)",
    "isFromBook": true,
    "sentence": "Pat's favourite food is delicious roast chicken!",
    "bookQuestionRef": "What's Pat's favourite food?",
    "svg": `<svg viewBox="0 0 100 100" class="food-svg">
      <defs>
        <radialGradient id="chkGrad" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stop-color="#FFD180"/>
          <stop offset="70%" stop-color="#E67E22"/>
          <stop offset="100%" stop-color="#BA4A00"/>
        </radialGradient>
        <linearGradient id="chkPlate" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#FFFFFF"/>
          <stop offset="100%" stop-color="#E0E6ED"/>
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="72" rx="42" ry="18" fill="rgba(0,0,0,0.12)"/>
      <ellipse cx="50" cy="70" rx="42" ry="16" fill="url(#chkPlate)" stroke="#B0BEC5" stroke-width="2"/>
      <ellipse cx="50" cy="70" rx="33" ry="11" fill="none" stroke="#CFD8DC" stroke-width="1.5"/>
      <circle cx="28" cy="65" r="4" fill="#66BB6A"/>
      <circle cx="72" cy="66" r="3.5" fill="#4CAF50"/>
      <path d="M26 62 C22 45, 34 30, 52 30 C70 30, 78 44, 76 60 C75 68, 60 71, 50 71 C38 71, 28 69, 26 62 Z" fill="url(#chkGrad)" filter="drop-shadow(0 2px 3px rgba(0,0,0,0.2))"/>
      <path d="M68 55 Q82 48 85 40" stroke="#FFF9C4" stroke-width="6" stroke-linecap="round"/>
      <circle cx="85" cy="38" r="3.5" fill="#FFF9C4"/>
      <circle cx="88" cy="42" r="3.5" fill="#FFF9C4"/>
      <path d="M35 48 C42 42, 54 44, 58 52 C54 58, 40 58, 35 48 Z" fill="#D35400" opacity="0.6"/>
      <ellipse cx="44" cy="38" rx="7" ry="3" fill="#FFF3E0" opacity="0.6"/>
      <path d="M42 22 Q45 15 42 10" stroke="#B0BEC5" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.7"/>
      <path d="M52 20 Q55 13 52 8" stroke="#B0BEC5" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.7"/>
    </svg>`
  },
  {
    "id": "sausages",
    "name": "sausages",
    "displayName": "Sausages",
    "phonics": "sau · sa · ges",
    "category": "meal",
    "suitableMeals": [
      "breakfast",
      "lunch",
      "dinner"
    ],
    "source": "Book Page 26, 28 & 29",
    "isFromBook": true,
    "sentence": "Yummy hot sausages sizzle in the pan for breakfast and dinner!",
    "bookQuestionRef": "What's Pat's favourite food? & Page 28 #3",
    "svg": `<svg viewBox="0 0 100 100" class="food-svg">
      <defs>
        <linearGradient id="sgGrad1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#FF8A80"/>
          <stop offset="40%" stop-color="#D32F2F"/>
          <stop offset="100%" stop-color="#880E4F"/>
        </linearGradient>
        <linearGradient id="sgGrad2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#FF8A80"/>
          <stop offset="40%" stop-color="#C62828"/>
          <stop offset="100%" stop-color="#4E342E"/>
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="72" rx="44" ry="18" fill="rgba(0,0,0,0.12)"/>
      <ellipse cx="50" cy="70" rx="42" ry="16" fill="#FFFFFF" stroke="#B0BEC5" stroke-width="2"/>
      <ellipse cx="50" cy="70" rx="34" ry="12" fill="#F8FAFC"/>
      <path d="M22 62 C26 50, 60 50, 72 65 C76 70, 70 76, 62 73 C48 68, 30 68, 24 72 C18 72, 18 64, 22 62 Z" fill="url(#sgGrad1)"/>
      <path d="M35 60 L40 68 M47 59 L52 68 M60 62 L64 69" stroke="#3E2723" stroke-width="2" stroke-linecap="round" opacity="0.65"/>
      <path d="M28 48 C32 36, 68 36, 78 50 C82 56, 76 61, 68 59 C54 54, 38 54, 30 58 C25 58, 24 50, 28 48 Z" fill="url(#sgGrad2)"/>
      <path d="M39 46 L45 54 M52 45 L58 53 M65 47 L70 54" stroke="#3E2723" stroke-width="2" stroke-linecap="round" opacity="0.65"/>
      <ellipse cx="45" cy="42" rx="10" ry="2" fill="#FFCDD2" opacity="0.6"/>
      <path d="M46 32 Q49 24 45 18" stroke="#B0BEC5" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.7"/>
      <path d="M58 30 Q62 22 58 16" stroke="#B0BEC5" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.7"/>
    </svg>`
  },
  {
    "id": "burger",
    "name": "burger",
    "displayName": "Burger",
    "phonics": "bur · ger",
    "category": "meal",
    "suitableMeals": [
      "lunch",
      "dinner"
    ],
    "source": "Book Page 26 & Page 29",
    "isFromBook": true,
    "sentence": "Sam's favourite dinner is yummy burgers and chips!",
    "bookQuestionRef": "What's Pat's favourite food? & Sam's dinner",
    "svg": `<svg viewBox="0 0 100 100" class="food-svg">
      <defs>
        <radialGradient id="bunGrad" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stop-color="#FFE082"/>
          <stop offset="60%" stop-color="#FFA000"/>
          <stop offset="100%" stop-color="#E65100"/>
        </radialGradient>
      </defs>
      <ellipse cx="50" cy="85" rx="36" ry="7" fill="rgba(0,0,0,0.15)"/>
      <path d="M18 70 C18 80, 82 80, 82 70 L82 66 L18 66 Z" fill="#FFA726" stroke="#E65100" stroke-width="1.5"/>
      <rect x="15" y="58" width="70" height="9" rx="4.5" fill="#5D4037"/>
      <polygon points="18,58 82,58 78,64 68,60 52,67 36,60 22,65" fill="#FFD600"/>
      <rect x="20" y="52" width="28" height="6" rx="3" fill="#E53935"/>
      <rect x="52" y="52" width="28" height="6" rx="3" fill="#E53935"/>
      <path d="M14 53 Q20 48 26 53 Q33 47 40 53 Q48 47 55 53 Q63 47 70 53 Q77 48 86 53 L84 56 L16 56 Z" fill="#66BB6A"/>
      <path d="M16 48 C16 20, 84 20, 84 48 Z" fill="url(#bunGrad)" stroke="#E65100" stroke-width="1.5"/>
      <ellipse cx="36" cy="30" rx="2" ry="1" fill="#FFFDE7" transform="rotate(-15 36 30)"/>
      <ellipse cx="50" cy="25" rx="2" ry="1" fill="#FFFDE7"/>
      <ellipse cx="64" cy="30" rx="2" ry="1" fill="#FFFDE7" transform="rotate(15 64 30)"/>
      <ellipse cx="42" cy="36" rx="2" ry="1" fill="#FFFDE7" transform="rotate(10 42 36)"/>
      <ellipse cx="58" cy="36" rx="2" ry="1" fill="#FFFDE7" transform="rotate(-10 58 36)"/>
      <ellipse cx="36" cy="26" rx="8" ry="3" fill="#FFF9C4" opacity="0.6"/>
    </svg>`
  },
  {
    "id": "chips",
    "name": "chips",
    "displayName": "Chips",
    "phonics": "chips",
    "category": "meal",
    "suitableMeals": [
      "lunch",
      "dinner"
    ],
    "source": "Book Page 26 (Story & Listening #3 & #4)",
    "isFromBook": true,
    "sentence": "Burgers and chips, please! Crunchy golden chips are Sam's dinner favourite!",
    "bookQuestionRef": "What's your favourite meal? Burgers and chips!",
    "svg": `<svg viewBox="0 0 100 100" class="food-svg">
      <defs>
        <linearGradient id="chipGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#FFF59D"/>
          <stop offset="40%" stop-color="#FFEE58"/>
          <stop offset="100%" stop-color="#FFA000"/>
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="85" rx="34" ry="7" fill="rgba(0,0,0,0.14)"/>
      <polygon points="26,45 74,45 68,82 32,82" fill="#C62828"/>
      <rect x="30" y="24" width="7" height="36" rx="2" fill="url(#chipGrad)" stroke="#FF8F00" stroke-width="1" transform="rotate(-12 33 42)"/>
      <rect x="38" y="18" width="7.5" height="42" rx="2" fill="url(#chipGrad)" stroke="#FF8F00" stroke-width="1" transform="rotate(-5 41 39)"/>
      <rect x="46" y="15" width="7.5" height="45" rx="2" fill="url(#chipGrad)" stroke="#FF8F00" stroke-width="1"/>
      <rect x="54" y="18" width="7.5" height="42" rx="2" fill="url(#chipGrad)" stroke="#FF8F00" stroke-width="1" transform="rotate(6 57 39)"/>
      <rect x="62" y="24" width="7" height="36" rx="2" fill="url(#chipGrad)" stroke="#FF8F00" stroke-width="1" transform="rotate(14 65 42)"/>
      <rect x="35" y="30" width="7" height="30" rx="2" fill="url(#chipGrad)" stroke="#FF8F00" stroke-width="1" transform="rotate(-8 38 45)"/>
      <rect x="51" y="28" width="7" height="32" rx="2" fill="url(#chipGrad)" stroke="#FF8F00" stroke-width="1" transform="rotate(8 54 44)"/>
      <polygon points="24,48 76,48 68,82 32,82" fill="#E53935" stroke="#B71C1C" stroke-width="1.8"/>
      <ellipse cx="50" cy="65" rx="12" ry="10" fill="#FFFFFF"/>
      <ellipse cx="50" cy="65" rx="9" ry="7" fill="#FFD600"/>
      <path d="M44 10 Q47 4 44 0" stroke="#B0BEC5" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.6"/>
      <path d="M54 8 Q57 2 54 0" stroke="#B0BEC5" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.6"/>
    </svg>`
  },
  {
    "id": "fish",
    "name": "fish",
    "displayName": "Fish",
    "phonics": "fish",
    "category": "meal",
    "suitableMeals": [
      "lunch",
      "dinner"
    ],
    "source": "Book Page 26 (Story & Listening #2)",
    "isFromBook": true,
    "sentence": "Sam eats healthy grilled fish with rice and pineapple for lunch!",
    "bookQuestionRef": "What do you eat for lunch, Sam?",
    "svg": `<svg viewBox="0 0 100 100" class="food-svg">
      <defs>
        <radialGradient id="fishBody" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#80DEEA"/>
          <stop offset="60%" stop-color="#26C6DA"/>
          <stop offset="100%" stop-color="#00838F"/>
        </radialGradient>
      </defs>
      <ellipse cx="50" cy="85" rx="42" ry="7" fill="rgba(0,0,0,0.12)"/>
      <ellipse cx="50" cy="70" rx="44" ry="16" fill="#FFFFFF" stroke="#CFD8DC" stroke-width="2"/>
      <ellipse cx="50" cy="70" rx="36" ry="12" fill="#F8FAFC"/>
      <polygon points="76,66 90,56 86,66 90,76" fill="#00ACC1" stroke="#00838F" stroke-width="1.5"/>
      <path d="M22 66 C32 50, 64 50, 78 66 C64 80, 32 80, 22 66 Z" fill="url(#fishBody)" stroke="#006064" stroke-width="1.8"/>
      <path d="M36 56 Q38 66 36 76" stroke="#006064" stroke-width="1.5" fill="none"/>
      <circle cx="30" cy="64" r="3" fill="#FFFFFF"/>
      <circle cx="29" cy="64" r="1.5" fill="#212121"/>
      <line x1="44" y1="58" x2="48" y2="72" stroke="#5D4037" stroke-width="2" stroke-linecap="round" opacity="0.65"/>
      <line x1="54" y1="58" x2="58" y2="72" stroke="#5D4037" stroke-width="2" stroke-linecap="round" opacity="0.65"/>
      <line x1="64" y1="60" x2="68" y2="70" stroke="#5D4037" stroke-width="2" stroke-linecap="round" opacity="0.65"/>
      <path d="M38 72 A 8 8 0 0 1 50 72 Z" fill="#FFEE58" stroke="#FBC02D" stroke-width="1.2"/>
      <circle cx="62" cy="72" r="3" fill="#4CAF50"/>
      <path d="M48 44 Q51 36 48 30" stroke="#B0BEC5" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.7"/>
    </svg>`
  },
  {
    "id": "meatballs",
    "name": "meatballs",
    "displayName": "Meatballs",
    "phonics": "meat · balls",
    "category": "meal",
    "suitableMeals": [
      "lunch",
      "dinner"
    ],
    "source": "Book Page 28 (Starters Practice Test Example)",
    "isFromBook": true,
    "sentence": "Juicy savoury meatballs in rich tomato sauce are super yummy!",
    "bookQuestionRef": "Starters practice test: Reading & Writing, Part 3 Example",
    "svg": `<svg viewBox="0 0 100 100" class="food-svg">
      <defs>
        <radialGradient id="mbMeat" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stop-color="#A1887F"/>
          <stop offset="50%" stop-color="#6D4C41"/>
          <stop offset="100%" stop-color="#3E2723"/>
        </radialGradient>
        <radialGradient id="mbSauce" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#EF5350"/>
          <stop offset="60%" stop-color="#C62828"/>
          <stop offset="100%" stop-color="#880E4F"/>
        </radialGradient>
      </defs>
      <ellipse cx="50" cy="85" rx="40" ry="7" fill="rgba(0,0,0,0.14)"/>
      <ellipse cx="50" cy="74" rx="42" ry="14" fill="#FFFFFF" stroke="#CFD8DC" stroke-width="2"/>
      <ellipse cx="50" cy="72" rx="36" ry="10" fill="#F8FAFC"/>
      <ellipse cx="50" cy="66" rx="32" ry="9" fill="url(#mbSauce)"/>
      <circle cx="34" cy="58" r="12" fill="url(#mbMeat)" stroke="#271815" stroke-width="1.5"/>
      <path d="M30 52 Q36 50 38 56 Q34 62 28 58 Z" fill="#C62828" opacity="0.8"/>
      <circle cx="66" cy="58" r="12" fill="url(#mbMeat)" stroke="#271815" stroke-width="1.5"/>
      <path d="M62 52 Q68 50 70 56 Q66 62 60 58 Z" fill="#C62828" opacity="0.8"/>
      <circle cx="50" cy="62" r="13" fill="url(#mbMeat)" stroke="#271815" stroke-width="1.5"/>
      <path d="M46 54 Q54 52 56 60 Q50 66 44 62 Z" fill="#C62828" opacity="0.8"/>
      <circle cx="50" cy="46" r="12" fill="url(#mbMeat)" stroke="#271815" stroke-width="1.5"/>
      <path d="M46 40 Q52 38 54 44 Q48 50 44 46 Z" fill="#C62828" opacity="0.8"/>
      <path d="M50 36 C56 30, 64 34, 60 40 C54 40, 50 38, 50 36 Z" fill="#4CAF50" stroke="#2E7D32" stroke-width="1"/>
      <path d="M44 26 Q47 18 44 12" stroke="#B0BEC5" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.7"/>
      <path d="M56 24 Q59 16 56 10" stroke="#B0BEC5" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.7"/>
    </svg>`
  },
  {
    "id": "meat",
    "name": "meat",
    "displayName": "Meat",
    "phonics": "meat",
    "category": "meal",
    "suitableMeals": [
      "lunch",
      "dinner"
    ],
    "source": "Book Page 26 (Story & Listening #2)",
    "isFromBook": true,
    "sentence": "Look! I eat tender meat, fresh bread, and fruit for lunch!",
    "bookQuestionRef": "What do you eat for lunch?",
    "svg": `<svg viewBox="0 0 100 100" class="food-svg">
      <defs>
        <radialGradient id="steakGrad" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#E57373"/>
          <stop offset="50%" stop-color="#C62828"/>
          <stop offset="100%" stop-color="#4E342E"/>
        </radialGradient>
      </defs>
      <ellipse cx="50" cy="85" rx="42" ry="7" fill="rgba(0,0,0,0.12)"/>
      <ellipse cx="50" cy="72" rx="44" ry="16" fill="#FFFFFF" stroke="#CFD8DC" stroke-width="2"/>
      <ellipse cx="50" cy="72" rx="36" ry="11" fill="#F8FAFC"/>
      <path d="M24 64 C22 50, 40 40, 62 44 C78 48, 82 62, 74 72 C64 80, 28 78, 24 64 Z" fill="url(#steakGrad)" stroke="#3E2723" stroke-width="2"/>
      <circle cx="44" cy="56" r="5" fill="#FFF9C4" stroke="#FFF59D" stroke-width="1"/>
      <circle cx="44" cy="56" r="2.5" fill="#5D4037"/>
      <line x1="36" y1="52" x2="68" y2="68" stroke="#271815" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>
      <line x1="48" y1="46" x2="74" y2="60" stroke="#271815" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>
      <line x1="60" y1="48" x2="36" y2="68" stroke="#271815" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>
      <path d="M68 54 Q76 48 80 50" stroke="#2E7D32" stroke-width="1.8" stroke-linecap="round" fill="none"/>
      <path d="M48 32 Q51 24 48 18" stroke="#B0BEC5" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.7"/>
    </svg>`
  },
  {
    "id": "eggs",
    "name": "eggs",
    "displayName": "Eggs",
    "phonics": "eggs",
    "category": "meal",
    "suitableMeals": [
      "breakfast"
    ],
    "source": "Book Page 26 & Page 29 (Dan's breakfast)",
    "isFromBook": true,
    "sentence": "Dan eats two boiled eggs in blue cups for breakfast!",
    "bookQuestionRef": "What does Dan eat for breakfast?",
    "svg": `<svg viewBox="0 0 100 100" class="food-svg">
      <defs>
        <radialGradient id="eggWhite" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stop-color="#FFFFFF"/>
          <stop offset="80%" stop-color="#F5F5F5"/>
          <stop offset="100%" stop-color="#E0E0E0"/>
        </radialGradient>
        <linearGradient id="cupGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#42A5F5"/>
          <stop offset="50%" stop-color="#90CAF9"/>
          <stop offset="100%" stop-color="#1E88E5"/>
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="85" rx="40" ry="7" fill="rgba(0,0,0,0.14)"/>
      <ellipse cx="34" cy="50" rx="14" ry="18" fill="url(#eggWhite)" stroke="#CFD8DC" stroke-width="1"/>
      <ellipse cx="30" cy="42" rx="4" ry="8" fill="#FFFFFF" opacity="0.8"/>
      <path d="M20 54 Q34 60 48 54 L44 72 Q34 76 24 72 Z" fill="url(#cupGrad)" stroke="#1565C0" stroke-width="1.5"/>
      <ellipse cx="34" cy="74" rx="13" ry="5" fill="url(#cupGrad)" stroke="#1565C0" stroke-width="1.5"/>
      <ellipse cx="34" cy="54" rx="14" ry="4" fill="#BBDEFB" stroke="#1565C0" stroke-width="1.5"/>
      <ellipse cx="66" cy="50" rx="14" ry="18" fill="url(#eggWhite)" stroke="#CFD8DC" stroke-width="1"/>
      <ellipse cx="62" cy="42" rx="4" ry="8" fill="#FFFFFF" opacity="0.8"/>
      <path d="M52 54 Q66 60 80 54 L76 72 Q66 76 56 72 Z" fill="url(#cupGrad)" stroke="#1565C0" stroke-width="1.5"/>
      <ellipse cx="66" cy="74" rx="13" ry="5" fill="url(#cupGrad)" stroke="#1565C0" stroke-width="1.5"/>
      <ellipse cx="66" cy="54" rx="14" ry="4" fill="#BBDEFB" stroke="#1565C0" stroke-width="1.5"/>
      <path d="M78 80 L88 48 Q91 44 94 48 Q95 52 90 54 L84 82 Z" fill="#B0BEC5"/>
      <path d="M34 26 Q36 20 34 15" stroke="#B0BEC5" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.7"/>
      <path d="M66 26 Q68 20 66 15" stroke="#B0BEC5" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.7"/>
    </svg>`
  },
  {
    "id": "bread",
    "name": "bread",
    "displayName": "Bread",
    "phonics": "bread",
    "category": "meal",
    "suitableMeals": [
      "breakfast",
      "lunch"
    ],
    "source": "Book Page 25, 26 & 29",
    "isFromBook": true,
    "sentence": "Dan loves crunchy golden bread for breakfast!",
    "bookQuestionRef": "What does Dan eat for breakfast?",
    "svg": `<svg viewBox="0 0 100 100" class="food-svg">
      <defs>
        <radialGradient id="toastGrad" cx="45%" cy="40%" r="55%">
          <stop offset="0%" stop-color="#FFE082"/>
          <stop offset="60%" stop-color="#FFB74D"/>
          <stop offset="100%" stop-color="#E65100"/>
        </radialGradient>
      </defs>
      <ellipse cx="50" cy="82" rx="38" ry="8" fill="rgba(0,0,0,0.12)"/>
      <g transform="translate(14, -6) rotate(-8 50 50)">
        <path d="M25 45 C20 32, 40 24, 50 30 C60 24, 80 32, 75 45 L73 75 C73 80, 27 80, 27 75 Z" fill="#D7CCC8" stroke="#8D6E63" stroke-width="3"/>
        <path d="M28 46 C24 36, 40 30, 50 34 C60 30, 76 36, 72 46 L70 72 C70 76, 30 76, 30 72 Z" fill="#FFE082"/>
      </g>
      <path d="M23 48 C18 34, 40 25, 50 31 C60 25, 82 34, 77 48 L75 78 C75 83, 25 83, 25 78 Z" fill="#D7CCC8" stroke="#8D6E63" stroke-width="3"/>
      <path d="M26 49 C22 38, 40 31, 50 35 C60 31, 78 38, 74 49 L72 75 C72 79, 28 79, 28 75 Z" fill="url(#toastGrad)"/>
      <rect x="42" y="48" width="16" height="12" rx="2" fill="#FFEE58" stroke="#FDD835" stroke-width="1" transform="rotate(8 50 54)"/>
      <rect x="44" y="50" width="12" height="8" rx="1.5" fill="#FFF59D" transform="rotate(8 50 54)"/>
    </svg>`
  },
  {
    "id": "rice",
    "name": "rice",
    "displayName": "Rice",
    "phonics": "rice",
    "category": "meal",
    "suitableMeals": [
      "lunch",
      "dinner"
    ],
    "source": "Book Page 25 & Page 26 (Sam's lunch)",
    "isFromBook": true,
    "sentence": "Sam eats fluffy white rice with fish and pineapple for lunch!",
    "bookQuestionRef": "What do you eat for lunch, Sam?",
    "svg": `<svg viewBox="0 0 100 100" class="food-svg">
      <defs>
        <radialGradient id="riceGrad" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stop-color="#FFFFFF"/>
          <stop offset="80%" stop-color="#F5F5F5"/>
          <stop offset="100%" stop-color="#E0E0E0"/>
        </radialGradient>
        <linearGradient id="bowlGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#42A5F5"/>
          <stop offset="100%" stop-color="#1565C0"/>
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="85" rx="38" ry="7" fill="rgba(0,0,0,0.14)"/>
      <ellipse cx="50" cy="50" rx="32" ry="20" fill="url(#riceGrad)" stroke="#CFD8DC" stroke-width="1.5"/>
      <ellipse cx="38" cy="44" rx="4" ry="2" fill="#FFFFFF" stroke="#B0BEC5" stroke-width="0.8" transform="rotate(-20 38 44)"/>
      <ellipse cx="50" cy="40" rx="4" ry="2" fill="#FFFFFF" stroke="#B0BEC5" stroke-width="0.8" transform="rotate(10 50 40)"/>
      <ellipse cx="62" cy="44" rx="4" ry="2" fill="#FFFFFF" stroke="#B0BEC5" stroke-width="0.8" transform="rotate(30 62 44)"/>
      <ellipse cx="44" cy="48" rx="4" ry="2" fill="#FFFFFF" stroke="#B0BEC5" stroke-width="0.8" transform="rotate(-10 44 48)"/>
      <ellipse cx="56" cy="48" rx="4" ry="2" fill="#FFFFFF" stroke="#B0BEC5" stroke-width="0.8" transform="rotate(15 56 48)"/>
      <path d="M16 52 Q50 56 84 52 C84 76, 68 84, 50 84 C32 84, 16 76, 16 52 Z" fill="url(#bowlGrad)" stroke="#0D47A1" stroke-width="2"/>
      <ellipse cx="50" cy="52" rx="34" ry="8" fill="none" stroke="#90CAF9" stroke-width="2"/>
      <line x1="20" y1="46" x2="80" y2="38" stroke="#8D6E63" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="22" y1="50" x2="82" y2="42" stroke="#6D4C41" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M46 26 Q49 18 46 12" stroke="#B0BEC5" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.7"/>
      <path d="M56 24 Q59 16 56 10" stroke="#B0BEC5" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.7"/>
    </svg>`
  },
  {
    "id": "salad",
    "name": "salad",
    "displayName": "Salad",
    "phonics": "sal · ad",
    "category": "meal",
    "suitableMeals": [
      "lunch",
      "dinner"
    ],
    "source": "Book Page 29 (Dan's breakfast options)",
    "isFromBook": true,
    "sentence": "A fresh green salad with crunchy cucumbers and tomatoes!",
    "bookQuestionRef": "What does Dan eat for breakfast?",
    "svg": `<svg viewBox="0 0 100 100" class="food-svg">
      <defs>
        <linearGradient id="saladBowl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#81D4FA"/>
          <stop offset="100%" stop-color="#0288D1"/>
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="84" rx="38" ry="7" fill="rgba(0,0,0,0.12)"/>
      <circle cx="34" cy="42" r="14" fill="#4CAF50"/>
      <circle cx="50" cy="36" r="15" fill="#66BB6A"/>
      <circle cx="66" cy="42" r="14" fill="#43A047"/>
      <path d="M30 38 Q38 32 46 40" stroke="#81C784" stroke-width="2" fill="none"/>
      <path d="M52 32 Q60 28 68 36" stroke="#81C784" stroke-width="2" fill="none"/>
      <circle cx="42" cy="46" r="7" fill="#E53935"/>
      <circle cx="40" cy="44" r="2" fill="#FFCDD2"/>
      <circle cx="60" cy="44" r="6.5" fill="#E53935"/>
      <circle cx="58" cy="42" r="2" fill="#FFCDD2"/>
      <circle cx="50" cy="49" r="8" fill="#81C784" stroke="#2E7D32" stroke-width="2"/>
      <circle cx="32" cy="52" r="7" fill="#81C784" stroke="#2E7D32" stroke-width="2"/>
      <path d="M16 52 Q50 56 84 52 C84 76, 68 82, 50 82 C32 82, 16 76, 16 52 Z" fill="url(#saladBowl)" stroke="#01579B" stroke-width="2"/>
      <ellipse cx="50" cy="52" rx="34" ry="7" fill="#B3E5FC" stroke="#01579B" stroke-width="2"/>
      <ellipse cx="50" cy="52" rx="30" ry="5" fill="#E1F5FE"/>
      <path d="M74 30 L80 60" stroke="#90A4AE" stroke-width="2" stroke-linecap="round"/>
      <path d="M70 28 L78 30 L74 38" stroke="#90A4AE" stroke-width="2" fill="none"/>
    </svg>`
  },
  {
    "id": "pie",
    "name": "pie",
    "displayName": "Pie",
    "phonics": "pie",
    "category": "meal",
    "suitableMeals": [
      "lunch",
      "dinner",
      "dessert"
    ],
    "source": "Book Page 25 (Crossword #1) & Page 33",
    "isFromBook": true,
    "sentence": "Grandma baked a warm, sweet berry pie!",
    "bookQuestionRef": "Unit 4 Crossword #1: Pie",
    "svg": `<svg viewBox="0 0 100 100" class="food-svg">
      <defs>
        <radialGradient id="pieCrust" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stop-color="#FFE082"/>
          <stop offset="70%" stop-color="#FFB300"/>
          <stop offset="100%" stop-color="#D84315"/>
        </radialGradient>
      </defs>
      <ellipse cx="50" cy="80" rx="40" ry="8" fill="rgba(0,0,0,0.15)"/>
      <path d="M14 56 L24 74 Q50 80 76 74 L86 56 Z" fill="#90A4AE" stroke="#546E7A" stroke-width="2"/>
      <path d="M12 56 Q16 50 20 56 Q25 50 30 56 Q35 50 40 56 Q45 50 50 56 Q55 50 60 56 Q65 50 70 56 Q75 50 80 56 Q85 50 88 56 Q50 64 12 56 Z" fill="#FFA000" stroke="#D84315" stroke-width="1.5"/>
      <ellipse cx="50" cy="52" rx="34" ry="16" fill="url(#pieCrust)"/>
      <path d="M26 50 Q50 60 74 50 M32 44 Q50 54 68 44 M38 58 Q50 64 62 58" stroke="#BF360C" stroke-width="2" fill="none" opacity="0.7"/>
      <path d="M35 42 Q40 55 45 62 M50 38 Q50 55 50 63 M65 42 Q60 55 55 62" stroke="#BF360C" stroke-width="2" fill="none" opacity="0.7"/>
      <circle cx="42" cy="48" r="2.5" fill="#880E4F"/>
      <circle cx="58" cy="53" r="2.5" fill="#880E4F"/>
      <path d="M44 32 Q48 24 44 18" stroke="#B0BEC5" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.7"/>
      <path d="M56 30 Q60 22 56 16" stroke="#B0BEC5" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.7"/>
    </svg>`
  },

  // --- Lesson 4 / Unit 4 Vegetables & Staples (Page 25 & 26) ---
  {
    "id": "tomato",
    "name": "tomato",
    "displayName": "Tomato",
    "phonics": "to · ma · to",
    "category": "vegetable",
    "suitableMeals": [
      "breakfast",
      "lunch",
      "dinner"
    ],
    "source": "Book Page 25 & Page 26 (Breakfast)",
    "isFromBook": true,
    "sentence": "Plump red tomatoes are delicious for breakfast with eggs and beans!",
    "bookQuestionRef": "Unit 4 Crossword & Page 26 Breakfast dialogue",
    "svg": `<svg viewBox="0 0 100 100" class="food-svg">
      <defs>
        <radialGradient id="tmGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#FF5252"/>
          <stop offset="50%" stop-color="#F44336"/>
          <stop offset="100%" stop-color="#C62828"/>
        </radialGradient>
      </defs>
      <ellipse cx="50" cy="85" rx="32" ry="7" fill="rgba(0,0,0,0.14)"/>
      <path d="M50 36 C34 26, 18 38, 20 60 C22 78, 40 84, 50 82 C60 84, 78 78, 80 60 C82 38, 66 26, 50 36 Z" fill="url(#tmGrad)" stroke="#B71C1C" stroke-width="1.8"/>
      <path d="M50 36 Q38 52 36 78" stroke="#D32F2F" stroke-width="1.5" fill="none" opacity="0.6"/>
      <path d="M50 36 Q62 52 64 78" stroke="#D32F2F" stroke-width="1.5" fill="none" opacity="0.6"/>
      <polygon points="50,34 42,24 45,34 34,32 43,38 36,46 47,40 50,48 53,40 64,46 57,38 66,32 55,34 58,24" fill="#4CAF50" stroke="#2E7D32" stroke-width="1"/>
      <path d="M50 32 Q52 20 58 16" stroke="#2E7D32" stroke-width="3" stroke-linecap="round" fill="none"/>
      <ellipse cx="34" cy="48" rx="6" ry="10" fill="#FFFFFF" opacity="0.65" transform="rotate(-25 34 48)"/>
      <circle cx="30" cy="40" r="2.5" fill="#FFFFFF" opacity="0.8"/>
    </svg>`
  },
  {
    "id": "carrot",
    "name": "carrot",
    "displayName": "Carrot",
    "phonics": "car · rot",
    "category": "vegetable",
    "suitableMeals": [
      "lunch",
      "dinner"
    ],
    "source": "Book Page 25 (Unit 4 Crossword #6)",
    "isFromBook": true,
    "sentence": "Crunchy orange carrots are sweet, tasty, and great for your health!",
    "bookQuestionRef": "Unit 4 Words & Writing Crossword",
    "svg": `<svg viewBox="0 0 100 100" class="food-svg">
      <defs>
        <radialGradient id="crGrad" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#FFB74D"/>
          <stop offset="50%" stop-color="#FF9800"/>
          <stop offset="100%" stop-color="#E65100"/>
        </radialGradient>
      </defs>
      <ellipse cx="50" cy="85" rx="34" ry="6" fill="rgba(0,0,0,0.12)"/>
      <path d="M68 28 Q82 12 76 10 Q70 16 66 24" fill="#66BB6A" stroke="#2E7D32" stroke-width="1.2"/>
      <path d="M72 26 Q86 18 84 24 Q78 28 68 28" fill="#4CAF50" stroke="#2E7D32" stroke-width="1.2"/>
      <path d="M66 22 Q76 6 70 8 Q64 16 64 26" fill="#81C784" stroke="#2E7D32" stroke-width="1.2"/>
      <path d="M70 26 C72 32, 64 38, 56 46 L20 80 Q16 84 18 80 L36 46 C44 34, 58 24, 70 26 Z" fill="url(#crGrad)" stroke="#BF360C" stroke-width="2"/>
      <path d="M58 36 Q54 40 50 38" stroke="#E65100" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      <path d="M48 46 Q44 50 40 48" stroke="#E65100" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      <path d="M38 56 Q34 60 30 58" stroke="#E65100" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      <path d="M28 66 Q25 70 22 68" stroke="#E65100" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      <path d="M62 30 L26 74" stroke="#FFE082" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
    </svg>`
  },
  {
    "id": "onion",
    "name": "onion",
    "displayName": "Onion",
    "phonics": "on · ion",
    "category": "vegetable",
    "suitableMeals": [
      "lunch",
      "dinner"
    ],
    "source": "Book Page 25 & Page 27 (Speaking activity)",
    "isFromBook": true,
    "sentence": "Would you like an onion? Yes, please! It makes meals smell amazing!",
    "bookQuestionRef": "Unit 4 Crossword & Page 27 Speaking Activity",
    "svg": `<svg viewBox="0 0 100 100" class="food-svg">
      <defs>
        <radialGradient id="onGrad" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#FFE0B2"/>
          <stop offset="40%" stop-color="#FFA726"/>
          <stop offset="80%" stop-color="#E65100"/>
          <stop offset="100%" stop-color="#8D6E63"/>
        </radialGradient>
      </defs>
      <ellipse cx="50" cy="85" rx="30" ry="7" fill="rgba(0,0,0,0.14)"/>
      <path d="M50 20 C64 36, 78 50, 78 66 C78 80, 64 84, 50 84 C36 84, 22 80, 22 66 C22 50, 36 36, 50 20 Z" fill="url(#onGrad)" stroke="#5D4037" stroke-width="1.8"/>
      <path d="M50 20 L50 12 L53 22 Z" fill="#8D6E63" stroke="#5D4037" stroke-width="1"/>
      <path d="M46 84 L44 90 M50 84 L50 92 M54 84 L56 90" stroke="#8D6E63" stroke-width="2" stroke-linecap="round"/>
      <path d="M50 22 C60 38, 66 54, 66 74" stroke="#BF360C" stroke-width="1.5" fill="none" opacity="0.6"/>
      <path d="M50 22 C40 38, 34 54, 34 74" stroke="#BF360C" stroke-width="1.5" fill="none" opacity="0.6"/>
      <path d="M50 22 L50 82" stroke="#BF360C" stroke-width="1.2" fill="none" opacity="0.5"/>
      <ellipse cx="38" cy="56" rx="6" ry="14" fill="#FFFFFF" opacity="0.5" transform="rotate(-15 38 56)"/>
    </svg>`
  },
  {
    "id": "potato",
    "name": "potato",
    "displayName": "Potato",
    "phonics": "po · ta · to",
    "category": "vegetable",
    "suitableMeals": [
      "lunch",
      "dinner"
    ],
    "source": "Book Page 25 (Unit 4 Crossword #4)",
    "isFromBook": true,
    "sentence": "A warm baked potato is fluffy, comforting, and filling!",
    "bookQuestionRef": "Unit 4 Words & Writing Crossword",
    "svg": `<svg viewBox="0 0 100 100" class="food-svg">
      <defs>
        <radialGradient id="potGrad" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stop-color="#FFE0B2"/>
          <stop offset="50%" stop-color="#D7CCC8"/>
          <stop offset="85%" stop-color="#A1887F"/>
          <stop offset="100%" stop-color="#6D4C41"/>
        </radialGradient>
      </defs>
      <ellipse cx="50" cy="85" rx="36" ry="7" fill="rgba(0,0,0,0.14)"/>
      <path d="M22 56 C20 40, 34 26, 54 26 C74 26, 84 38, 82 56 C80 74, 68 82, 48 82 C28 82, 24 72, 22 56 Z" fill="url(#potGrad)" stroke="#5D4037" stroke-width="2"/>
      <path d="M32 44 Q36 43 38 46" stroke="#4E342E" stroke-width="2" stroke-linecap="round" fill="none"/>
      <path d="M54 38 Q58 37 60 40" stroke="#4E342E" stroke-width="2" stroke-linecap="round" fill="none"/>
      <path d="M42 62 Q46 61 48 64" stroke="#4E342E" stroke-width="2" stroke-linecap="round" fill="none"/>
      <path d="M66 58 Q70 57 72 60" stroke="#4E342E" stroke-width="2" stroke-linecap="round" fill="none"/>
      <path d="M30 66 Q33 65 35 68" stroke="#4E342E" stroke-width="1.8" stroke-linecap="round" fill="none"/>
      <rect x="42" y="32" width="16" height="10" rx="3" fill="#FFEE58" stroke="#FDD835" stroke-width="1"/>
      <ellipse cx="42" cy="40" rx="10" ry="4" fill="#FFFFFF" opacity="0.4" transform="rotate(-10 42 40)"/>
    </svg>`
  },
  {
    "id": "peas",
    "name": "peas",
    "displayName": "Peas",
    "phonics": "peas",
    "category": "vegetable",
    "suitableMeals": [
      "lunch",
      "dinner"
    ],
    "source": "Book Page 25 (Unit 4 Crossword #4 Down)",
    "isFromBook": true,
    "sentence": "Sweet little green peas grow together inside a green pod!",
    "bookQuestionRef": "Unit 4 Words & Writing Crossword",
    "svg": `<svg viewBox="0 0 100 100" class="food-svg">
      <defs>
        <radialGradient id="peaGrad" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stop-color="#DCEDC8"/>
          <stop offset="50%" stop-color="#8BC34A"/>
          <stop offset="100%" stop-color="#558B2F"/>
        </radialGradient>
        <linearGradient id="podGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#7CB342"/>
          <stop offset="100%" stop-color="#33691E"/>
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="85" rx="38" ry="7" fill="rgba(0,0,0,0.14)"/>
      <path d="M14 62 C30 82, 70 82, 86 48 C76 68, 36 72, 14 62 Z" fill="#33691E"/>
      <circle cx="28" cy="62" r="9.5" fill="url(#peaGrad)" stroke="#33691E" stroke-width="1.5"/>
      <circle cx="44" cy="58" r="9.5" fill="url(#peaGrad)" stroke="#33691E" stroke-width="1.5"/>
      <circle cx="60" cy="52" r="9.5" fill="url(#peaGrad)" stroke="#33691E" stroke-width="1.5"/>
      <circle cx="74" cy="44" r="8.5" fill="url(#peaGrad)" stroke="#33691E" stroke-width="1.5"/>
      <circle cx="26" cy="59" r="2.5" fill="#FFFFFF" opacity="0.75"/>
      <circle cx="42" cy="55" r="2.5" fill="#FFFFFF" opacity="0.75"/>
      <circle cx="58" cy="49" r="2.5" fill="#FFFFFF" opacity="0.75"/>
      <circle cx="72" cy="41" r="2" fill="#FFFFFF" opacity="0.75"/>
      <path d="M12 60 C25 76, 60 76, 86 44 C82 48, 64 68, 26 68 C18 68, 14 64, 12 60 Z" fill="url(#podGrad)" stroke="#2E7D32" stroke-width="1.8"/>
      <path d="M12 60 Q8 54 10 48" stroke="#33691E" stroke-width="2.5" stroke-linecap="round" fill="none"/>
    </svg>`
  },
  {
    "id": "beans",
    "name": "beans",
    "displayName": "Beans",
    "phonics": "beans",
    "category": "vegetable",
    "suitableMeals": [
      "breakfast",
      "lunch",
      "dinner"
    ],
    "source": "Book Page 25 & Page 26 (Unit 4 Breakfast)",
    "isFromBook": true,
    "sentence": "Warm beans are tasty with eggs and sausages for a big breakfast!",
    "bookQuestionRef": "Unit 4: Would you like some beans?",
    "svg": `<svg viewBox="0 0 100 100" class="food-svg">
      <defs>
        <linearGradient id="beanBowl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#FFCC80"/>
          <stop offset="100%" stop-color="#EF6C00"/>
        </linearGradient>
        <radialGradient id="beanSauce" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#FF7043"/>
          <stop offset="70%" stop-color="#D84315"/>
          <stop offset="100%" stop-color="#BF360C"/>
        </radialGradient>
        <radialGradient id="singleBean" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stop-color="#FFCCBC"/>
          <stop offset="60%" stop-color="#FF8A65"/>
          <stop offset="100%" stop-color="#D84315"/>
        </radialGradient>
      </defs>
      <ellipse cx="50" cy="85" rx="38" ry="7" fill="rgba(0,0,0,0.14)"/>
      <path d="M16 52 Q50 56 84 52 C84 76, 68 84, 50 84 C32 84, 16 76, 16 52 Z" fill="url(#beanBowl)" stroke="#E65100" stroke-width="2"/>
      <ellipse cx="50" cy="52" rx="34" ry="9" fill="#FFE0B2" stroke="#E65100" stroke-width="2"/>
      <ellipse cx="50" cy="52" rx="31" ry="7" fill="url(#beanSauce)"/>
      <path d="M34 50 C32 46, 40 44, 44 48 C46 52, 40 56, 36 54 C33 54, 33 52, 34 50 Z" fill="url(#singleBean)" stroke="#BF360C" stroke-width="1"/>
      <path d="M48 48 C46 44, 54 42, 58 46 C60 50, 54 54, 50 52 C47 52, 47 50, 48 48 Z" fill="url(#singleBean)" stroke="#BF360C" stroke-width="1"/>
      <path d="M60 52 C58 48, 66 46, 70 50 C72 54, 66 58, 62 56 C59 56, 59 54, 60 52 Z" fill="url(#singleBean)" stroke="#BF360C" stroke-width="1"/>
      <path d="M40 55 C38 52, 46 50, 49 54 C51 58, 45 61, 42 59 C39 59, 39 57, 40 55 Z" fill="url(#singleBean)" stroke="#BF360C" stroke-width="1"/>
      <path d="M54 54 C52 51, 60 49, 63 53 C65 57, 59 60, 56 58 C53 58, 53 56, 54 54 Z" fill="url(#singleBean)" stroke="#BF360C" stroke-width="1"/>
      <path d="M42 34 Q45 26 42 20" stroke="#B0BEC5" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.7"/>
      <path d="M54 32 Q57 24 54 18" stroke="#B0BEC5" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.7"/>
    </svg>`
  },

  // --- Lesson 4 / Unit 4 Fruits (Page 24, 25 & 28) ---
  {
    "id": "banana",
    "name": "banana",
    "displayName": "Banana",
    "phonics": "ba · nan · a",
    "category": "fruit",
    "suitableMeals": [
      "breakfast",
      "lunch",
      "dessert"
    ],
    "source": "Book Page 24 (Unit 4 Words)",
    "isFromBook": true,
    "sentence": "A sweet yellow banana is full of healthy energy!",
    "bookQuestionRef": "What's this? It's a banana.",
    "svg": `<svg viewBox="0 0 100 100" class="food-svg">
      <defs>
        <radialGradient id="banGrad" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#FFF9C4"/>
          <stop offset="50%" stop-color="#FFEE58"/>
          <stop offset="90%" stop-color="#FDD835"/>
          <stop offset="100%" stop-color="#FBC02D"/>
        </radialGradient>
      </defs>
      <ellipse cx="50" cy="80" rx="36" ry="6" fill="rgba(0,0,0,0.12)"/>
      <path d="M18 68 C25 80, 68 84, 82 46 C84 40, 80 34, 76 38 C64 68, 30 68, 20 58 C16 54, 14 62, 18 68 Z" fill="url(#banGrad)" stroke="#F57F17" stroke-width="2"/>
      <path d="M78 37 C81 31, 84 26, 85 24 L81 22 C79 25, 76 30, 74 35 Z" fill="#689F38" stroke="#33691E" stroke-width="1"/>
      <path d="M18 68 C16 67, 15 64, 16 62 C18 62, 19 65, 18 68 Z" fill="#5D4037"/>
      <path d="M22 62 C34 72, 66 70, 77 42" stroke="#FFF59D" stroke-width="2" fill="none" opacity="0.8"/>
      <path d="M25 66 C40 76, 68 73, 79 46" stroke="#F57F17" stroke-width="1.2" fill="none" opacity="0.5"/>
    </svg>`
  },
  {
    "id": "orange",
    "name": "orange",
    "displayName": "Orange",
    "phonics": "or · ange",
    "category": "fruit",
    "suitableMeals": [
      "breakfast",
      "lunch",
      "dessert"
    ],
    "source": "Book Page 24 (Unit 4 Words #1)",
    "isFromBook": true,
    "sentence": "A bright orange is juicy, sweet, and tangy!",
    "bookQuestionRef": "Unit 4 Words: an orange",
    "svg": `<svg viewBox="0 0 100 100" class="food-svg">
      <defs>
        <radialGradient id="orngGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#FFD54F"/>
          <stop offset="50%" stop-color="#FF9800"/>
          <stop offset="100%" stop-color="#E65100"/>
        </radialGradient>
      </defs>
      <ellipse cx="50" cy="84" rx="30" ry="7" fill="rgba(0,0,0,0.14)"/>
      <circle cx="50" cy="54" r="30" fill="url(#orngGrad)" stroke="#E65100" stroke-width="1.5"/>
      <rect x="48" y="21" width="4" height="6" rx="2" fill="#5D4037"/>
      <path d="M51 23 C62 16, 70 24, 66 31 C60 33, 53 28, 51 23 Z" fill="#66BB6A" stroke="#2E7D32" stroke-width="1.2"/>
      <circle cx="50" cy="26" r="3" fill="#BF360C" opacity="0.5"/>
      <ellipse cx="38" cy="42" rx="8" ry="5" fill="#FFE082" opacity="0.6"/>
      <circle cx="44" cy="62" r="1" fill="#BF360C" opacity="0.4"/>
      <circle cx="56" cy="58" r="1" fill="#BF360C" opacity="0.4"/>
      <circle cx="52" cy="70" r="1" fill="#BF360C" opacity="0.4"/>
      <circle cx="36" cy="54" r="1" fill="#BF360C" opacity="0.4"/>
    </svg>`
  },
  {
    "id": "lemon",
    "name": "lemon",
    "displayName": "Lemon",
    "phonics": "lem · on",
    "category": "fruit",
    "suitableMeals": [
      "breakfast",
      "lunch",
      "dessert"
    ],
    "source": "Book Page 24 (Unit 4 Words #5)",
    "isFromBook": true,
    "sentence": "Sour yellow lemons make sweet and refreshing lemonade!",
    "bookQuestionRef": "Unit 4 Words: lemons",
    "svg": `<svg viewBox="0 0 100 100" class="food-svg">
      <defs>
        <radialGradient id="lemGrad" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#FFFDE7"/>
          <stop offset="50%" stop-color="#FFEE58"/>
          <stop offset="90%" stop-color="#FDD835"/>
          <stop offset="100%" stop-color="#FBC02D"/>
        </radialGradient>
        <radialGradient id="lemSlice" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#FFF9C4"/>
          <stop offset="70%" stop-color="#FFF176"/>
          <stop offset="100%" stop-color="#FDD835"/>
        </radialGradient>
      </defs>
      <ellipse cx="50" cy="84" rx="34" ry="7" fill="rgba(0,0,0,0.14)"/>
      <path d="M22 52 C15 42, 28 26, 50 26 C72 26, 85 42, 78 52 C70 66, 30 66, 22 52 Z" fill="url(#lemGrad)" stroke="#F57F17" stroke-width="1.8" transform="rotate(-15 50 50)"/>
      <path d="M18 53 Q14 51 18 48" stroke="#F57F17" stroke-width="2" fill="none"/>
      <path d="M82 48 Q86 51 82 54" stroke="#F57F17" stroke-width="2" fill="none"/>
      <circle cx="64" cy="62" r="18" fill="#FFFDE7" stroke="#FBC02D" stroke-width="2.5"/>
      <circle cx="64" cy="62" r="15" fill="url(#lemSlice)"/>
      <circle cx="64" cy="62" r="3" fill="#FFFFFF"/>
      <path d="M64 48 L64 62 M64 76 L64 62 M50 62 L64 62 M78 62 L64 62 M54 52 L64 62 M74 72 L64 62 M54 72 L64 62 M74 52 L64 62" stroke="#FFFFFF" stroke-width="1.5"/>
      <path d="M38 28 C30 18, 42 12, 52 18 C48 24, 42 26, 38 28 Z" fill="#66BB6A" stroke="#2E7D32" stroke-width="1.2"/>
      <ellipse cx="36" cy="40" rx="8" ry="4" fill="#FFFFFF" opacity="0.6" transform="rotate(-15 36 40)"/>
    </svg>`
  },
  {
    "id": "lime",
    "name": "lime",
    "displayName": "Lime",
    "phonics": "lime",
    "category": "fruit",
    "suitableMeals": [
      "breakfast",
      "lunch",
      "dessert"
    ],
    "source": "Book Page 24 (Unit 4 Words #9)",
    "isFromBook": true,
    "sentence": "Small green limes are zesty, tangy, and full of flavour!",
    "bookQuestionRef": "What are these? They're limes.",
    "svg": `<svg viewBox="0 0 100 100" class="food-svg">
      <defs>
        <radialGradient id="limeGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#E8F5E9"/>
          <stop offset="45%" stop-color="#AEEA00"/>
          <stop offset="85%" stop-color="#7CB342"/>
          <stop offset="100%" stop-color="#558B2F"/>
        </radialGradient>
        <radialGradient id="limeSlice" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#F1F8E9"/>
          <stop offset="70%" stop-color="#C5E1A5"/>
          <stop offset="100%" stop-color="#7CB342"/>
        </radialGradient>
      </defs>
      <ellipse cx="50" cy="84" rx="32" ry="7" fill="rgba(0,0,0,0.14)"/>
      <circle cx="42" cy="50" r="24" fill="url(#limeGrad)" stroke="#33691E" stroke-width="1.8"/>
      <ellipse cx="20" cy="46" rx="3" ry="2" fill="#7CB342" stroke="#33691E" stroke-width="1"/>
      <circle cx="65" cy="58" r="18" fill="#F1F8E9" stroke="#558B2F" stroke-width="2.5"/>
      <circle cx="65" cy="58" r="15" fill="url(#limeSlice)"/>
      <circle cx="65" cy="58" r="3" fill="#FFFFFF"/>
      <path d="M65 44 L65 58 M65 72 L65 58 M51 58 L65 58 M79 58 L65 58 M55 48 L65 58 M75 68 L65 58 M55 68 L65 58 M75 48 L65 58" stroke="#FFFFFF" stroke-width="1.5"/>
      <path d="M46 26 C42 16, 54 12, 62 18 C58 24, 52 26, 46 26 Z" fill="#4CAF50" stroke="#1B5E20" stroke-width="1.2"/>
      <ellipse cx="36" cy="40" rx="7" ry="4" fill="#FFFFFF" opacity="0.6" transform="rotate(-20 36 40)"/>
    </svg>`
  },
  {
    "id": "watermelon",
    "name": "watermelon",
    "displayName": "Watermelon",
    "phonics": "wa · ter · mel · on",
    "category": "fruit",
    "suitableMeals": [
      "breakfast",
      "lunch",
      "dessert"
    ],
    "source": "Book Page 24 (Unit 4 Words #3)",
    "isFromBook": true,
    "sentence": "A big slice of juicy watermelon is sweet, cool, and crunchy!",
    "bookQuestionRef": "Unit 4 Words: a watermelon",
    "svg": `<svg viewBox="0 0 100 100" class="food-svg">
      <defs>
        <radialGradient id="wmRed" cx="50%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#FF5252"/>
          <stop offset="60%" stop-color="#E53935"/>
          <stop offset="100%" stop-color="#C62828"/>
        </radialGradient>
        <linearGradient id="wmRind" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#E8F5E9"/>
          <stop offset="40%" stop-color="#66BB6A"/>
          <stop offset="100%" stop-color="#1B5E20"/>
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="84" rx="40" ry="7" fill="rgba(0,0,0,0.14)"/>
      <path d="M12 40 C14 78, 86 78, 88 40 L80 40 C78 70, 22 70, 20 40 Z" fill="url(#wmRind)" stroke="#1B5E20" stroke-width="1.5"/>
      <path d="M18 40 C20 71, 80 71, 82 40 L78 40 C76 66, 24 66, 22 40 Z" fill="#DCEDC8"/>
      <path d="M20 40 C22 66, 78 66, 80 40 Z" fill="url(#wmRed)" stroke="#B71C1C" stroke-width="1"/>
      <ellipse cx="32" cy="48" rx="2.5" ry="4.5" fill="#212121" transform="rotate(-25 32 48)"/>
      <ellipse cx="44" cy="54" rx="2.5" ry="4.5" fill="#212121" transform="rotate(-10 44 54)"/>
      <ellipse cx="56" cy="54" rx="2.5" ry="4.5" fill="#212121" transform="rotate(10 56 54)"/>
      <ellipse cx="68" cy="48" rx="2.5" ry="4.5" fill="#212121" transform="rotate(25 68 48)"/>
      <ellipse cx="50" cy="44" rx="2.5" ry="4.5" fill="#212121"/>
      <ellipse cx="38" cy="42" rx="2" ry="3.5" fill="#212121" transform="rotate(-15 38 42)"/>
      <ellipse cx="62" cy="42" rx="2" ry="3.5" fill="#212121" transform="rotate(15 62 42)"/>
      <circle cx="31" cy="47" r="1" fill="#FFFFFF"/>
      <circle cx="43" cy="53" r="1" fill="#FFFFFF"/>
      <circle cx="55" cy="53" r="1" fill="#FFFFFF"/>
    </svg>`
  },
  {
    "id": "pineapple",
    "name": "pineapple",
    "displayName": "Pineapple",
    "phonics": "pine · ap · ple",
    "category": "fruit",
    "suitableMeals": [
      "breakfast",
      "lunch",
      "dessert"
    ],
    "source": "Book Page 24, 26 & Page 28 (#4)",
    "isFromBook": true,
    "sentence": "Sam loves sweet tropical pineapple with his lunch!",
    "bookQuestionRef": "Unit 4 Words & Starters Practice Test #4",
    "svg": `<svg viewBox="0 0 100 100" class="food-svg">
      <defs>
        <radialGradient id="paBody" cx="40%" cy="40%" r="65%">
          <stop offset="0%" stop-color="#FFEE58"/>
          <stop offset="50%" stop-color="#FFA726"/>
          <stop offset="100%" stop-color="#E65100"/>
        </radialGradient>
      </defs>
      <ellipse cx="50" cy="85" rx="28" ry="7" fill="rgba(0,0,0,0.14)"/>
      <path d="M50 42 L50 14 L42 32 Z" fill="#4CAF50" stroke="#2E7D32" stroke-width="1"/>
      <path d="M48 38 L32 18 L38 36 Z" fill="#66BB6A" stroke="#2E7D32" stroke-width="1"/>
      <path d="M52 38 L68 18 L62 36 Z" fill="#43A047" stroke="#2E7D32" stroke-width="1"/>
      <path d="M46 40 L22 26 L32 40 Z" fill="#81C784" stroke="#2E7D32" stroke-width="1"/>
      <path d="M54 40 L78 26 L68 40 Z" fill="#388E3C" stroke="#2E7D32" stroke-width="1"/>
      <ellipse cx="50" cy="62" rx="26" ry="24" fill="url(#paBody)" stroke="#BF360C" stroke-width="1.8"/>
      <path d="M30 52 L70 72 M26 62 L74 62 M30 72 L70 52 M36 44 L64 80 M64 44 L36 80" stroke="#D84315" stroke-width="1.8" opacity="0.65"/>
      <circle cx="50" cy="56" r="2.5" fill="#BF360C" opacity="0.7"/>
      <circle cx="40" cy="62" r="2.5" fill="#BF360C" opacity="0.7"/>
      <circle cx="60" cy="62" r="2.5" fill="#BF360C" opacity="0.7"/>
      <circle cx="50" cy="68" r="2.5" fill="#BF360C" opacity="0.7"/>
      <circle cx="40" cy="74" r="2" fill="#BF360C" opacity="0.7"/>
      <circle cx="60" cy="74" r="2" fill="#BF360C" opacity="0.7"/>
      <circle cx="50" cy="80" r="1.5" fill="#BF360C" opacity="0.7"/>
      <ellipse cx="38" cy="52" rx="6" ry="3" fill="#FFF9C4" opacity="0.7" transform="rotate(-15 38 52)"/>
    </svg>`
  },
  {
    "id": "mango",
    "name": "mango",
    "displayName": "Mango",
    "phonics": "man · go",
    "category": "fruit",
    "suitableMeals": [
      "breakfast",
      "lunch",
      "dessert"
    ],
    "source": "Book Page 24 (Unit 4 Words #4)",
    "isFromBook": true,
    "sentence": "A ripe mango has golden, sweet, and juicy fruit inside!",
    "bookQuestionRef": "Unit 4 Words: a mango",
    "svg": `<svg viewBox="0 0 100 100" class="food-svg">
      <defs>
        <radialGradient id="mngGrad" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#FFEE58"/>
          <stop offset="35%" stop-color="#FFA726"/>
          <stop offset="70%" stop-color="#E53935"/>
          <stop offset="100%" stop-color="#43A047"/>
        </radialGradient>
      </defs>
      <ellipse cx="50" cy="84" rx="30" ry="7" fill="rgba(0,0,0,0.14)"/>
      <path d="M50 30 C36 18, 20 34, 22 56 C24 76, 44 82, 60 80 C76 78, 82 58, 76 44 C70 32, 60 22, 50 30 Z" fill="url(#mngGrad)" stroke="#E65100" stroke-width="1.8"/>
      <rect x="48" y="20" width="4" height="8" rx="2" fill="#5D4037"/>
      <path d="M51 22 C64 14, 76 20, 72 30 C64 32, 54 28, 51 22 Z" fill="#66BB6A" stroke="#2E7D32" stroke-width="1.2"/>
      <ellipse cx="36" cy="42" rx="8" ry="14" fill="#FFFFFF" opacity="0.4" transform="rotate(-20 36 42)"/>
    </svg>`
  },
  {
    "id": "kiwi",
    "name": "kiwi",
    "displayName": "Kiwi",
    "phonics": "ki · wi",
    "category": "fruit",
    "suitableMeals": [
      "breakfast",
      "lunch",
      "dessert"
    ],
    "source": "Book Page 24 & Page 28 (Unit 4 #1)",
    "isFromBook": true,
    "sentence": "A fuzzy kiwi has bright green fruit with tiny black seeds!",
    "bookQuestionRef": "Unit 4 Words & Starters Practice Test #1",
    "svg": `<svg viewBox="0 0 100 100" class="food-svg">
      <defs>
        <radialGradient id="kwFlesh" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#FFFFFF"/>
          <stop offset="25%" stop-color="#F1F8E9"/>
          <stop offset="55%" stop-color="#C5E1A5"/>
          <stop offset="85%" stop-color="#8BC34A"/>
          <stop offset="100%" stop-color="#689F38"/>
        </radialGradient>
        <radialGradient id="kwSkin" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#8D6E63"/>
          <stop offset="70%" stop-color="#6D4C41"/>
          <stop offset="100%" stop-color="#4E342E"/>
        </radialGradient>
      </defs>
      <ellipse cx="50" cy="84" rx="36" ry="7" fill="rgba(0,0,0,0.14)"/>
      <ellipse cx="35" cy="52" rx="22" ry="18" fill="url(#kwSkin)" stroke="#3E2723" stroke-width="1.8" transform="rotate(-15 35 52)"/>
      <path d="M16 46 L13 44 M15 54 L12 55 M18 64 L16 67 M40 34 L42 31" stroke="#3E2723" stroke-width="1.2"/>
      <circle cx="62" cy="56" r="22" fill="url(#kwSkin)" stroke="#3E2723" stroke-width="2"/>
      <circle cx="62" cy="56" r="19" fill="url(#kwFlesh)"/>
      <ellipse cx="62" cy="56" rx="6" ry="7" fill="#FFFFFF" stroke="#DCEDC8" stroke-width="1"/>
      <circle cx="62" cy="45" r="1.3" fill="#212121"/>
      <circle cx="67" cy="47" r="1.3" fill="#212121"/>
      <circle cx="71" cy="52" r="1.3" fill="#212121"/>
      <circle cx="71" cy="59" r="1.3" fill="#212121"/>
      <circle cx="67" cy="65" r="1.3" fill="#212121"/>
      <circle cx="62" cy="67" r="1.3" fill="#212121"/>
      <circle cx="57" cy="65" r="1.3" fill="#212121"/>
      <circle cx="53" cy="59" r="1.3" fill="#212121"/>
      <circle cx="53" cy="52" r="1.3" fill="#212121"/>
      <circle cx="57" cy="47" r="1.3" fill="#212121"/>
      <path d="M62 48 L62 42 M68 50 L73 46 M70 56 L76 56 M68 62 L73 66 M62 64 L62 70 M56 62 L51 66 M54 56 L48 56 M56 50 L51 46" stroke="#FFFFFF" stroke-width="1" opacity="0.8"/>
    </svg>`
  },
  {
    "id": "coconut",
    "name": "coconut",
    "displayName": "Coconut",
    "phonics": "co · co · nut",
    "category": "fruit",
    "suitableMeals": [
      "lunch",
      "dessert"
    ],
    "source": "Book Page 25 & Page 28 (Unit 4 #5)",
    "isFromBook": true,
    "sentence": "A round brown coconut has sweet milk and crunchy white flesh!",
    "bookQuestionRef": "Unit 4 Crossword & Starters Practice Test #5",
    "svg": `<svg viewBox="0 0 100 100" class="food-svg">
      <defs>
        <radialGradient id="ccShell" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stop-color="#8D6E63"/>
          <stop offset="60%" stop-color="#5D4037"/>
          <stop offset="100%" stop-color="#3E2723"/>
        </radialGradient>
      </defs>
      <ellipse cx="50" cy="85" rx="38" ry="7" fill="rgba(0,0,0,0.14)"/>
      <circle cx="36" cy="54" r="22" fill="url(#ccShell)" stroke="#271815" stroke-width="2"/>
      <ellipse cx="28" cy="46" rx="2.5" ry="3.5" fill="#271815"/>
      <ellipse cx="36" cy="42" rx="2.5" ry="3.5" fill="#271815"/>
      <ellipse cx="34" cy="50" rx="2.5" ry="3.5" fill="#271815"/>
      <path d="M16 50 L12 48 M18 64 L14 66 M32 32 L34 28 M48 36 L52 32" stroke="#4E342E" stroke-width="1.5"/>
      <circle cx="66" cy="58" r="20" fill="url(#ccShell)" stroke="#271815" stroke-width="2"/>
      <circle cx="66" cy="58" r="16" fill="#FFFFFF" stroke="#D7CCC8" stroke-width="1"/>
      <circle cx="66" cy="58" r="11" fill="#ECEFF1"/>
      <ellipse cx="64" cy="56" rx="4" ry="2" fill="#FFFFFF" opacity="0.8"/>
    </svg>`
  },
  {
    "id": "grapes",
    "name": "grapes",
    "displayName": "Grapes",
    "phonics": "grapes",
    "category": "fruit",
    "suitableMeals": [
      "breakfast",
      "lunch",
      "dessert"
    ],
    "source": "Book Page 24 (Unit 4 Words #8)",
    "isFromBook": true,
    "sentence": "A juicy bunch of sweet green grapes is perfect for snacking!",
    "bookQuestionRef": "Unit 4 Words: grapes",
    "svg": `<svg viewBox="0 0 100 100" class="food-svg">
      <defs>
        <radialGradient id="grpGrad" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stop-color="#DCEDC8"/>
          <stop offset="60%" stop-color="#AED581"/>
          <stop offset="100%" stop-color="#689F38"/>
        </radialGradient>
      </defs>
      <ellipse cx="50" cy="85" rx="28" ry="6" fill="rgba(0,0,0,0.12)"/>
      <path d="M50 28 Q50 16 58 14" stroke="#5D4037" stroke-width="3" stroke-linecap="round" fill="none"/>
      <path d="M52 20 Q62 20 60 14" stroke="#558B2F" stroke-width="1.5" stroke-linecap="round" fill="none"/>
      <path d="M50 24 C40 18, 28 24, 32 34 C36 38, 46 36, 50 24 Z" fill="#7CB342" stroke="#558B2F" stroke-width="1.5"/>
      <path d="M48 26 L36 30" stroke="#558B2F" stroke-width="1"/>
      <circle cx="42" cy="40" r="9" fill="url(#grpGrad)" stroke="#558B2F" stroke-width="1"/>
      <circle cx="58" cy="40" r="9" fill="url(#grpGrad)" stroke="#558B2F" stroke-width="1"/>
      <circle cx="50" cy="38" r="9.5" fill="url(#grpGrad)" stroke="#558B2F" stroke-width="1"/>
      <circle cx="34" cy="52" r="9" fill="url(#grpGrad)" stroke="#558B2F" stroke-width="1"/>
      <circle cx="50" cy="51" r="9.5" fill="url(#grpGrad)" stroke="#558B2F" stroke-width="1"/>
      <circle cx="66" cy="52" r="9" fill="url(#grpGrad)" stroke="#558B2F" stroke-width="1"/>
      <circle cx="42" cy="63" r="9" fill="url(#grpGrad)" stroke="#558B2F" stroke-width="1"/>
      <circle cx="58" cy="63" r="9" fill="url(#grpGrad)" stroke="#558B2F" stroke-width="1"/>
      <circle cx="50" cy="74" r="8.5" fill="url(#grpGrad)" stroke="#558B2F" stroke-width="1"/>
      <circle cx="48" cy="35" r="2.5" fill="#FFFFFF" opacity="0.7"/>
      <circle cx="32" cy="49" r="2.2" fill="#FFFFFF" opacity="0.7"/>
      <circle cx="48" cy="48" r="2.5" fill="#FFFFFF" opacity="0.7"/>
      <circle cx="48" cy="71" r="2" fill="#FFFFFF" opacity="0.7"/>
    </svg>`
  },
  {
    "id": "apple",
    "name": "apple",
    "displayName": "Apple",
    "phonics": "ap · ple",
    "category": "fruit",
    "suitableMeals": [
      "breakfast",
      "lunch",
      "dessert"
    ],
    "source": "Book Page 24 (Unit 4 Words #10)",
    "isFromBook": true,
    "sentence": "An apple a day keeps the doctor away!",
    "bookQuestionRef": "Unit 4 Words: an apple",
    "svg": `<svg viewBox="0 0 100 100" class="food-svg">
      <defs>
        <radialGradient id="aplGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#FF8A80"/>
          <stop offset="55%" stop-color="#E53935"/>
          <stop offset="100%" stop-color="#B71C1C"/>
        </radialGradient>
      </defs>
      <ellipse cx="50" cy="84" rx="28" ry="7" fill="rgba(0,0,0,0.14)"/>
      <path d="M50 32 C38 20, 20 28, 20 52 C20 72, 38 82, 50 78 C62 82, 80 72, 80 52 C80 28, 62 20, 50 32 Z" fill="url(#aplGrad)" stroke="#B71C1C" stroke-width="1.5"/>
      <path d="M50 32 Q54 20 58 14" stroke="#5D4037" stroke-width="3" stroke-linecap="round" fill="none"/>
      <path d="M52 22 C64 16, 72 24, 68 31 C61 33, 54 28, 52 22 Z" fill="#66BB6A" stroke="#2E7D32" stroke-width="1.2"/>
      <ellipse cx="36" cy="42" rx="6" ry="12" fill="#FFCDD2" opacity="0.6" transform="rotate(-20 36 42)"/>
    </svg>`
  },
  {
    "id": "pear",
    "name": "pear",
    "displayName": "Pear",
    "phonics": "pear",
    "category": "fruit",
    "suitableMeals": [
      "breakfast",
      "lunch",
      "dessert"
    ],
    "source": "Book Page 24 (Unit 4 Words #6)",
    "isFromBook": true,
    "sentence": "A juicy green pear picked fresh from the fruit tree!",
    "bookQuestionRef": "Unit 4 Words: pears",
    "svg": `<svg viewBox="0 0 100 100" class="food-svg">
      <defs>
        <radialGradient id="prGrad" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#F0F4C3"/>
          <stop offset="60%" stop-color="#C0CA33"/>
          <stop offset="100%" stop-color="#827717"/>
        </radialGradient>
      </defs>
      <ellipse cx="50" cy="84" rx="26" ry="7" fill="rgba(0,0,0,0.14)"/>
      <path d="M50 32 C42 32, 40 44, 30 56 C20 68, 28 82, 50 82 C72 82, 80 68, 70 56 C60 44, 58 32, 50 32 Z" fill="url(#prGrad)" stroke="#827717" stroke-width="1.5"/>
      <path d="M50 32 Q53 22 57 16" stroke="#5D4037" stroke-width="3" stroke-linecap="round" fill="none"/>
      <path d="M52 24 C60 20, 66 26, 62 30 C57 32, 53 28, 52 24 Z" fill="#8BC34A" stroke="#558B2F" stroke-width="1"/>
      <ellipse cx="40" cy="62" rx="6" ry="10" fill="#FFFFFF" opacity="0.4" transform="rotate(-15 40 62)"/>
    </svg>`
  },

  // --- Sweet Desserts ---
  {
    "id": "ice-cream",
    "name": "ice cream",
    "displayName": "Ice Cream",
    "phonics": "ice · cream",
    "category": "dessert",
    "suitableMeals": [
      "dessert"
    ],
    "source": "Bonus Sweet Dessert",
    "isFromBook": false,
    "sentence": "Cold strawberry and vanilla ice cream with a bright red cherry!",
    "bookQuestionRef": "What sweet dessert does Lily want?",
    "svg": `<svg viewBox="0 0 100 100" class="food-svg">
      <defs>
        <radialGradient id="icPink" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#FF80AB"/>
          <stop offset="70%" stop-color="#F50057"/>
          <stop offset="100%" stop-color="#C51162"/>
        </radialGradient>
        <radialGradient id="icVanilla" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#FFFDE7"/>
          <stop offset="70%" stop-color="#FFF59D"/>
          <stop offset="100%" stop-color="#FBC02D"/>
        </radialGradient>
      </defs>
      <ellipse cx="50" cy="86" rx="26" ry="6" fill="rgba(0,0,0,0.14)"/>
      <path d="M26 54 Q50 56 74 54 L68 76 Q50 82 32 76 Z" fill="#E1F5FE" stroke="#81D4FA" stroke-width="1.8"/>
      <path d="M44 78 L42 86 L58 86 L56 78 Z" fill="#B3E5FC" stroke="#81D4FA" stroke-width="1.5"/>
      <ellipse cx="50" cy="86" rx="16" ry="4" fill="#E1F5FE" stroke="#81D4FA" stroke-width="1.5"/>
      <circle cx="42" cy="46" r="14" fill="url(#icVanilla)" stroke="#FBC02D" stroke-width="1"/>
      <circle cx="58" cy="46" r="14" fill="url(#icPink)" stroke="#C51162" stroke-width="1"/>
      <circle cx="50" cy="34" r="13" fill="url(#icPink)" stroke="#C51162" stroke-width="1"/>
      <line x1="44" y1="30" x2="48" y2="33" stroke="#00E676" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="53" y1="28" x2="57" y2="31" stroke="#FFD600" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="46" y1="42" x2="50" y2="44" stroke="#2979FF" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="50" cy="20" r="6" fill="#D50000" stroke="#B71C1C" stroke-width="1"/>
      <circle cx="48" cy="18" r="2" fill="#FFCDD2"/>
      <path d="M50 16 Q56 8 62 10" stroke="#2E7D32" stroke-width="1.8" stroke-linecap="round" fill="none"/>
    </svg>`
  },
  {
    "id": "cake",
    "name": "cake",
    "displayName": "Cake",
    "phonics": "cake",
    "category": "dessert",
    "suitableMeals": [
      "dessert"
    ],
    "source": "Bonus Sweet Dessert",
    "isFromBook": false,
    "sentence": "A slice of yummy birthday cake with sweet frosting!",
    "bookQuestionRef": "What sweet dessert does Lily want?",
    "svg": `<svg viewBox="0 0 100 100" class="food-svg">
      <defs>
        <linearGradient id="cakeSponge" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#FFE082"/>
          <stop offset="100%" stop-color="#FFB300"/>
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="85" rx="38" ry="7" fill="rgba(0,0,0,0.14)"/>
      <ellipse cx="50" cy="80" rx="42" ry="12" fill="#FFFFFF" stroke="#CFD8DC" stroke-width="2"/>
      <polygon points="18,60 50,75 84,55 52,42" fill="#FFD54F" stroke="#FFA000" stroke-width="1.5"/>
      <path d="M18 60 L50 75 L50 68 L18 53 Z" fill="url(#cakeSponge)"/>
      <path d="M18 53 L50 68 L50 64 L18 49 Z" fill="#FF4081"/>
      <path d="M18 49 L50 64 L50 56 L18 41 Z" fill="url(#cakeSponge)"/>
      <polygon points="50,75 84,55 84,40 50,56" fill="#FFE082" stroke="#FFA000" stroke-width="1"/>
      <path d="M50 68 L84 48 L84 45 L50 64 Z" fill="#FF4081"/>
      <polygon points="18,41 50,56 84,40 52,28" fill="#FFFFFF" stroke="#ECEFF1" stroke-width="1.5"/>
      <path d="M18 41 Q26 48 34 46 Q42 53 50 56 Q67 48 84 40" stroke="#FFFFFF" stroke-width="3" fill="none"/>
      <polygon points="52,24 45,34 59,34" fill="#E53935"/>
      <circle cx="52" cy="22" r="1.5" fill="#2E7D32"/>
      <path d="M50 20 Q52 18 54 20" stroke="#2E7D32" stroke-width="1.5" fill="none"/>
    </svg>`
  },
  {
    "id": "cookie",
    "name": "cookie",
    "displayName": "Cookie",
    "phonics": "cook · ie",
    "category": "dessert",
    "suitableMeals": [
      "dessert",
      "lunch"
    ],
    "source": "Bonus Sweet Dessert",
    "isFromBook": false,
    "sentence": "A crunchy cookie packed with yummy chocolate chips!",
    "bookQuestionRef": "What sweet dessert does Lily want?",
    "svg": `<svg viewBox="0 0 100 100" class="food-svg">
      <defs>
        <radialGradient id="ckGrad" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stop-color="#FFE082"/>
          <stop offset="60%" stop-color="#FFB74D"/>
          <stop offset="100%" stop-color="#C77800"/>
        </radialGradient>
      </defs>
      <ellipse cx="50" cy="82" rx="34" ry="7" fill="rgba(0,0,0,0.14)"/>
      <circle cx="50" cy="50" r="32" fill="url(#ckGrad)" stroke="#B26A00" stroke-width="2"/>
      <path d="M50 18 Q62 20 72 30 Q82 42 82 54 Q80 70 68 78 Q50 84 34 78 Q20 70 18 52 Q18 36 30 26 Q40 18 50 18 Z" fill="url(#ckGrad)"/>
      <circle cx="36" cy="38" r="4.5" fill="#3E2723"/>
      <circle cx="58" cy="34" r="5" fill="#3E2723"/>
      <circle cx="48" cy="52" r="5.5" fill="#3E2723"/>
      <circle cx="64" cy="56" r="4" fill="#3E2723"/>
      <circle cx="34" cy="62" r="4.5" fill="#3E2723"/>
      <circle cx="52" cy="70" r="3.5" fill="#3E2723"/>
      <circle cx="34" cy="36" r="1.5" fill="#5D4037"/>
      <circle cx="46" cy="50" r="1.5" fill="#5D4037"/>
      <circle cx="56" cy="32" r="1.5" fill="#5D4037"/>
    </svg>`
  },
  {
    "id": "jelly",
    "name": "jelly",
    "displayName": "Jelly",
    "phonics": "jel · ly",
    "category": "dessert",
    "suitableMeals": [
      "dessert"
    ],
    "source": "Bonus Sweet Dessert",
    "isFromBook": false,
    "sentence": "Wobbly, giggly strawberry jelly that dances on the plate!",
    "bookQuestionRef": "What sweet dessert does Lily want?",
    "svg": `<svg viewBox="0 0 100 100" class="food-svg">
      <defs>
        <radialGradient id="jlGrad" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stop-color="#FF4081"/>
          <stop offset="65%" stop-color="#E91E63"/>
          <stop offset="100%" stop-color="#880E4F"/>
        </radialGradient>
      </defs>
      <ellipse cx="50" cy="85" rx="36" ry="7" fill="rgba(0,0,0,0.14)"/>
      <ellipse cx="50" cy="78" rx="40" ry="13" fill="#FFFFFF" stroke="#CFD8DC" stroke-width="2"/>
      <ellipse cx="50" cy="78" rx="32" ry="9" fill="#F8FAFC"/>
      <path d="M30 38 Q50 34 70 38 L78 72 Q50 78 22 72 Z" fill="url(#jlGrad)" stroke="#C2185B" stroke-width="1.5"/>
      <path d="M30 38 Q34 54 36 73 M42 36 Q45 54 48 74 M58 36 Q57 54 58 74 M70 38 Q67 54 68 73" stroke="#F48FB1" stroke-width="1.8" fill="none" opacity="0.6"/>
      <ellipse cx="50" cy="38" rx="20" ry="6" fill="#FF80AB"/>
      <ellipse cx="36" cy="46" rx="4" ry="10" fill="#FFFFFF" opacity="0.4" transform="rotate(-15 36 46)"/>
      <path d="M50 34 C55 28 62 30 60 36 C55 37 51 35 50 34 Z" fill="#66BB6A" stroke="#2E7D32" stroke-width="1"/>
    </svg>`
  }
];
