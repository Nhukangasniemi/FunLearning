"use client";

import React, { useState } from "react";
import { VocabularyItemType } from "@/types";
import { soundManager } from "@/lib/audio";
import { Volume2, Plus, Sparkles, BookOpen, Layers } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface VocabularyLearnStudioProps {
  vocabulary: VocabularyItemType[];
  unitTitle: string;
  onAddNewWord?: (item: VocabularyItemType) => void;
}

export const VocabularyLearnStudio: React.FC<VocabularyLearnStudioProps> = ({
  vocabulary,
  unitTitle,
  onAddNewWord,
}) => {
  const [filter, setFilter] = useState<string>("all");
  const [selectedWord, setSelectedWord] = useState<VocabularyItemType | null>(
    vocabulary[0] || null
  );
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states for adding custom vocabulary
  const [newName, setNewName] = useState("");
  const [newPhonics, setNewPhonics] = useState("");
  const [newSentence, setNewSentence] = useState("");
  const [newCategory, setNewCategory] = useState("general");
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const categories = Array.from(
    new Set(vocabulary.map((v) => v.category).filter(Boolean))
  ) as string[];

  const filteredItems = vocabulary.filter((v) => {
    if (filter === "all") return true;
    if (filter === "book") return v.isFromBook;
    return v.category === filter;
  });

  const handlePlayWord = (word: VocabularyItemType) => {
    soundManager.playPop();
    setSelectedWord(word);
    soundManager.speak(`${word.displayName}. ${word.exampleSentence}`);
  };

  const handlePlaySyllable = (syllable: string) => {
    soundManager.playPop();
    soundManager.speak(syllable);
  };

  // Upload to Cloudflare R2
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    soundManager.playChime();

    try {
      const presignedRes = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type,
        }),
      });
      const { uploadUrl, fileUrl } = await presignedRes.json();

      await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });

      setUploadedUrl(fileUrl);
      soundManager.speak("Image uploaded successfully to Cloudflare R2!");
    } catch (err) {
      console.error(err);
      soundManager.playError();
    } finally {
      setUploading(false);
    }
  };

  const handleSaveWord = () => {
    if (!newName.trim() || !newSentence.trim()) {
      soundManager.speak("Please enter a word name and a sentence!");
      return;
    }

    const newItem: VocabularyItemType = {
      id: `custom-${Date.now()}`,
      unitId: vocabulary[0]?.unitId || "custom",
      word: newName.toLowerCase().trim(),
      displayName: newName.trim(),
      phonics: newPhonics.trim() || newName.toLowerCase().split("").join(" · "),
      partOfSpeech: "noun",
      category: newCategory,
      exampleSentence: newSentence.trim(),
      definition: "Custom vocabulary card",
      imageUrl: uploadedUrl || null,
      isFromBook: false,
      sortOrder: vocabulary.length + 1,
    };

    onAddNewWord?.(newItem);
    setShowAddModal(false);
    setNewName("");
    setNewPhonics("");
    setNewSentence("");
    setUploadedUrl(null);
    soundManager.playSuccessFanfare();
    soundManager.speak(`Added ${newItem.displayName} to vocabulary dictionary!`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Studio Header & Add Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-pink-600" />
            Learn & Sound Studio — {unitTitle}
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Tap words to hear native English pronunciation, explore syllables, and practice enunciation!
          </p>
        </div>

        <Button
          onClick={() => setShowAddModal(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-bold shadow-md shadow-emerald-200"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          Add Custom Word
        </Button>
      </div>

      {/* Featured Word Display Hero */}
      {selectedWord && (
        <Card className="p-6 mb-8 bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 border-2 border-pink-200 rounded-3xl shadow-lg">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-36 h-36 bg-white rounded-2xl p-3 shadow-md flex items-center justify-center border border-pink-100 shrink-0">
              {selectedWord.svg ? (
                <div
                  className="w-full h-full drop-shadow-md"
                  dangerouslySetInnerHTML={{ __html: selectedWord.svg }}
                />
              ) : selectedWord.imageUrl ? (
                <img
                  src={selectedWord.imageUrl}
                  alt={selectedWord.displayName}
                  className="w-full h-full object-contain rounded-xl"
                />
              ) : (
                <span className="text-4xl font-black text-pink-500">
                  {selectedWord.displayName[0]}
                </span>
              )}
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2 flex-wrap">
                <h3 className="text-3xl font-black text-slate-800">
                  {selectedWord.displayName}
                </h3>
                <Badge className="bg-pink-600 text-white font-bold text-xs">
                  {selectedWord.category || "Vocabulary"}
                </Badge>
                {selectedWord.isFromBook && (
                  <Badge variant="outline" className="border-pink-300 text-pink-700 text-xs">
                    📖 Cambridge Book
                  </Badge>
                )}
              </div>

              {/* Syllable Breakdown Chips */}
              <div className="flex items-center justify-center md:justify-start gap-1.5 mb-3 flex-wrap">
                <span className="text-xs font-bold text-slate-500 mr-1">Phonics:</span>
                {selectedWord.phonics.split(" · ").map((syllable, idx) => (
                  <button
                    key={`${selectedWord.id}-syl-${idx}`}
                    onClick={() => handlePlaySyllable(syllable)}
                    className="px-2.5 py-1 bg-white border border-pink-300 text-pink-700 hover:bg-pink-100 rounded-lg text-xs font-black shadow-2xs active:scale-95 transition-transform"
                    title={`Hear syllable '${syllable}'`}
                  >
                    {syllable}
                  </button>
                ))}
              </div>

              {/* Example Sentence */}
              <p className="text-base text-slate-700 italic font-medium leading-relaxed mb-4">
                &ldquo;{selectedWord.exampleSentence}&rdquo;
              </p>

              <div className="flex items-center justify-center md:justify-start gap-3">
                <Button
                  onClick={() => handlePlayWord(selectedWord)}
                  className="bg-pink-600 hover:bg-pink-700 text-white rounded-full font-bold shadow-md shadow-pink-200"
                >
                  <Volume2 className="w-5 h-5 mr-1.5" />
                  Listen to Word & Sentence
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Filter Chips */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
        <Button
          size="sm"
          variant={filter === "all" ? "default" : "outline"}
          className={filter === "all" ? "bg-slate-800 text-white" : "border-slate-300"}
          onClick={() => setFilter("all")}
        >
          All ({vocabulary.length})
        </Button>
        <Button
          size="sm"
          variant={filter === "book" ? "default" : "outline"}
          className={filter === "book" ? "bg-pink-600 text-white" : "border-slate-300"}
          onClick={() => setFilter("book")}
        >
          📖 Cambridge Official
        </Button>
        {categories.map((cat) => (
          <Button
            key={cat}
            size="sm"
            variant={filter === cat ? "default" : "outline"}
            className={filter === cat ? "bg-purple-600 text-white" : "border-slate-300 capitalize"}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Vocabulary Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {filteredItems.map((item) => (
          <Card
            key={item.id}
            onClick={() => handlePlayWord(item)}
            className={`p-3 rounded-2xl border cursor-pointer transition-all hover:scale-102 hover:shadow-md flex flex-col items-center text-center ${
              selectedWord?.id === item.id
                ? "border-2 border-pink-500 bg-pink-50/50 shadow-md"
                : "border-slate-200/80 bg-white hover:border-pink-300"
            }`}
          >
            <div className="w-16 h-16 mb-2 flex items-center justify-center">
              {item.svg ? (
                <div
                  className="w-full h-full drop-shadow-xs"
                  dangerouslySetInnerHTML={{ __html: item.svg }}
                />
              ) : item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.displayName}
                  className="w-full h-full object-contain rounded-lg"
                />
              ) : (
                <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center text-pink-600 font-bold">
                  {item.displayName[0]}
                </div>
              )}
            </div>

            <span className="font-extrabold text-slate-800 text-sm">{item.displayName}</span>
            <span className="text-[11px] text-pink-600 font-semibold tracking-wide mt-0.5">
              {item.phonics}
            </span>
          </Card>
        ))}
      </div>

      {/* Add Custom Word Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="sm:max-w-[450px] rounded-3xl bg-white p-6 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-black text-slate-800 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              Add Custom Vocabulary Card
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div>
              <Label className="text-xs font-bold text-slate-600">Word Name</Label>
              <Input
                placeholder="e.g. Strawberry, Backpack, Kitten"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="mt-1 rounded-xl"
              />
            </div>

            <div>
              <Label className="text-xs font-bold text-slate-600">Phonics Breakdown</Label>
              <Input
                placeholder="e.g. straw · ber · ry"
                value={newPhonics}
                onChange={(e) => setNewPhonics(e.target.value)}
                className="mt-1 rounded-xl"
              />
            </div>

            <div>
              <Label className="text-xs font-bold text-slate-600">Example Sentence</Label>
              <Input
                placeholder="e.g. I like eating sweet red strawberries!"
                value={newSentence}
                onChange={(e) => setNewSentence(e.target.value)}
                className="mt-1 rounded-xl"
              />
            </div>

            <div>
              <Label className="text-xs font-bold text-slate-600">Upload Photo (Cloudflare R2)</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={uploading}
                className="mt-1 rounded-xl cursor-pointer"
              />
              {uploading && <p className="text-xs text-purple-600 mt-1 animate-pulse">Uploading to Cloudflare R2...</p>}
              {uploadedUrl && <p className="text-xs text-emerald-600 mt-1 font-bold">✓ Image uploaded to R2!</p>}
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setShowAddModal(false)} className="rounded-full">
              Cancel
            </Button>
            <Button onClick={handleSaveWord} className="bg-pink-600 hover:bg-pink-700 text-white rounded-full font-bold">
              Save Card
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
