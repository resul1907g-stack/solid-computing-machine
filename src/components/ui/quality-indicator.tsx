import { cn } from "@/lib/utils";

interface QualityIndicatorProps {
  result: "GREEN" | "YELLOW" | "RED";
  score?: number;
  size?: "sm" | "md" | "lg";
  showScore?: boolean;
}

export function QualityIndicator({
  result,
  score,
  size = "md",
  showScore = true,
}: QualityIndicatorProps) {
  const bgColor = {
    GREEN: "bg-emerald-500",
    YELLOW: "bg-amber-400",
    RED: "bg-red-500",
  }[result];

  const sizeClasses = {
    sm: "h-6 w-6 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-16 w-16 text-lg",
  }[size];

  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center text-white font-bold",
        bgColor,
        sizeClasses
      )}
    >
      {showScore && score !== undefined ? `${Math.round(score)}%` : ""}
    </div>
  );
}
