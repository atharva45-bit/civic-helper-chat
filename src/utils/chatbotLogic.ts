import { FAQ } from "@/types/chatbot";

export class ChatbotEngine {
  private faqs: FAQ[];

  constructor(faqs: FAQ[]) {
    this.faqs = faqs;
  }

  findBestMatch(userInput: string): FAQ | null {
    const normalizedInput = userInput.toLowerCase().trim();
    
    // First, try to find exact question matches
    const exactMatch = this.faqs.find(faq => 
      faq.question.toLowerCase() === normalizedInput
    );
    if (exactMatch) return exactMatch;

    // Score each FAQ based on keyword matches
    const scoredFAQs = this.faqs.map(faq => ({
      faq,
      score: this.calculateScore(normalizedInput, faq)
    }));

    // Sort by score and return the best match if score is above threshold
    scoredFAQs.sort((a, b) => b.score - a.score);
    
    const bestMatch = scoredFAQs[0];
    return bestMatch.score > 0.3 ? bestMatch.faq : null;
  }

  private calculateScore(input: string, faq: FAQ): number {
    const inputWords = input.split(/\s+/);
    let score = 0;

    // Check keyword matches
    faq.keywords.forEach(keyword => {
      if (input.includes(keyword.toLowerCase())) {
        score += 0.3;
      }
    });

    // Check question word matches
    const questionWords = faq.question.toLowerCase().split(/\s+/);
    inputWords.forEach(word => {
      if (word.length > 2 && questionWords.includes(word)) {
        score += 0.2;
      }
    });

    // Bonus for exact phrase matches
    if (faq.question.toLowerCase().includes(input)) {
      score += 0.5;
    }

    return Math.min(score, 1); // Cap at 1.0
  }

  getGreeting(): string {
    const greetings = [
      "Hello! I'm your Civic Assistant. How can I help you today?",
      "Hi there! I can help you with civic questions and services. What would you like to know?",
      "Welcome! I'm here to help with civic information. What can I assist you with?",
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  getNoMatchResponse(): string {
    const responses = [
      "I'm sorry, I don't have information about that specific topic. Could you try rephrasing your question or ask about voting, taxes, permits, or other civic services?",
      "I couldn't find a match for your question. I can help with topics like voter registration, birth certificates, business licenses, and more. What would you like to know?",
      "I don't have an answer for that question right now. Try asking about common civic services like permits, taxes, or public works issues.",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  updateFAQs(newFAQs: FAQ[]) {
    this.faqs = newFAQs;
  }

  getAllFAQs(): FAQ[] {
    return this.faqs;
  }

  getSuggestions(): string[] {
    return [
      "How do I register to vote?",
      "How do I get a birth certificate?",
      "How do I pay property taxes?",
      "How do I report a pothole?",
    ];
  }
}