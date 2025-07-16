import { useState } from "react";
import { FAQ } from "@/types/chatbot";
import { defaultFAQs } from "@/data/faqs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Plus, Edit, Trash2, MessageCircle, ArrowLeft, Save } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export const Admin = () => {
  const [faqs, setFaqs] = useState<FAQ[]>(defaultFAQs);
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    keywords: "",
    category: "",
  });

  const resetForm = () => {
    setFormData({
      question: "",
      answer: "",
      keywords: "",
      category: "",
    });
    setEditingFAQ(null);
  };

  const handleSave = () => {
    if (!formData.question.trim() || !formData.answer.trim()) {
      toast({
        title: "Error",
        description: "Question and answer are required",
        variant: "destructive",
      });
      return;
    }

    const keywordsArray = formData.keywords
      .split(",")
      .map(k => k.trim().toLowerCase())
      .filter(k => k.length > 0);

    const faqData: FAQ = {
      id: editingFAQ?.id || Date.now().toString(),
      question: formData.question.trim(),
      answer: formData.answer.trim(),
      keywords: keywordsArray,
      category: formData.category.trim() || "General",
    };

    if (editingFAQ) {
      setFaqs(prev => prev.map(faq => faq.id === editingFAQ.id ? faqData : faq));
      toast({
        title: "Success",
        description: "FAQ updated successfully",
      });
    } else {
      setFaqs(prev => [...prev, faqData]);
      toast({
        title: "Success",
        description: "FAQ added successfully",
      });
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (faq: FAQ) => {
    setEditingFAQ(faq);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      keywords: faq.keywords.join(", "),
      category: faq.category,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setFaqs(prev => prev.filter(faq => faq.id !== id));
    toast({
      title: "Success",
      description: "FAQ deleted successfully",
    });
  };

  const categories = [...new Set(faqs.map(faq => faq.category))];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft size={16} />
                Back to Chat
              </Button>
            </Link>
            <div className="h-8 w-px bg-border mx-2"></div>
            <div>
              <h1 className="text-xl font-bold">FAQ Admin Panel</h1>
              <p className="text-sm text-muted-foreground">Manage chatbot responses</p>
            </div>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="civic" onClick={resetForm}>
                <Plus size={16} />
                Add FAQ
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingFAQ ? "Edit FAQ" : "Add New FAQ"}</DialogTitle>
                <DialogDescription>
                  {editingFAQ ? "Update the FAQ information below." : "Create a new FAQ entry for the chatbot."}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="question">Question</Label>
                  <Input
                    id="question"
                    value={formData.question}
                    onChange={(e) => setFormData(prev => ({ ...prev, question: e.target.value }))}
                    placeholder="How do I...?"
                  />
                </div>
                
                <div>
                  <Label htmlFor="answer">Answer</Label>
                  <Textarea
                    id="answer"
                    value={formData.answer}
                    onChange={(e) => setFormData(prev => ({ ...prev, answer: e.target.value }))}
                    placeholder="Provide a detailed answer..."
                    rows={4}
                  />
                </div>
                
                <div>
                  <Label htmlFor="keywords">Keywords (comma-separated)</Label>
                  <Input
                    id="keywords"
                    value={formData.keywords}
                    onChange={(e) => setFormData(prev => ({ ...prev, keywords: e.target.value }))}
                    placeholder="vote, voting, registration, election"
                  />
                </div>
                
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    placeholder="Elections, Documents, Taxes..."
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  <Save size={16} />
                  {editingFAQ ? "Update" : "Add"} FAQ
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-4">
        <Tabs defaultValue="manage" className="space-y-4">
          <TabsList>
            <TabsTrigger value="manage">Manage FAQs</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="manage" className="space-y-4">
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">FAQ Management</h2>
                  <p className="text-sm text-muted-foreground">
                    Total FAQs: {faqs.length} | Categories: {categories.length}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <Badge key={category} variant="secondary">
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid gap-4">
                {faqs.map((faq) => (
                  <Card key={faq.id} className="transition-all hover:shadow-md">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-base">{faq.question}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline">{faq.category}</Badge>
                            <span className="text-xs text-muted-foreground">
                              {faq.keywords.length} keywords
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(faq)}
                          >
                            <Edit size={14} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(faq.id)}
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-3">
                        {faq.answer}
                      </CardDescription>
                      <div className="flex flex-wrap gap-1">
                        {faq.keywords.map((keyword, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Chatbot Analytics</CardTitle>
                <CardDescription>
                  Usage statistics and performance metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <MessageCircle className="mx-auto mb-2 text-primary" size={24} />
                    <div className="text-2xl font-bold">{faqs.length}</div>
                    <div className="text-sm text-muted-foreground">Total FAQs</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold">{categories.length}</div>
                    <div className="text-sm text-muted-foreground">Categories</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold">
                      {Math.round(faqs.reduce((acc, faq) => acc + faq.keywords.length, 0) / faqs.length)}
                    </div>
                    <div className="text-sm text-muted-foreground">Avg Keywords per FAQ</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};