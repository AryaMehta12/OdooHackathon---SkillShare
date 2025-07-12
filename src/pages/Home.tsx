import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { SearchFilters } from "@/components/SearchFilters";
import { EnhancedUserProfileCard } from "@/components/EnhancedUserProfileCard";
import { DetailedUserProfileModal } from "@/components/DetailedUserProfileModal";
import { useToast } from "@/hooks/use-toast";

// Enhanced mock data with portfolio and validation
const mockUsers = [
  {
    id: "1",
    name: "Marc Demo",
    location: "San Francisco, CA",
    timezone: "PST (UTC-8)",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rating: 3.4,
    skillsOffered: [
      { name: "JavaScript", validation: { type: "peer-endorsed" as const, count: 12 } },
      { name: "Python", validation: { type: "verified" as const } }
    ],
    skillsWanted: [
      { name: "Photoshop" },
      { name: "Graphic Design", validation: { type: "peer-endorsed" as const, count: 3 } }
    ],
    availability: "weekends",
    bio: "Full-stack developer with a passion for clean code and user experience. I love teaching JavaScript fundamentals and building web applications.",
    portfolio: [
      {
        id: "p1",
        title: "E-commerce Platform",
        description: "Built with React and Node.js, serving 10k+ users",
        thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop",
        link: "https://github.com/demo",
        type: "project" as const,
        skills: ["React", "Node.js", "MongoDB"]
      },
      {
        id: "p2",
        title: "JavaScript Tutorial Series",
        description: "Educational content for beginners",
        type: "video" as const,
        skills: ["JavaScript", "Teaching"]
      }
    ],
    socialLinks: [
      { type: "github" as const, url: "https://github.com/marcdemo" },
      { type: "portfolio" as const, url: "https://marcdemo.dev" }
    ]
  },
  {
    id: "2", 
    name: "Michell",
    location: "New York, NY",
    timezone: "EST (UTC-5)",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612345d?w=150&h=150&fit=crop&crop=face",
    rating: 2.5,
    skillsOffered: [
      { name: "JavaScript" },
      { name: "Python", validation: { type: "certified" as const } }
    ],
    skillsWanted: [
      { name: "Photoshop" },
      { name: "Graphic Design" }
    ],
    availability: "evenings",
    bio: "Backend engineer specializing in Python and API development. Always eager to learn creative skills and expand my design knowledge.",
    socialLinks: [
      { type: "github" as const, url: "https://github.com/michell" }
    ]
  },
  {
    id: "3",
    name: "Joe Wills", 
    location: "Austin, TX",
    timezone: "CST (UTC-6)",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 4.0,
    skillsOffered: [
      { name: "JavaScript", validation: { type: "peer-endorsed" as const, count: 8 } },
      { name: "Python" }
    ],
    skillsWanted: [
      { name: "Photoshop" },
      { name: "Graphic Design" }
    ],
    availability: "flexible",
    bio: "Software consultant who enjoys mentoring others. I believe in learning through practical projects and collaborative problem-solving."
  },
  {
    id: "4",
    name: "Sarah Chen",
    location: "Seattle, WA", 
    timezone: "PST (UTC-8)",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    rating: 4.8,
    skillsOffered: [
      { name: "React", validation: { type: "verified" as const } },
      { name: "Design", validation: { type: "peer-endorsed" as const, count: 24 } },
      { name: "UI/UX", validation: { type: "certified" as const } }
    ],
    skillsWanted: [
      { name: "Photography" },
      { name: "Marketing" }
    ],
    availability: "weekends",
    bio: "Senior product designer with 7+ years in tech. I love creating intuitive interfaces and would love to learn photography for better visual storytelling.",
    portfolio: [
      {
        id: "p3",
        title: "Mobile Banking App",
        description: "Award-winning fintech interface design",
        thumbnail: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=100&h=100&fit=crop",
        type: "design" as const,
        skills: ["UI/UX", "Mobile Design"]
      },
      {
        id: "p4",
        title: "Design System",
        description: "Comprehensive component library",
        type: "design" as const,
        skills: ["Design Systems", "React"]
      },
      {
        id: "p5",
        title: "User Research Case Study",
        description: "Complete UX methodology documentation",
        type: "project" as const,
        skills: ["User Research", "UX"]
      }
    ],
    socialLinks: [
      { type: "portfolio" as const, url: "https://sarahchen.design" },
      { type: "linkedin" as const, url: "https://linkedin.com/in/sarahchen" }
    ]
  }
];

export default function Home() {
  const [filteredUsers, setFilteredUsers] = useState(mockUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredUsers(mockUsers);
      return;
    }

    const filtered = mockUsers.filter(user => 
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.location?.toLowerCase().includes(query.toLowerCase()) ||
      user.skillsOffered.some(skill => skill.name.toLowerCase().includes(query.toLowerCase())) ||
      user.skillsWanted.some(skill => skill.name.toLowerCase().includes(query.toLowerCase()))
    );
    setFilteredUsers(filtered);
  };

  const handleFilterChange = (filters: any) => {
    let filtered = [...mockUsers];

    if (filters.skill) {
      filtered = filtered.filter(user =>
        user.skillsOffered.some(skill => skill.name.toLowerCase().includes(filters.skill.toLowerCase())) ||
        user.skillsWanted.some(skill => skill.name.toLowerCase().includes(filters.skill.toLowerCase()))
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

  const handleConnectClick = (userId: string) => {
    const user = mockUsers.find(u => u.id === userId);
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleRequestSwap = (userId: string) => {
    const user = mockUsers.find(u => u.id === userId);
    toast({
      title: "Swap Request Sent",
      description: `Your request has been sent to ${user?.name}. They'll be notified and can respond in their requests tab.`,
    });
    setIsModalOpen(false);
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
                <EnhancedUserProfileCard
                  key={user.id}
                  user={user}
                  onConnectClick={handleConnectClick}
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

        {/* Detailed User Profile Modal */}
        <DetailedUserProfileModal
          user={selectedUser}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onRequestSwap={handleRequestSwap}
        />
      </main>
    </div>
  );
}