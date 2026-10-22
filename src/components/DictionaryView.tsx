"use client";

import React, { useState } from "react";
import { FoodItemType } from "@/types";
import { soundManager } from "@/lib/audio";
import { Volume2, Plus, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface DictionaryViewProps {
  foodItems: FoodItemType[];
  onAddNewFood?: (item: FoodItemType) => void;
}

export const DictionaryView: React.FC<DictionaryViewProps> = ({
  foodItems,
  onAddNewFood,
}) => {
  const [filter, setFilter] = useState<string>("all");
  const [showAddModal, setShowAddModal] = useState(false);

  // New item form state
  const [newName, setNewName] = useState("");
  const [newPhonics, setNewPhonics] = useState("");
  const [newSentence, setNewSentence] = useState("");
  const [newCategory, setNewCategory] = useState("meal");
  const [newMeal, setNewMeal] = useState("lunch");
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const filteredFoods = foodItems.filter((f) => {
    if (filter === "all") return true;
    if (filter === "book") return f.isFromBook;
    if (filter === "fruit") return f.category === "fruit";
    if (filter === "vegetable") return f.category === "vegetable";
    if (filter === "meal") return f.category === "meal";
    if (filter === "dessert") return f.category === "dessert" || f.suitableMeals.includes("dessert");
    if (filter === "breakfast") return f.suitableMeals.includes("breakfast");
    if (filter === "lunch-dinner")
      return f.suitableMeals.includes("lunch") || f.suitableMeals.includes("dinner");
    return true;
  });

  const handlePlayFood = (food: FoodItemType) => {
    soundManager.playPop();
    soundManager.speak(`${food.displayName}. ${food.sentence}`);
  };

  // Upload to Cloudflare R2
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    soundManager.playChime();

    try {
      // 1. Get presigned R2 upload URL
      const presignedRes = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type,
        }),
      });
      const { uploadUrl, fileUrl } = await presignedRes.json();

      // 2. Upload file directly to R2
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

  const handleSaveFood = async () => {
    if (!newName.trim() || !newSentence.trim()) {
      soundManager.speak("Please enter a food name and a sentence!");
      return;
    }

    const id = newName.toLowerCase().replace(/\s+/g, "-");
    const itemData: FoodItemType = {
      id,
      name: newName.toLowerCase(),
      displayName: newName.charAt(0).toUpperCase() + newName.slice(1),
      phonics: newPhonics || newName.toLowerCase(),
      category: newCategory,
      suitableMeals: [newMeal as "breakfast" | "lunch" | "dinner" | "dessert"],
      source: "Custom Lesson",
      isFromBook: false,
      sentence: newSentence,
      imageUrl: uploadedUrl || undefined,
    };

    try {
      const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemData),
      });
      const data = await res.json();
      if (data.item && onAddNewFood) {
        onAddNewFood(data.item);
      }
      soundManager.playSuccessFanfare();
      soundManager.speak(`Great! Added ${itemData.displayName} to your dictionary!`);
      setShowAddModal(false);
      setNewName("");
      setNewPhonics("");
      setNewSentence("");
      setUploadedUrl(null);
    } catch {
      soundManager.playError();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Filter Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {[
            { id: "all", label: `All Foods (${foodItems.length})` },
            {
              id: "book",
              label: `In Starters Book (${foodItems.filter((f) => f.isFromBook).length})`,
            },
            {
              id: "fruit",
              label: `Fruit (${foodItems.filter((f) => f.category === "fruit").length})`,
            },
            {
              id: "vegetable",
              label: `Vegetables (${foodItems.filter((f) => f.category === "vegetable").length})`,
            },
            {
              id: "meal",
              label: `Meals (${foodItems.filter((f) => f.category === "meal").length})`,
            },
            {
              id: "dessert",
              label: `Desserts (${
                foodItems.filter(
                  (f) => f.category === "dessert" || f.suitableMeals.includes("dessert")
                ).length
              })`,
            },
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={filter === tab.id ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setFilter(tab.id);
                soundManager.playPop();
              }}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Add Custom Food (R2 + Neon DB) */}
        <Button
          variant="candy"
          size="sm"
          onClick={() => {
            setShowAddModal(true);
            soundManager.playPop();
          }}
          className="shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Custom Word (R2)</span>
        </Button>
      </div>

      {/* Grid of Talking Food Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredFoods.map((food) => (
          <Card
            key={food.id}
            onClick={() => handlePlayFood(food)}
            className="p-4 cursor-pointer hover:border-purple-400/80 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg group flex flex-col justify-between bg-white border-slate-200/90 shadow-xs"
          >
            <div>
              <div className="w-full h-28 flex items-center justify-center mb-3">
                {food.imageUrl ? (
                  <img
                    src={food.imageUrl}
                    alt={food.displayName}
                    className="max-h-full max-w-full object-contain rounded-lg"
                  />
                ) : (
                  <div
                    className="w-24 h-24"
                    dangerouslySetInnerHTML={{ __html: food.svg || "" }}
                  />
                )}
              </div>

              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                  {food.displayName}
                </h4>
                <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:text-purple-600 group-hover:bg-purple-100 transition-colors">
                  <Volume2 className="w-4 h-4" />
                </div>
              </div>

              <p className="text-xs font-bold text-rose-500 mt-0.5 tracking-wider">
                {food.phonics}
              </p>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-100">
              <p className="text-xs text-slate-600 italic line-clamp-2 font-medium">
                &ldquo;{food.sentence}&rdquo;
              </p>
              {food.source && (
                <span className="inline-block mt-2 text-[10px] text-slate-400 font-semibold">
                  Source: {food.source}
                </span>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Modal: Add Custom Food with Cloudflare R2 Upload */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="max-w-md bg-white border-slate-200 text-slate-800">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-slate-900">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>Add Vocabulary Word (Cloudflare R2 + Neon)</span>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="foodName">Food Name</Label>
              <Input
                id="foodName"
                placeholder="e.g. Strawberry"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="phonics">Phonics Syllables</Label>
              <Input
                id="phonics"
                placeholder="e.g. straw · ber · ry"
                value={newPhonics}
                onChange={(e) => setNewPhonics(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="sentence">Example Sentence</Label>
              <Input
                id="sentence"
                placeholder="e.g. A sweet red strawberry for dessert!"
                value={newSentence}
                onChange={(e) => setNewSentence(e.target.value)}
              />
            </div>

            {/* Cloudflare R2 Upload */}
            <div className="space-y-1.5">
              <Label htmlFor="file">Upload Food Image to Cloudflare R2</Label>
              <Input
                id="file"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="text-xs"
              />
              {uploading && (
                <p className="text-[11px] text-amber-600 font-semibold">Uploading to Cloudflare R2...</p>
              )}
              {uploadedUrl && (
                <p className="text-[11px] text-emerald-600 font-semibold">✓ Image linked in R2</p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAddModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleSaveFood}
            >
              Save to Neon Postgres
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
