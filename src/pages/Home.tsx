import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { SearchFilters } from "@/components/SearchFilters";
import { UserProfileCard } from "@/components/UserProfileCard";
import { useToast } from "@/hooks/use-toast";

// Mock data
const mockUsers = [
  {
    id: "1",
    name: "Marc Demo",
    location: "San Francisco, CA",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rating: 3.4,
    skillsOffered: ["Java Script", "Python"],
    skillsWanted: ["Photoshop", "Graphic designer"],
    availability: "weekends",
    bio: "Full-stack developer with a passion for clean code and user experience. I love teaching JavaScript fundamentals and building web applications."
  },
  {
    id: "2", 
    name: "Michell",
    location: "New York, NY",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612345d?w=150&h=150&fit=crop&crop=face",
    rating: 2.5,
    skillsOffered: ["Java Script", "Python"],
    skillsWanted: ["Photoshop", "Graphic designer"],
    availability: "evenings",
    bio: "Backend engineer specializing in Python and API development. Always eager to learn creative skills and expand my design knowledge."
  },
  {
    id: "3",
    name: "Joe Wills", 
    location: "Austin, TX",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 4.0,
    skillsOffered: ["Java Script", "Python"],
    skillsWanted: ["Photoshop", "Graphic designer"],
    availability: "flexible",
    bio: "Software consultant who enjoys mentoring others. I believe in learning through practical projects and collaborative problem-solving."
  },
  {
    id: "4",
    name: "Sarah Chen",
    location: "Seattle, WA", 
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    rating: 4.8,
    skillsOffered: ["React", "Design", "UI/UX"],
    skillsWanted: ["Photography", "Marketing"],
    availability: "weekends",
    bio: "Senior product designer with 7+ years in tech. I love creating intuitive interfaces and would love to learn photography for better visual storytelling."
  },
  {
    id: "5",
    name: "Alex Rodriguez",
    location: "Los Angeles, CA",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face", 
    rating: 4.2,
    skillsOffered: ["Photography", "Video Editing"],
    skillsWanted: ["Web Development", "SEO"],
    availability: "evenings",
    bio: "Professional photographer and content creator. I specialize in portrait and event photography and want to build my own website to showcase my work."
  },
  {
    id: "6",
    name: "Emma Thompson",
    location: "Boston, MA",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    rating: 4.6,
    skillsOffered: ["Writing", "Content Strategy"],
    skillsWanted: ["Graphic Design", "Branding"],
    availability: "flexible",
    bio: "Content strategist and copywriter for tech startups. I help brands tell their stories and would love to learn design to create more compelling visual content."
  }
];

export default function Home() {
  const [filteredUsers, setFilteredUsers] = useState(mockUsers);
  const { toast } = useToast();

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredUsers(mockUsers);
      return;
    }

    const filtered = mockUsers.filter(user => 
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.location.toLowerCase().includes(query.toLowerCase()) ||
      user.skillsOffered.some(skill => skill.toLowerCase().includes(query.toLowerCase())) ||
      user.skillsWanted.some(skill => skill.toLowerCase().includes(query.toLowerCase()))
    );
    setFilteredUsers(filtered);
  };

  const handleFilterChange = (filters: any) => {
    let filtered = [...mockUsers];

    if (filters.skill) {
      filtered = filtered.filter(user =>
        user.skillsOffered.some(skill => skill.toLowerCase().includes(filters.skill.toLowerCase())) ||
        user.skillsWanted.some(skill => skill.toLowerCase().includes(filters.skill.toLowerCase()))
      );
    }

    if (filters.availability) {
      filtered = filtered.filter(user => user.availability === filters.availability);
    }

    if (filters.rating) {
      const minRating = parseFloat(filters.rating);
      filtered = filtered.filter(user => user.rating >= minRating);
    }

    setFilteredUsers(filtered);
  };

  const handleRequestSwap = (userId: string) => {
    const user = mockUsers.find(u => u.id === userId);
    toast({
      title: "Swap Request Sent",
      description: `Your request has been sent to ${user?.name}. They'll be notified and can respond in their requests tab.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-6 pb-20 md:pb-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Discover Skills, Share Knowledge
            </h1>
            <p className="text-muted-foreground text-lg">
              Connect with learners and experts in your community
            </p>
          </div>

          <SearchFilters 
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <UserProfileCard
                  key={user.id}
                  user={user}
                  onRequestSwap={handleRequestSwap}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No users found matching your criteria
                </p>
                <p className="text-muted-foreground text-sm mt-2">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5, 6, 7].map((page) => (
                <button
                  key={page}
                  className={`w-8 h-8 rounded-lg text-sm transition-all ${
                    page === 1 
                      ? "bg-gradient-primary text-primary-foreground shadow-glow" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}