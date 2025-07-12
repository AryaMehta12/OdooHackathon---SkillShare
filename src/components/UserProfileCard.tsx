import { Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SkillTag } from "./SkillTag";
import { cn } from "@/lib/utils";

interface UserProfileCardProps {
  user: {
    id: string;
    name: string;
    location?: string;
    avatar?: string;
    rating: number;
    skillsOffered: string[];
    skillsWanted: string[];
    availability?: string;
    bio?: string;
  };
  onRequestSwap?: (userId: string) => void;
  className?: string;
}

export function UserProfileCard({ user, onRequestSwap, className }: UserProfileCardProps) {
  const initials = user.name
    .split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Card className={cn(
      "bg-gradient-card border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-card group overflow-hidden",
      className
    )}>
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header with Avatar and Request Button */}
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16 border-2 border-border/30 group-hover:border-primary/30 transition-colors shrink-0">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-gradient-surface text-foreground font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="font-semibold text-lg text-foreground truncate">
                    {user.name}
                  </h3>
                  {user.location && (
                    <div className="flex items-center gap-1 text-muted-foreground text-sm">
                      <MapPin className="h-3 w-3 shrink-0" />
                      <span className="truncate">{user.location}</span>
                    </div>
                  )}
                </div>
                <Button 
                  variant="premium" 
                  size="sm"
                  onClick={() => onRequestSwap?.(user.id)}
                  className="shrink-0"
                >
                  Request
                </Button>
              </div>
            </div>
          </div>

          {/* Rating and Availability */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium text-foreground">
                {user.rating.toFixed(1)}
              </span>
            </div>
            {user.availability && (
              <span className="text-xs text-muted-foreground px-3 py-1 bg-muted/50 rounded-full">
                {user.availability}
              </span>
            )}
          </div>

          {/* Bio */}
          {user.bio && (
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
              {user.bio}
            </p>
          )}
          
          {/* Skills */}
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium text-primary mb-2 block">
                Skills Offered
              </span>
              <div className="flex flex-wrap gap-1">
                {user.skillsOffered.map((skill) => (
                  <SkillTag key={skill} skill={skill} variant="offered" />
                ))}
              </div>
            </div>
            
            <div>
              <span className="text-sm font-medium text-orange-400 mb-2 block">
                Skills Wanted
              </span>
              <div className="flex flex-wrap gap-1">
                {user.skillsWanted.map((skill) => (
                  <SkillTag key={skill} skill={skill} variant="wanted" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}