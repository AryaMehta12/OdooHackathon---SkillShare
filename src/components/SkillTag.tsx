import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SkillTagProps {
  skill: string;
  variant?: "offered" | "wanted" | "default";
  className?: string;
}

export function SkillTag({ skill, variant = "default", className }: SkillTagProps) {
  const variantStyles = {
    offered: "bg-primary/15 text-primary border-primary/30 hover:bg-primary/25 hover:border-primary/40",
    wanted: "bg-amber-500/15 text-amber-300 border-amber-500/30 hover:bg-amber-500/25 hover:border-amber-500/40",
    default: "bg-muted/50 text-muted-foreground border-border hover:bg-muted/70"
  };

  return (
    <Badge 
      variant="outline" 
      className={cn(
        "rounded-full px-3 py-1 text-xs font-medium transition-all duration-200 cursor-default",
        variantStyles[variant],
        className
      )}
    >
      {skill}
    </Badge>
  );
}