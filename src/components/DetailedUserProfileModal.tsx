import { MessageSquare, MapPin, Clock, ExternalLink, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { SkillsSection } from "./SkillsSection";
import { PortfolioSection } from "./PortfolioSection";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

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

interface User {
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
}

interface DetailedUserProfileModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onRequestSwap?: (userId: string) => void;
}

export function DetailedUserProfileModal({ 
  user, 
  isOpen, 
  onClose, 
  onRequestSwap 
}: DetailedUserProfileModalProps) {
  const { isLoggedIn } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  if (!user) return null;

  const initials = user.name
    .split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const getSocialIcon = (type: string) => {
    switch (type) {
      case "github":
        return <span className="text-sm">🔗</span>;
      case "linkedin":
        return <span className="text-sm">💼</span>;
      case "portfolio":
        return <span className="text-sm">🌐</span>;
      default:
        return <ExternalLink className="h-4 w-4" />;
    }
  };

  const handleMessage = () => {
    if (!isLoggedIn) {
      toast({
        title: "Login Required",
        description: "Please log in to send messages.",
      });
      navigate("/login");
      return;
    }

    toast({
      title: "Message Sent",
      description: `Your message has been sent to ${user.name}.`,
    });
  };

  const handleRequestSwap = () => {
    if (!isLoggedIn) {
      toast({
        title: "Login Required",
        description: "Please log in to request skill swaps.",
      });
      navigate("/login");
      return;
    }

    onRequestSwap?.(user.id);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-card border-border/50">
        <DialogHeader>
          <DialogTitle className="sr-only">User Profile Details</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>

        <div className="space-y-6 pt-2">
          {/* Header with Avatar and Basic Info */}
          <div className="flex items-start gap-4">
            <Avatar className="h-20 w-20 border-2 border-border/30 shrink-0">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-muted text-foreground font-semibold text-lg">
                {initials}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold text-foreground mb-2">{user.name}</h2>
              
              <div className="space-y-2">
                {user.location && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4 shrink-0" />
                    <span className="text-sm">{user.location}</span>
                  </div>
                )}
                
                {user.timezone && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4 shrink-0" />
                    <span className="text-sm">{user.timezone}</span>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">⭐</span>
                    <span className="text-sm font-medium text-foreground">
                      {user.rating.toFixed(1)}
                    </span>
                  </div>
                  {user.availability && (
                    <span className="text-xs text-muted-foreground px-2 py-1 bg-muted/50 rounded-full">
                      {user.availability}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          {user.socialLinks && user.socialLinks.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground">Links:</span>
              {user.socialLinks.map((link, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="h-8 px-3"
                  asChild
                >
                  <a 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    {getSocialIcon(link.type)}
                    <span className="capitalize">{link.type}</span>
                  </a>
                </Button>
              ))}
            </div>
          )}

          {/* Bio */}
          {user.bio && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">About</h3>
              <p className="text-muted-foreground leading-relaxed">{user.bio}</p>
            </div>
          )}

          {/* Portfolio Section */}
          {user.portfolio && user.portfolio.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Portfolio & Work</h3>
              <PortfolioSection 
                items={user.portfolio} 
                maxItems={10}
                collapsible={false}
              />
            </div>
          )}
          
          {/* Skills */}
          <div className="space-y-4">
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

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-border/50">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={handleMessage}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Message
            </Button>
            <Button 
              variant="default" 
              className="flex-1"
              onClick={handleRequestSwap}
            >
              Request Swap
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}