import { useState } from "react";
import { Camera, Save, MapPin, Calendar } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

export default function Profile() {
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    location: "San Francisco, CA",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    skillsOffered: ["JavaScript", "React", "Node.js"],
    skillsWanted: ["Graphic Design", "Photography"],
    availability: "weekends",
    isPublic: true,
    bio: "Passionate full-stack developer with 5 years of experience. Love to teach and learn new technologies."
  });

  const [newSkillOffered, setNewSkillOffered] = useState("");
  const [newSkillWanted, setNewSkillWanted] = useState("");
  const { toast } = useToast();

  const addSkillOffered = () => {
    if (newSkillOffered.trim()) {
      setProfile(prev => ({
        ...prev,
        skillsOffered: [...prev.skillsOffered, newSkillOffered.trim()]
      }));
      setNewSkillOffered("");
    }
  };

  const addSkillWanted = () => {
    if (newSkillWanted.trim()) {
      setProfile(prev => ({
        ...prev,
        skillsWanted: [...prev.skillsWanted, newSkillWanted.trim()]
      }));
      setNewSkillWanted("");
    }
  };

  const removeSkillOffered = (skill: string) => {
    setProfile(prev => ({
      ...prev,
      skillsOffered: prev.skillsOffered.filter(s => s !== skill)
    }));
  };

  const removeSkillWanted = (skill: string) => {
    setProfile(prev => ({
      ...prev,
      skillsWanted: prev.skillsWanted.filter(s => s !== skill)
    }));
  };

  const handleSave = () => {
    toast({
      title: "Profile Updated",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleDiscard = () => {
    // Reset to original values
    toast({
      title: "Changes Discarded", 
      description: "Your profile has been reset to the last saved version.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-6 pb-20 md:pb-6">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Edit Profile
            </h1>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleDiscard}>
                Discard
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          </div>

          {/* Profile Picture & Basic Info */}
          <Card className="bg-gradient-card border-border/50">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="h-24 w-24 border-2 border-border">
                    <AvatarImage src={profile.avatar} alt={profile.name} />
                    <AvatarFallback className="bg-gradient-surface text-foreground font-semibold text-lg">
                      {profile.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">
                    <Camera className="h-4 w-4 mr-2" />
                    Change Photo
                  </Button>
                </div>

                <div className="flex-1 space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Full Name
                    </label>
                    <Input
                      value={profile.name}
                      onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                      className="bg-card border-border/50 focus:border-primary/50"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        value={profile.location}
                        onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                        className="pl-10 bg-card border-border/50 focus:border-primary/50"
                        placeholder="City, State"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Bio
                    </label>
                    <Textarea
                      value={profile.bio}
                      onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                      className="bg-card border-border/50 focus:border-primary/50 resize-none"
                      rows={3}
                      placeholder="Tell others about yourself..."
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills Offered */}
          <Card className="bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="text-primary">Skills I Can Teach</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {profile.skillsOffered.map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="bg-primary/20 text-primary border-primary/40 px-3 py-1"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkillOffered(skill)}
                      className="ml-2 text-primary/70 hover:text-primary"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  value={newSkillOffered}
                  onChange={(e) => setNewSkillOffered(e.target.value)}
                  placeholder="Add a skill you can teach..."
                  className="bg-card border-border/50 focus:border-primary/50"
                  onKeyPress={(e) => e.key === "Enter" && addSkillOffered()}
                />
                <Button onClick={addSkillOffered} variant="outline">
                  Add
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Skills Wanted */}
          <Card className="bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="text-orange-400">Skills I Want to Learn</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {profile.skillsWanted.map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="bg-orange-500/20 text-orange-400 border-orange-500/40 px-3 py-1"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkillWanted(skill)}
                      className="ml-2 text-orange-400/70 hover:text-orange-400"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  value={newSkillWanted}
                  onChange={(e) => setNewSkillWanted(e.target.value)}
                  placeholder="Add a skill you want to learn..."
                  className="bg-card border-border/50 focus:border-primary/50"
                  onKeyPress={(e) => e.key === "Enter" && addSkillWanted()}
                />
                <Button onClick={addSkillWanted} variant="outline">
                  Add
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Availability & Privacy */}
          <Card className="bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="text-foreground">Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Availability
                </label>
                <Select 
                  value={profile.availability} 
                  onValueChange={(value) => setProfile(prev => ({ ...prev, availability: value }))}
                >
                  <SelectTrigger className="bg-card border-border/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekends">Weekends</SelectItem>
                    <SelectItem value="evenings">Evenings</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                    <SelectItem value="business-hours">Business Hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-foreground">Public Profile</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Allow others to find and contact you
                  </p>
                </div>
                <Switch
                  checked={profile.isPublic}
                  onCheckedChange={(checked) => setProfile(prev => ({ ...prev, isPublic: checked }))}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}