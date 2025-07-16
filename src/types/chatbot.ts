export interface FAQ {
  id: string;
  question: string;
  answer: string;
  keywords: string[];
  category: string;
}

export interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export interface ChatbotState {
  messages: Message[];
  isTyping: boolean;
}