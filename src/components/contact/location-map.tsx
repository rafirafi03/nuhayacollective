import { getGoogleMapsEmbedUrl } from "@/lib/maps";
import { cn } from "@/lib/utils";

interface LocationMapProps {
  address: string;
  className?: string;
}

export function LocationMap({ address, className }: LocationMapProps) {
  const embedUrl = getGoogleMapsEmbedUrl(address);

  return (
    <div className={cn("relative h-full w-full min-h-[inherit] bg-brand-oud", className)}>
      <iframe
        title={`Store location: ${address}`}
        src={embedUrl}
        className="absolute inset-0 h-full w-full border-0"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
