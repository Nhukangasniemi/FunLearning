"use client";

import React, { useState } from "react";
import { Sparkles, Bot, Cloud, Award, CreditCard } from "lucide-react";
import { soundManager } from "@/lib/audio";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ProModalProps {
  isOpen: boolean;
  onClose: () => void;
  isPro?: boolean;
}

export const ProModal: React.FC<ProModalProps> = ({ isOpen, onClose, isPro = false }) => {
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    setLoading(true);
    soundManager.playChime();

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      alert("Demo mode: Pro features activated!");
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg bg-white border-slate-200 text-slate-800 shadow-2xl">
        <DialogHeader className="text-center sm:text-center items-center">
          <div className="inline-flex p-3 rounded-2xl bg-linear-to-tr from-purple-600 to-rose-500 text-white shadow-lg shadow-purple-500/30 mb-2">
            <Sparkles className="w-8 h-8" />
          </div>
          <DialogTitle className="text-2xl font-black text-slate-900">
            Lily&apos;s English Adventure PRO
          </DialogTitle>
          <DialogDescription className="text-sm text-slate-600">
            Supercharge vocabulary learning with AI and custom cloud practice!
          </DialogDescription>
        </DialogHeader>

        {/* Feature List */}
        <Card className="p-4 bg-slate-50 border-slate-200 space-y-3 shadow-xs">
          {[
            {
              icon: <Bot className="w-5 h-5 text-purple-600" />,
              title: "OpenAI gpt-5-nano Storyteller",
              desc: "Personalized Cambridge Starters mini-stories for any meal choice.",
            },
            {
              icon: <Cloud className="w-5 h-5 text-teal-600" />,
              title: "Cloudflare R2 Image Uploads",
              desc: "Parents and teachers can upload real photos to custom dictionary cards.",
            },
            {
              icon: <Sparkles className="w-5 h-5 text-amber-500" />,
              title: "Interactive AI Phonics Riddles",
              desc: "Fun rhyming clues and spelling puzzles generated on demand.",
            },
            {
              icon: <Award className="w-5 h-5 text-rose-500" />,
              title: "Neon Postgres Progress Sync",
              desc: "Full progress and gold star tracking across all devices.",
            },
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="p-1.5 rounded-lg bg-white border border-slate-200 shadow-2xs shrink-0">{item.icon}</div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                <p className="text-[11px] text-slate-600 font-medium">{item.desc}</p>
              </div>
            </div>
          ))}
        </Card>

        {/* Pricing & CTA */}
        <div className="text-center space-y-3 pt-2">
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-3xl font-black text-slate-900">$4.99</span>
            <span className="text-xs text-slate-500 font-semibold">/ month</span>
          </div>

          <Button
            variant="pro"
            size="lg"
            onClick={handleUpgrade}
            disabled={loading || isPro}
            className="w-full flex items-center justify-center gap-2 shadow-lg"
          >
            <CreditCard className="w-4 h-4" />
            <span>
              {isPro
                ? "You are already a PRO Member ⭐"
                : loading
                ? "Redirecting to Stripe..."
                : "Upgrade with Stripe Checkout"}
            </span>
          </Button>

          <p className="text-[11px] text-slate-400">
            Powered securely by Stripe. Cancel anytime in one click.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
