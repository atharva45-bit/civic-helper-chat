import { useState, useEffect, useRef } from "react";
import { Message } from "@/types/chatbot";
import { ChatbotEngine } from "@/utils/chatbotLogic";
import { defaultFAQs } from "@/data/faqs";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { SuggestionButtons } from "@/components/SuggestionButtons";
import { TypingIndicator } from "@/components/TypingIndicator";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Settings, MessageCircle, Shield } from "lucide-react";
import { Link } from "react-router-dom";

export const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [chatbot] = useState(() => new ChatbotEngine(defaultFAQs));
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    // Initial greeting
    const greeting: Message = {
      id: "1",
      text: chatbot.getGreeting(),
      isBot: true,
      timestamp: new Date(),
    };
    setMessages([greeting]);
  }, [chatbot]);

  const handleSendMessage = async (userInput: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: userInput,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    // Find bot response
    const matchedFAQ = chatbot.findBestMatch(userInput);
    const botResponse = matchedFAQ ? matchedFAQ.answer : chatbot.getNoMatchResponse();

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: botResponse,
      isBot: true,
      timestamp: new Date(),
    };

    setIsTyping(false);
    setMessages(prev => [...prev, botMessage]);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-civic-blue to-civic-green flex items-center justify-center">
              <Shield className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold">Civic Assistant</h1>
              <p className="text-sm text-muted-foreground">Your AI-powered civic guide</p>
            </div>
          </div>
          
          <Link to="/admin">
            <Button variant="admin" size="sm">
              <Settings size={16} />
              Admin
            </Button>
          </Link>
        </div>
      </header>

      {/* Chat Container */}
      <div className="max-w-4xl mx-auto h-[calc(100vh-120px)] flex flex-col">
        <Card className="flex-1 flex flex-col m-4 overflow-hidden">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {messages.length <= 1 && (
            <SuggestionButtons
              suggestions={chatbot.getSuggestions()}
              onSelectSuggestion={handleSuggestionClick}
            />
          )}

          {/* Input */}
          <ChatInput
            onSendMessage={handleSendMessage}
            disabled={isTyping}
          />
        </Card>
      </div>

      {/* Footer */}
      <footer className="text-center py-4 text-sm text-muted-foreground">
        <MessageCircle className="inline mr-2" size={16} />
        Civic Chatbot - Powered by Rule-Based AI
      </footer>
    </div>
  );
};