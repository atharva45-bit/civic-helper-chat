import { FAQ } from "@/types/chatbot";

export const defaultFAQs: FAQ[] = [
  {
    id: "1",
    question: "How do I register to vote?",
    answer: "To register to vote, visit your local election office or register online at your state's official voter registration website. You'll need proof of identity and residence. Registration deadlines vary by state, typically 15-30 days before an election.",
    keywords: ["register", "vote", "voting", "registration", "election"],
    category: "Elections"
  },
  {
    id: "2",
    question: "How do I get a birth certificate?",
    answer: "You can obtain a birth certificate from the vital records office in the state where you were born. Most states allow online applications through their official websites. You'll need to provide identification and pay a fee, typically $10-25.",
    keywords: ["birth", "certificate", "vital", "records", "documents"],
    category: "Documents"
  },
  {
    id: "3",
    question: "How do I pay property taxes?",
    answer: "Property taxes can typically be paid online through your county's website, by mail, or in person at the tax collector's office. Payment methods include check, money order, or credit card. Due dates vary by location but are often in December or January.",
    keywords: ["property", "tax", "taxes", "payment", "county"],
    category: "Taxes"
  },
  {
    id: "4",
    question: "How do I get a marriage license?",
    answer: "Marriage licenses are issued by your county clerk's office. Both parties must appear in person with valid photo ID. Some counties require appointments. The license is valid for a specific period (usually 30-90 days) and fees range from $20-100.",
    keywords: ["marriage", "license", "wedding", "county", "clerk"],
    category: "Documents"
  },
  {
    id: "5",
    question: "How do I report a pothole?",
    answer: "Report potholes to your city's public works department through their website, mobile app, or by calling the non-emergency number. Provide the exact location, cross streets, and describe the size and severity of the pothole.",
    keywords: ["pothole", "road", "repair", "public", "works", "report"],
    category: "Public Works"
  },
  {
    id: "6",
    question: "How do I get a business license?",
    answer: "Business licenses are typically obtained through your city or county clerk's office. Requirements vary by business type and location. You may need to provide a business plan, proof of insurance, and pay licensing fees. Some businesses require additional permits.",
    keywords: ["business", "license", "permit", "entrepreneur", "company"],
    category: "Business"
  },
  {
    id: "7",
    question: "When is bulk trash pickup?",
    answer: "Bulk trash pickup schedules vary by city and neighborhood. Check your city's waste management website or call your local sanitation department. Many cities offer monthly or quarterly bulk pickup days. Some items may require special disposal arrangements.",
    keywords: ["bulk", "trash", "pickup", "garbage", "waste", "disposal"],
    category: "Public Works"
  },
  {
    id: "8",
    question: "How do I get a building permit?",
    answer: "Building permits are issued by your city's building department. Submit plans, pay fees, and schedule inspections. Requirements vary by project size and type. Major renovations and new construction typically require permits. Processing times range from days to weeks.",
    keywords: ["building", "permit", "construction", "renovation", "plans"],
    category: "Building"
  }
];