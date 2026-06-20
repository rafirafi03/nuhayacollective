"use client";

import Image, { type ImageProps } from "next/image";
import { useState, useEffect } from "react";
import { PRODUCT_IMAGE_FALLBACK } from "@/lib/images";
import { cn } from "@/lib/utils";

interface SafeImageProps extends Omit<ImageProps, "src" | "onError"> {
  src?: string | null;
  fallback?: string;
}

/** Image with automatic fallback when the remote URL fails (404, etc.) */
export function SafeImage({
  src,
  fallback = PRODUCT_IMAGE_FALLBACK,
  alt,
  className,
  ...props
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src || fallback);

  useEffect(() => {
    setImgSrc(src || fallback);
  }, [src, fallback]);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      className={cn(className)}
      onError={() => {
        if (imgSrc !== fallback) setImgSrc(fallback);
      }}
    />
  );
}
