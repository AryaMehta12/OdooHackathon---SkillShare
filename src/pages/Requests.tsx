import { useState } from "react";
import { Clock, CheckCircle, XCircle, MessageSquare, User } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SkillTag } from "@/components/SkillTag";
import { useToast } from "@/hooks/use-toast";

const mockRequests = {
  incoming: [
    {
      id: "1",
      from: {
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        rating: 4.8
      },
      skillOffered: "Photography",
      skillWanted: "React Development",
      message: "Hi! I'd love to learn React from you. I can teach you professional photography techniques in return.",
      timestamp: "2 hours ago",
      status: "pending"
    },
    {
      id: "2", 
      from: {
        name: "Mike Torres",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        rating: 4.2
      },
      skillOffered: "Guitar Lessons",
      skillWanted: "JavaScript Fundamentals", 
      message: "I see you know JavaScript well! I can teach you guitar in exchange for some coding lessons.",
      timestamp: "1 day ago",
      status: "pending"
    }
  ],
  outgoing: [
    {
      id: "3",
      to: {
        name: "Emma Thompson", 
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
        rating: 4.6
      },
      skillOffered: "Web Development",
      skillWanted: "Content Writing",
      message: "Hello Emma! I'd love to learn content writing from you. I can help you with web development projects.",
      timestamp: "3 hours ago",
      status: "pending"
    }
  ],
  active: [
    {
      id: "4",
      partner: {
        name: "Alex Rodriguez",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        rating: 4.2
      },
      yourSkill: "React Development",
      theirSkill: "Video Editing",
      startDate: "Jan 15, 2024",
      status: "active",
      progress: 60
    }
  ]
};

export default function Requests() {
  const [requests, setRequests] = useState(mockRequests);
  const { toast } = useToast();

  const handleAcceptRequest = (requestId: string) => {
    toast({
      title: "Request Accepted",
      description: "The skill swap has been approved! You can now start coordinating with your partner.",
    });
    // Move to active swaps
  };

  const handleRejectRequest = (requestId: string) => {
    setRequests(prev => ({
      ...prev,
      incoming: prev.incoming.filter(r => r.id !== requestId)
    }));
    toast({
      title: "Request Declined",
      description: "The request has been declined.",
    });
  };

  const handleCancelRequest = (requestId: string) => {
    setRequests(prev => ({
      ...prev,
      outgoing: prev.outgoing.filter(r => r.id !== requestId)
    }));
    toast({
      title: "Request Cancelled", 
      description: "Your outgoing request has been cancelled.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-6 pb-20 md:pb-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
            Skill Swap Requests
          </h1>

          <Tabs defaultValue="incoming" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-gradient-surface">
              <TabsTrigger value="incoming" className="data-[state=active]:bg-gradient-primary">
                Incoming ({requests.incoming.length})
              </TabsTrigger>
              <TabsTrigger value="outgoing" className="data-[state=active]:bg-gradient-primary">
                Outgoing ({requests.outgoing.length})
              </TabsTrigger>
              <TabsTrigger value="active" className="data-[state=active]:bg-gradient-primary">
                Active ({requests.active.length})
              </TabsTrigger>
            </TabsList>

            {/* Incoming Requests */}
            <TabsContent value="incoming" className="space-y-4">
              {requests.incoming.length > 0 ? (
                requests.incoming.map((request) => (
                  <Card key={request.id} className="bg-gradient-card border-border/50">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12 border-2 border-border">
                          <AvatarImage src={request.from.avatar} alt={request.from.name} />
                          <AvatarFallback className="bg-gradient-surface">
                            {request.from.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-foreground">{request.from.name}</h3>
                            <Badge variant="outline" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/40">
                              ⭐ {request.from.rating}
                            </Badge>
                          </div>

                          <div className="flex flex-col sm:flex-row gap-2 mb-3">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">Offers:</span>
                              <SkillTag skill={request.skillOffered} variant="offered" />
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">Wants:</span>
                              <SkillTag skill={request.skillWanted} variant="wanted" />
                            </div>
                          </div>

                          <p className="text-sm text-muted-foreground mb-3 bg-muted/30 p-3 rounded-lg">
                            "{request.message}"
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {request.timestamp}
                            </div>

                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRejectRequest(request.id)}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Decline
                              </Button>
                              <Button
                                variant="premium"
                                size="sm"
                                onClick={() => handleAcceptRequest(request.id)}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Accept
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="bg-gradient-card border-border/50">
                  <CardContent className="p-12 text-center">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No incoming requests</h3>
                    <p className="text-muted-foreground">
                      When someone wants to swap skills with you, their requests will appear here.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Outgoing Requests */}
            <TabsContent value="outgoing" className="space-y-4">
              {requests.outgoing.length > 0 ? (
                requests.outgoing.map((request) => (
                  <Card key={request.id} className="bg-gradient-card border-border/50">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12 border-2 border-border">
                          <AvatarImage src={request.to.avatar} alt={request.to.name} />
                          <AvatarFallback className="bg-gradient-surface">
                            {request.to.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-foreground">{request.to.name}</h3>
                            <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/40">
                              Pending
                            </Badge>
                          </div>

                          <div className="flex flex-col sm:flex-row gap-2 mb-3">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">You offer:</span>
                              <SkillTag skill={request.skillOffered} variant="offered" />
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">You want:</span>
                              <SkillTag skill={request.skillWanted} variant="wanted" />
                            </div>
                          </div>

                          <p className="text-sm text-muted-foreground mb-3 bg-muted/30 p-3 rounded-lg">
                            "{request.message}"
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              Sent {request.timestamp}
                            </div>

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleCancelRequest(request.id)}
                            >
                              Cancel Request
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="bg-gradient-card border-border/50">
                  <CardContent className="p-12 text-center">
                    <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No outgoing requests</h3>
                    <p className="text-muted-foreground">
                      Requests you send to other users will appear here.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Active Swaps */}
            <TabsContent value="active" className="space-y-4">
              {requests.active.length > 0 ? (
                requests.active.map((swap) => (
                  <Card key={swap.id} className="bg-gradient-card border-border/50">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12 border-2 border-primary">
                          <AvatarImage src={swap.partner.avatar} alt={swap.partner.name} />
                          <AvatarFallback className="bg-gradient-primary">
                            {swap.partner.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-foreground">{swap.partner.name}</h3>
                            <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/40">
                              Active Swap
                            </Badge>
                          </div>

                          <div className="flex flex-col sm:flex-row gap-2 mb-4">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">You teach:</span>
                              <SkillTag skill={swap.yourSkill} variant="offered" />
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">You learn:</span>
                              <SkillTag skill={swap.theirSkill} variant="wanted" />
                            </div>
                          </div>

                          <div className="mb-4">
                            <div className="flex items-center justify-between text-sm mb-2">
                              <span className="text-muted-foreground">Progress</span>
                              <span className="text-foreground">{swap.progress}%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div 
                                className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                                style={{ width: `${swap.progress}%` }}
                              />
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="text-xs text-muted-foreground">
                              Started {swap.startDate}
                            </div>

                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <MessageSquare className="h-4 w-4 mr-1" />
                                Message
                              </Button>
                              <Button variant="premium" size="sm">
                                Complete Swap
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="bg-gradient-card border-border/50">
                  <CardContent className="p-12 text-center">
                    <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No active swaps</h3>
                    <p className="text-muted-foreground">
                      Once you accept a request, your active skill swaps will appear here.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}