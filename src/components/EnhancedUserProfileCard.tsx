import { Star, MapPin, Github, Linkedin, Globe, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SkillsSection } from "./SkillsSection";
import { PortfolioSection } from "./PortfolioSection";
import { cn } from "@/lib/utils";

interface Skill {
  name: string;
  validation?: {
    type: "peer-endorsed" | "verified" | "certified";
    count?: number;
  };
}

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  link?: string;
  type: "project" | "video" | "design" | "code";
  skills: string[];
}

interface SocialLink {
  type: "github" | "linkedin" | "portfolio";
  url: string;
}

interface EnhancedUserProfileCardProps {
  user: {
    id: string;
    name: string;
    location?: string;
    avatar?: string;
    rating: number;
    skillsOffered: Skill[];
    skillsWanted: Skill[];
    availability?: string;
    bio?: string;
    portfolio?: PortfolioItem[];
    socialLinks?: SocialLink[];
  };
  onRequestSwap?: (userId: string) => void;
  className?: string;
}

export function EnhancedUserProfileCard({ user, onRequestSwap, className }: EnhancedUserProfileCardProps) {
  const initials = user.name
    .split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const getSocialIcon = (type: string) => {
    switch (type) {
      case "github":
        return <Github className="h-4 w-4" />;
      case "linkedin":
        return <Linkedin className="h-4 w-4" />;
      case "portfolio":
        return <Globe className="h-4 w-4" />;
      default:
        return <ExternalLink className="h-4 w-4" />;
    }
  };

  return (
    <Card className={cn(
      "bg-card border-border hover:border-primary/20 transition-all duration-300 hover:shadow-lg group overflow-hidden",
      className
    )}>
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header with Avatar and Request Button */}
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16 border-2 border-border/30 group-hover:border-primary/30 transition-colors shrink-0">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-muted text-foreground font-semibold">
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
                  variant="default" 
                  size="sm"
                  onClick={() => onRequestSwap?.(user.id)}
                  className="shrink-0"
                >
                  Request
                </Button>
              </div>
            </div>
          </div>

          {/* Rating, Availability, and Social Links */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
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

            {/* Social Links */}
            {user.socialLinks && user.socialLinks.length > 0 && (
              <div className="flex items-center gap-1">
                {user.socialLinks.map((link, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    asChild
                  >
                    <a 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label={`View ${user.name}'s ${link.type}`}
                    >
                      {getSocialIcon(link.type)}
                    </a>
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* Bio */}
          {user.bio && (
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
              {user.bio}
            </p>
          )}

          {/* Portfolio Section */}
          {user.portfolio && user.portfolio.length > 0 && (
            <PortfolioSection 
              items={user.portfolio} 
              maxItems={2}
              collapsible={true}
            />
          )}
          
          {/* Skills */}
          <div className="space-y-3">
            <SkillsSection
              title="Skills Offered"
              skills={user.skillsOffered}
              variant="offered"
            />
            
            <SkillsSection
              title="Skills Wanted"
              skills={user.skillsWanted}
              variant="wanted"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}