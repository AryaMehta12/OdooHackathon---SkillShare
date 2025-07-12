import { Star, MapPin, Github, Linkedin, Globe, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SkillTag } from "./SkillTag";
import { cn } from "@/lib/utils";
import { MessageSquare } from "lucide-react";


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
    timezone?: string;
    avatar?: string;
    rating: number;
    skillsOffered: Skill[];
    skillsWanted: Skill[];
    availability?: string;
    bio?: string;
    portfolio?: PortfolioItem[];
    socialLinks?: SocialLink[];
  };
  onConnectClick?: (userId: string) => void;
  className?: string;
}

export function EnhancedUserProfileCard({
  user,
  onConnectClick,
  className,
}: EnhancedUserProfileCardProps) {
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
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
    <Card
      className={cn(
        "bg-card border-border hover:border-primary/20 transition-all duration-300 hover:shadow-md group cursor-pointer",
        "w-[370px] max-w-full", // Adjust width as needed
        className
      )}
    >
      <CardContent className="p-4 space-y-4">
        {/* Top: Avatar, Name, Location, Rating, Availability */}
        <div className="flex justify-between items-start gap-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border border-border">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-muted text-foreground font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-base text-foreground leading-tight">
                {user.name}
              </h3>
              {user.location && (
                <div className="flex items-center gap-1 text-muted-foreground text-sm">
                  <MapPin className="h-3 w-3" />
                  {user.location}
                </div>
              )}
            </div>
          </div>
          <div className="text-right space-y-1">
            <div className="flex items-center gap-1 justify-end">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium text-foreground">{user.rating.toFixed(1)}</span>
            </div>
            {user.availability && (
              <div className="text-xs text-muted-foreground leading-tight">
                <span className="block font-medium text-primary">Available</span>
                {user.availability}
              </div>
            )}
          </div>
        </div>

        {/* Bio */}
        {user.bio && (
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {user.bio}
          </p>
        )}

        {/* Skills Offered & Wanted */}
        <div className="space-y-2">
          <div className="flex flex-wrap gap-1 items-center">
            <span className="text-sm font-medium text-primary mr-1">Skills:</span>
            {user.skillsOffered.slice(0, 3).map((skill) => (
              <SkillTag key={skill.name} skill={skill.name} variant="offered" />
            ))}
            {user.skillsOffered.length > 3 && (
              <span className="text-xs text-muted-foreground px-2 py-0.5 bg-muted/50 rounded-full">
                +{user.skillsOffered.length - 3} more
              </span>
            )}
          </div>
          {user.skillsWanted.length > 0 && (
            <div className="flex flex-wrap gap-1 items-center">
              <span className="text-sm font-medium text-primary mr-1">Looking for:</span>
              {user.skillsWanted.slice(0, 3).map((skill) => (
                <SkillTag key={skill.name} skill={skill.name} variant="wanted" />
              ))}
              {user.skillsWanted.length > 3 && (
                <span className="text-xs text-muted-foreground px-2 py-0.5 bg-muted/50 rounded-full">
                  +{user.skillsWanted.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>

        {/* Social Links & Connect Button */}
        {(user.socialLinks?.length > 0 || onConnectClick) && (
          <div className="flex justify-between items-center mt-5">
            <div className="flex gap-2">
              {user.socialLinks?.map((link, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  asChild
                  onClick={(e) => e.stopPropagation()}
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
            <Button
              size="sm"
              className ="bg-gradient-to-r from-indigo-500 to-red-500
    text-white font-semibold
    rounded-full
    shadow-lg
    px-7 py-3
    transition-all duration-200
    hover:scale-105 hover:shadow-xl
    focus:ring-2 focus:ring-blue-400
    flex items-center gap-2"
              onClick={(e) => {
                e.stopPropagation();
                onConnectClick?.(user.id);
              }}              
            >
              Connect
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
