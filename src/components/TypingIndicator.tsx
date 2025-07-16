import { Bot } from "lucide-react";

export const TypingIndicator = () => {
  return (
    <div className="flex gap-3 p-4 rounded-lg bg-accent text-accent-foreground">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
        <Bot size={16} />
      </div>
      
      <div className="flex-1 space-y-1">
        <div className="text-sm font-medium">Civic Assistant</div>
        <div className="flex items-center gap-1">
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
          </div>
          <span className="text-xs text-muted-foreground ml-2">Typing...</span>
        </div>
      </div>
    </div>
  );
};