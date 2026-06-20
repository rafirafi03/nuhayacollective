"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InstagramReelCard } from "@/components/shared/instagram-reel-card";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/constants";
import type { InstagramReel } from "@/types";
import { cn } from "@/lib/utils";

interface StoryReelPlayerProps {
  reel: InstagramReel;
  className?: string;
}

export function StoryReelPlayer({ reel, className }: StoryReelPlayerProps) {
  return (
    <div className={cn("flex flex-col items-center lg:items-stretch", className)}>
      <InstagramReelCard reel={reel} index={0} variant="grid" className="w-full max-w-[300px] mx-auto" />

      <Button
        variant="outline"
        className="mt-5 w-full rounded-full border-border hover:border-foreground/40"
        asChild
      >
        <Link href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" className="h-4 w-4 mr-2 fill-current" aria-hidden>
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" />
          </svg>
          Follow @{INSTAGRAM_HANDLE}
          <ExternalLink className="h-3.5 w-3.5 ml-2 opacity-50" />
        </Link>
      </Button>
    </div>
  );
}
