import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Shield, 
  Users, 
  Clock, 
  CheckCircle, 
  Settings,
  ArrowRight,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: MessageCircle,
      title: "Instant Answers",
      description: "Get immediate responses to common civic questions 24/7"
    },
    {
      icon: Shield,
      title: "Reliable Information",
      description: "Accurate, up-to-date information from official sources"
    },
    {
      icon: Zap,
      title: "Rule-Based Logic",
      description: "Smart keyword matching for precise, relevant responses"
    },
    {
      icon: Settings,
      title: "Easy Management",
      description: "Simple admin interface to update and manage FAQs"
    }
  ];

  const categories = [
    "Elections & Voting",
    "Documents & Certificates", 
    "Taxes & Payments",
    "Business Licenses",
    "Public Works",
    "Building Permits"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-accent/20">
        <div className="absolute inset-0 bg-gradient-to-r from-civic-blue/5 to-civic-green/5"></div>
        <div className="relative max-w-6xl mx-auto px-4 py-16 lg:py-24">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent rounded-full text-sm font-medium">
              <Shield size={16} className="text-primary" />
              Civic Assistant Platform
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
              Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-civic-blue to-civic-green">
                Digital Civic Guide
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Get instant answers to civic questions with our intelligent rule-based chatbot. 
              From voting registration to building permits, we're here to help.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/chat">
                <Button variant="civic" size="lg" className="w-full sm:w-auto">
                  <MessageCircle size={20} />
                  Start Chatting
                  <ArrowRight size={16} />
                </Button>
              </Link>
              <Link to="/admin">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <Settings size={20} />
                  Admin Panel
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Civic Chatbot?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built with simplicity and accuracy in mind, our chatbot provides reliable civic information when you need it most.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardHeader>
                  <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="text-primary" size={24} />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Topics We Cover</h2>
            <p className="text-lg text-muted-foreground">
              Our chatbot can help with questions across these civic service areas
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {categories.map((category, index) => (
              <Badge key={index} variant="secondary" className="px-4 py-2 text-sm">
                <CheckCircle size={14} className="mr-2" />
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-civic-blue/10 to-civic-green/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of citizens who use our chatbot to navigate civic services with ease.
            </p>
            
            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users size={16} />
                <span>10,000+ Questions Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>24/7 Available</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} />
                <span>100% Free</span>
              </div>
            </div>
            
            <Link to="/chat">
              <Button variant="civic" size="lg">
                <MessageCircle size={20} />
                Try the Chatbot Now
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-civic-blue to-civic-green flex items-center justify-center">
                <Shield className="text-white" size={16} />
              </div>
              <span className="font-semibold">Civic Chatbot</span>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Powered by rule-based AI for accurate civic information
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
