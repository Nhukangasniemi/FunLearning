-- CreateTable
CREATE TABLE "books" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "series" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "target_age" TEXT NOT NULL,
    "description" TEXT,
    "cover_image" TEXT,
    "theme_color" TEXT NOT NULL DEFAULT '#ec4899',
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "is_published" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "units" (
    "id" TEXT NOT NULL,
    "book_id" TEXT NOT NULL,
    "unit_number" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT NOT NULL DEFAULT 'BookOpen',
    "theme_color" TEXT NOT NULL DEFAULT '#ec4899',
    "companion" TEXT NOT NULL DEFAULT 'lily',
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "is_published" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "units_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vocabulary_items" (
    "id" TEXT NOT NULL,
    "unit_id" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "phonics" TEXT NOT NULL,
    "part_of_speech" TEXT,
    "category" TEXT,
    "example_sentence" TEXT NOT NULL,
    "definition" TEXT,
    "svg" TEXT,
    "image_url" TEXT,
    "audio_url" TEXT,
    "is_from_book" BOOLEAN NOT NULL DEFAULT true,
    "book_source" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "game_metadata" JSONB,
    "user_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vocabulary_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quiz_questions" (
    "id" TEXT NOT NULL,
    "unit_id" TEXT NOT NULL,
    "book_page" TEXT NOT NULL,
    "part" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "instruction" TEXT,
    "audio_transcript" TEXT NOT NULL,
    "correct_option" TEXT NOT NULL,
    "multi_choice" BOOLEAN NOT NULL DEFAULT false,
    "explanation" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "quiz_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quiz_options" (
    "id" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "is_correct" BOOLEAN NOT NULL DEFAULT false,
    "image_label" TEXT,
    "combo" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "vocabulary_item_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "quiz_options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unit_progress" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "unit_id" TEXT NOT NULL,
    "stars_earned" INTEGER NOT NULL DEFAULT 0,
    "is_completed" BOOLEAN NOT NULL DEFAULT false,
    "learn_completed" BOOLEAN NOT NULL DEFAULT false,
    "flashcards_completed" BOOLEAN NOT NULL DEFAULT false,
    "games_completed" BOOLEAN NOT NULL DEFAULT false,
    "quiz_score" INTEGER NOT NULL DEFAULT 0,
    "completed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "unit_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "word_progress" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "vocabulary_item_id" TEXT NOT NULL,
    "mastery_level" INTEGER NOT NULL DEFAULT 0,
    "review_count" INTEGER NOT NULL DEFAULT 0,
    "mistake_count" INTEGER NOT NULL DEFAULT 0,
    "last_reviewed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "word_progress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "books_slug_key" ON "books"("slug");

-- CreateIndex
CREATE INDEX "units_book_id_sort_order_idx" ON "units"("book_id", "sort_order");
CREATE UNIQUE INDEX "units_book_id_unit_number_key" ON "units"("book_id", "unit_number");
CREATE UNIQUE INDEX "units_book_id_slug_key" ON "units"("book_id", "slug");

-- CreateIndex
CREATE INDEX "vocabulary_items_unit_id_sort_order_idx" ON "vocabulary_items"("unit_id", "sort_order");

-- CreateIndex
CREATE INDEX "quiz_questions_unit_id_sort_order_idx" ON "quiz_questions"("unit_id", "sort_order");

-- CreateIndex
CREATE UNIQUE INDEX "unit_progress_user_id_unit_id_key" ON "unit_progress"("user_id", "unit_id");

-- CreateIndex
CREATE INDEX "word_progress_user_id_mastery_level_idx" ON "word_progress"("user_id", "mastery_level");
CREATE UNIQUE INDEX "word_progress_user_id_vocabulary_item_id_key" ON "word_progress"("user_id", "vocabulary_item_id");

-- AddForeignKey
ALTER TABLE "units" ADD CONSTRAINT "units_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vocabulary_items" ADD CONSTRAINT "vocabulary_items_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "units"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "vocabulary_items" ADD CONSTRAINT "vocabulary_items_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_questions" ADD CONSTRAINT "quiz_questions_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "units"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_options" ADD CONSTRAINT "quiz_options_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "quiz_questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "quiz_options" ADD CONSTRAINT "quiz_options_vocabulary_item_id_fkey" FOREIGN KEY ("vocabulary_item_id") REFERENCES "vocabulary_items"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unit_progress" ADD CONSTRAINT "unit_progress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "unit_progress" ADD CONSTRAINT "unit_progress_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "units"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "word_progress" ADD CONSTRAINT "word_progress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "word_progress" ADD CONSTRAINT "word_progress_vocabulary_item_id_fkey" FOREIGN KEY ("vocabulary_item_id") REFERENCES "vocabulary_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;
