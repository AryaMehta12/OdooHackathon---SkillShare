import { SkillTag } from "./SkillTag";
import { SkillValidationBadge } from "./SkillValidationBadge";
import { cn } from "@/lib/utils";

interface Skill {
  name: string;
  validation?: {
    type: "peer-endorsed" | "verified" | "certified";
    count?: number;
  };
}

interface SkillsSectionProps {
  title: string;
  skills: Skill[];
  variant: "offered" | "wanted";
  className?: string;
}

export function SkillsSection({ title, skills, variant, className }: SkillsSectionProps) {
  if (skills.length === 0) return null;

  return (
    <div className={cn("space-y-2", className)}>
      <span className={cn(
        "text-sm font-medium block",
        variant === "offered" ? "text-primary" : "text-amber-400"
      )}>
        {title}
      </span>
      <div className="space-y-2">
        {skills.map((skill) => (
          <div key={skill.name} className="flex items-center gap-2 flex-wrap">
            <SkillTag skill={skill.name} variant={variant} />
            {skill.validation && (
              <SkillValidationBadge 
                type={skill.validation.type}
                count={skill.validation.count}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}