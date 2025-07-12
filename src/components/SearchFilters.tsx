import { useState } from "react";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SearchFiltersProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: {
    skill?: string;
    availability?: string;
    rating?: string;
  }) => void;
}

const popularSkills = [
  "JavaScript", "Python", "React", "Design", "Photography", "Marketing",
  "Writing", "Teaching", "Music", "Cooking", "Fitness", "Language"
];

export function SearchFilters({ onSearch, onFilterChange }: SearchFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<string>("");
  const [availability, setAvailability] = useState<string>("");
  const [rating, setRating] = useState<string>("");

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  const handleFilterUpdate = (newFilters: any) => {
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    setSelectedSkill("");
    setAvailability("");
    setRating("");
    handleFilterUpdate({});
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search by skill, name, or location..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 bg-card border-border/50 focus:border-primary/50"
        />
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowFilters(!showFilters)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
        >
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </div>

      {/* Popular Skills Quick Tags */}
      <div>
        <h3 className="text-sm font-medium text-foreground mb-2">Popular Skills</h3>
        <div className="flex flex-wrap gap-2">
          {popularSkills.map((skill) => (
            <Badge
              key={skill}
              variant="outline"
              className={`cursor-pointer transition-all hover:bg-primary/20 hover:border-primary/40 ${
                selectedSkill === skill 
                  ? "bg-primary/20 border-primary/40 text-primary" 
                  : "bg-muted text-muted-foreground border-border"
              }`}
              onClick={() => {
                const newSkill = selectedSkill === skill ? "" : skill;
                setSelectedSkill(newSkill);
                handleFilterUpdate({ skill: newSkill, availability, rating });
              }}
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <Card className="bg-gradient-card border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-foreground">Filters</h3>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear all
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-2 block">
                  Availability
                </label>
                <Select value={availability} onValueChange={(value) => {
                  setAvailability(value);
                  handleFilterUpdate({ skill: selectedSkill, availability: value, rating });
                }}>
                  <SelectTrigger className="bg-card border-border/50">
                    <SelectValue placeholder="Any time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any time</SelectItem>
                    <SelectItem value="weekends">Weekends</SelectItem>
                    <SelectItem value="evenings">Evenings</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground mb-2 block">
                  Minimum Rating
                </label>
                <Select value={rating} onValueChange={(value) => {
                  setRating(value);
                  handleFilterUpdate({ skill: selectedSkill, availability, rating: value });
                }}>
                  <SelectTrigger className="bg-card border-border/50">
                    <SelectValue placeholder="Any rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any rating</SelectItem>
                    <SelectItem value="4">4+ stars</SelectItem>
                    <SelectItem value="3">3+ stars</SelectItem>
                    <SelectItem value="2">2+ stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground mb-2 block">
                  Sort by
                </label>
                <Select defaultValue="rating">
                  <SelectTrigger className="bg-card border-border/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest rated</SelectItem>
                    <SelectItem value="recent">Recently active</SelectItem>
                    <SelectItem value="location">Nearest first</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}