import { useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink, Github, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  link?: string;
  type: "project" | "video" | "design" | "code";
  skills: string[];
}

interface PortfolioSectionProps {
  items: PortfolioItem[];
  className?: string;
  maxItems?: number;
  collapsible?: boolean;
}

export function PortfolioSection({ 
  items, 
  className, 
  maxItems = 3, 
  collapsible = true 
}: PortfolioSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const displayItems = isExpanded ? items : items.slice(0, maxItems);
  const hasMore = items.length > maxItems;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "code":
        return <Github className="h-4 w-4" />;
      case "video":
        return <span className="text-sm">🎬</span>;
      case "design":
        return <span className="text-sm">🎨</span>;
      default:
        return <Globe className="h-4 w-4" />;
    }
  };

  if (items.length === 0) return null;

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-foreground">Portfolio & Work</h4>
        {collapsible && hasMore && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-auto p-1 text-xs text-muted-foreground hover:text-foreground"
          >
            {isExpanded ? (
              <>
                Show less <ChevronUp className="h-3 w-3 ml-1" />
              </>
            ) : (
              <>
                Show all ({items.length}) <ChevronDown className="h-3 w-3 ml-1" />
              </>
            )}
          </Button>
        )}
      </div>

      <div className="space-y-2">
        {displayItems.map((item) => (
          <Card 
            key={item.id} 
            className="bg-muted/30 border-border/50 hover:bg-muted/50 transition-colors"
          >
            <CardContent className="p-3">
              <div className="flex items-start gap-3">
                {item.thumbnail ? (
                  <div className="w-12 h-12 rounded-lg bg-muted border border-border/50 flex-shrink-0 overflow-hidden">
                    <img 
                      src={item.thumbnail} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-muted border border-border/50 flex-shrink-0 flex items-center justify-center">
                    {getTypeIcon(item.type)}
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h5 className="text-sm font-medium text-foreground truncate">
                        {item.title}
                      </h5>
                      <p className="text-xs text-muted-foreground line-clamp-1 mt-1">
                        {item.description}
                      </p>
                    </div>
                    {item.link && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 flex-shrink-0"
                        asChild
                      >
                        <a 
                          href={item.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          aria-label={`View ${item.title}`}
                        >
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </Button>
                    )}
                  </div>

                  {item.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {item.skills.slice(0, 2).map((skill) => (
                        <Badge 
                          key={skill} 
                          variant="outline"
                          className="text-xs py-0 px-1.5 h-5 bg-background/50 border-border/50"
                        >
                          {skill}
                        </Badge>
                      ))}
                      {item.skills.length > 2 && (
                        <Badge 
                          variant="outline"
                          className="text-xs py-0 px-1.5 h-5 bg-background/50 border-border/50"
                        >
                          +{item.skills.length - 2}
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}