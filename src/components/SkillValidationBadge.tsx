import { Badge } from "@/components/ui/badge";
import { CheckCircle, Users, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface SkillValidationBadgeProps {
  type: "peer-endorsed" | "verified" | "certified";
  count?: number;
  className?: string;
}

export function SkillValidationBadge({ type, count, className }: SkillValidationBadgeProps) {
  const variants = {
    "peer-endorsed": {
      icon: Users,
      text: count ? `${count} endorsements` : "Peer endorsed",
      className: "bg-blue-500/15 text-blue-400 border-blue-500/30 hover:bg-blue-500/25"
    },
    "verified": {
      icon: CheckCircle,
      text: "Verified",
      className: "bg-green-500/15 text-green-400 border-green-500/30 hover:bg-green-500/25"
    },
    "certified": {
      icon: Award,
      text: "Certified",
      className: "bg-purple-500/15 text-purple-400 border-purple-500/30 hover:bg-purple-500/25"
    }
  };

  const variant = variants[type];
  const Icon = variant.icon;

  return (
    <Badge 
      variant="outline" 
      className={cn(
        "rounded-full px-2 py-1 text-xs font-medium transition-all duration-200",
        variant.className,
        className
      )}
    >
      <Icon className="h-3 w-3 mr-1" />
      {variant.text}
    </Badge>
  );
}