import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SkillTagProps {
  skill: string;
  variant?: "offered" | "wanted" | "default";
  className?: string;
}

export function SkillTag({ skill, variant = "default", className }: SkillTagProps) {
  const variantStyles = {
    offered: "bg-primary/20 text-primary border-primary/40 hover:bg-primary/30",
    wanted: "bg-orange-500/20 text-orange-400 border-orange-500/40 hover:bg-orange-500/30",
    default: "bg-muted text-muted-foreground border-border hover:bg-muted/80"
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