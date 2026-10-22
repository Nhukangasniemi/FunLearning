import { QuizQuestionType } from "@/types";

export const BOOK_QUIZ_QUESTIONS: QuizQuestionType[] = [
  {
    "id": "q1",
    "bookPage": "Page 29",
    "part": "Listening, Part 3 - Question 1",
    "question": "What's Pat's favourite food?",
    "instruction": "Listen and tick (✓) the box.",
    "audioTranscript": "Man: What's your favourite food, Pat? Is it burgers? Pat: No, I like chicken, but sausages are my favourite! Man: Sausages? Great!",
    "correctOption": "B",
    "options": [
      {
        "id": "A",
        "text": "Chicken",
        "foodId": "chicken",
        "imageLabel": "Roast Chicken"
      },
      {
        "id": "B",
        "text": "Sausages",
        "foodId": "sausages",
        "imageLabel": "Hot Sausages",
        "isCorrect": true
      },
      {
        "id": "C",
        "text": "Burgers",
        "foodId": "burger",
        "imageLabel": "Two Burgers"
      }
    ],
    "explanation": "Pat says: 'Sausages are my favourite!'"
  },
  {
    "id": "q2",
    "bookPage": "Page 29",
    "part": "Listening, Part 3 - Question 2",
    "question": "What does Dan eat for breakfast?",
    "instruction": "Listen and tick (✓) the box.",
    "audioTranscript": "Woman: Do you eat salad for breakfast, Dan? Dan: No, I don't! I eat two boiled eggs and bread. Woman: Eggs and bread? Yummy!",
    "correctOption": "A",
    "options": [
      {
        "id": "A",
        "text": "Eggs and bread",
        "foodId": "eggs",
        "combo": [
          "eggs",
          "bread"
        ],
        "isCorrect": true,
        "imageLabel": "Eggs & Bread"
      },
      {
        "id": "B",
        "text": "Salad and bread",
        "foodId": "salad",
        "combo": [
          "salad",
          "bread"
        ],
        "isCorrect": false,
        "imageLabel": "Salad & Bread"
      },
      {
        "id": "C",
        "text": "Salad and eggs",
        "foodId": "salad",
        "combo": [
          "salad",
          "eggs"
        ],
        "isCorrect": false,
        "imageLabel": "Salad & Eggs"
      }
    ],
    "explanation": "Dan says: 'I eat two boiled eggs and bread for breakfast!'"
  },
  {
    "id": "q3",
    "bookPage": "Page 26",
    "part": "Story & Listening - Question 2",
    "question": "What does Sam eat for lunch?",
    "instruction": "Listen to Sam talking about his lunch on Page 26.",
    "audioTranscript": "Teacher: What do you eat for lunch, Sam? Sam: I eat fish, rice and pineapple! Look! I eat meat, bread and fruit.",
    "correctOption": "A",
    "options": [
      {
        "id": "A",
        "text": "Fish, rice and pineapple",
        "foodId": "fish",
        "combo": [
          "fish",
          "rice",
          "pineapple"
        ],
        "isCorrect": true,
        "imageLabel": "Fish, Rice & Pineapple"
      },
      {
        "id": "B",
        "text": "Burgers and chips",
        "foodId": "chips",
        "combo": [
          "burger",
          "chips"
        ],
        "isCorrect": false,
        "imageLabel": "Burgers and Chips"
      },
      {
        "id": "C",
        "text": "Eggs, sausages and beans",
        "foodId": "beans",
        "combo": [
          "eggs",
          "sausages",
          "beans"
        ],
        "isCorrect": false,
        "imageLabel": "Big Breakfast"
      }
    ],
    "explanation": "Sam says: 'I eat fish, rice and pineapple for lunch!'"
  },
  {
    "id": "q4",
    "bookPage": "Page 26",
    "part": "Story & Listening - Question 4",
    "question": "What's Sam's favourite meal?",
    "instruction": "Listen to the dialogue on Page 26.",
    "audioTranscript": "Girl: What's your favourite meal, Sam? Sam: Dinner! I like burgers and chips!",
    "correctOption": "B",
    "options": [
      {
        "id": "A",
        "text": "Breakfast: Bread and fruit",
        "foodId": "banana",
        "combo": [
          "bread",
          "banana"
        ],
        "isCorrect": false,
        "imageLabel": "Bread and Fruit"
      },
      {
        "id": "B",
        "text": "Dinner: Burgers and chips",
        "foodId": "burger",
        "combo": [
          "burger",
          "chips"
        ],
        "isCorrect": true,
        "imageLabel": "Burgers & Chips"
      },
      {
        "id": "C",
        "text": "Lunch: Fish and rice",
        "foodId": "rice",
        "combo": [
          "fish",
          "rice"
        ],
        "isCorrect": false,
        "imageLabel": "Fish & Rice"
      }
    ],
    "explanation": "Sam says: 'Dinner! I like burgers and chips!'"
  },
  {
    "id": "q5",
    "bookPage": "Page 24",
    "part": "Unit 4 Words - Question 2 (Ask, point and say)",
    "question": "What are these green fruits on Page 24?",
    "instruction": "Listen to the monsters on Page 24.",
    "audioTranscript": "Blue monster: What are these? Pink monster: They're limes! What's this? Blue monster: It's a banana.",
    "correctOption": "A",
    "options": [
      {
        "id": "A",
        "text": "They're limes",
        "foodId": "lime",
        "isCorrect": true,
        "imageLabel": "Limes"
      },
      {
        "id": "B",
        "text": "They're lemons",
        "foodId": "lemon",
        "isCorrect": false,
        "imageLabel": "Lemons"
      },
      {
        "id": "C",
        "text": "They're pears",
        "foodId": "pear",
        "isCorrect": false,
        "imageLabel": "Pears"
      }
    ],
    "explanation": "The pink monster says: 'They're limes!'"
  },
  {
    "id": "q6",
    "bookPage": "Page 28",
    "part": "Starters Practice Test - Reading & Writing, Part 3",
    "question": "Which fruit has the scrambled letters P-I-N-E-A-P-P-L-E?",
    "instruction": "Look at picture 4 on Page 28.",
    "audioTranscript": "Look at the letters: P-I-N-E-A-P-P-L-E. They spell Pineapple!",
    "correctOption": "A",
    "options": [
      {
        "id": "A",
        "text": "Pineapple",
        "foodId": "pineapple",
        "isCorrect": true,
        "imageLabel": "Pineapple"
      },
      {
        "id": "B",
        "text": "Coconut",
        "foodId": "coconut",
        "isCorrect": false,
        "imageLabel": "Coconut"
      },
      {
        "id": "C",
        "text": "Watermelon",
        "foodId": "watermelon",
        "isCorrect": false,
        "imageLabel": "Watermelon"
      }
    ],
    "explanation": "P-I-N-E-A-P-P-L-E spells Pineapple!"
  },
  {
    "id": "q7",
    "bookPage": "Page 37",
    "part": "Revision 1 - Question 4",
    "question": "What fruit is in Sue's bag?",
    "instruction": "Look at Sue's bag on Page 37. Which fruit did Sue pack?",
    "audioTranscript": "Sue packed a banana, green grapes, and an orange in her pink flower bag!",
    "correctOption": "ALL_FRUITS",
    "multiChoice": true,
    "fruitsInBag": [
      "banana",
      "grapes",
      "orange"
    ],
    "options": [
      {
        "id": "banana",
        "text": "Banana",
        "foodId": "banana",
        "inBag": true
      },
      {
        "id": "grapes",
        "text": "Grapes",
        "foodId": "grapes",
        "inBag": true
      },
      {
        "id": "orange",
        "text": "Orange",
        "foodId": "orange",
        "inBag": true
      },
      {
        "id": "burger",
        "text": "Burger",
        "foodId": "burger",
        "inBag": false
      },
      {
        "id": "sausages",
        "text": "Sausages",
        "foodId": "sausages",
        "inBag": false
      }
    ],
    "explanation": "Sue packed a banana, green grapes, and an orange in her pretty bag!"
  },
  {
    "id": "q8",
    "bookPage": "Page 25",
    "part": "Unit 4 Words & Writing - Crossword",
    "question": "Which sweet baked food is #1 down in the crossword?",
    "instruction": "Look at the crossword puzzle on Page 25.",
    "audioTranscript": "Look at number 1 in the crossword: P-I-E spells pie!",
    "correctOption": "A",
    "options": [
      {
        "id": "A",
        "text": "Pie",
        "foodId": "pie",
        "isCorrect": true,
        "imageLabel": "Pie"
      },
      {
        "id": "B",
        "text": "Bread",
        "foodId": "bread",
        "isCorrect": false,
        "imageLabel": "Bread"
      },
      {
        "id": "C",
        "text": "Potato",
        "foodId": "potato",
        "isCorrect": false,
        "imageLabel": "Potato"
      }
    ],
    "explanation": "Number 1 down in the Unit 4 crossword is Pie!"
  }
];
