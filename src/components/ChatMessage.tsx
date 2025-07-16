import { Message } from "@/types/chatbot";
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div className={cn(
      "flex gap-3 p-4 rounded-lg transition-all duration-300",
      message.isBot 
        ? "bg-accent text-accent-foreground" 
        : "bg-primary text-primary-foreground ml-8"
    )}>
      <div className={cn(
        "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
        message.isBot 
          ? "bg-primary text-primary-foreground" 
          : "bg-primary-foreground text-primary"
      )}>
        {message.isBot ? <Bot size={16} /> : <User size={16} />}
      </div>
      
      <div className="flex-1 space-y-1">
        <div className="text-sm font-medium">
          {message.isBot ? "Civic Assistant" : "You"}
        </div>
        <div className="text-sm leading-relaxed whitespace-pre-wrap">
          {message.text}
        </div>
        <div className="text-xs opacity-70">
          {message.timestamp.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};