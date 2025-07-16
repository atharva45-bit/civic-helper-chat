import { Button } from "@/components/ui/button";

interface SuggestionButtonsProps {
  suggestions: string[];
  onSelectSuggestion: (suggestion: string) => void;
}

export const SuggestionButtons = ({ suggestions, onSelectSuggestion }: SuggestionButtonsProps) => {
  return (
    <div className="p-4 border-t bg-muted/30">
      <div className="text-sm font-medium text-muted-foreground mb-2">
        Quick questions:
      </div>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => onSelectSuggestion(suggestion)}
            className="text-xs hover:bg-accent"
          >
            {suggestion}
          </Button>
        ))}
      </div>
    </div>
  );
};