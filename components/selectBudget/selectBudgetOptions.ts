export interface BudgetOption {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const budgetOptions: BudgetOption[] = [
  {
    id: "budget_friendly",
    title: "Smart Explorer",
    description: "Perfect for mindful travelers seeking value experiences",
    icon: "💵",
  },
  {
    id: "mid_range",
    title: "Balanced Journey",
    description: "Ideal blend of comfort and experiences",
    icon: "🪪",
  },
  {
    id: "luxury",
    title: "Premium Discovery",
    description: "Elevated experiences for discerning explorers",
    icon: "💎",
  },
];

export default budgetOptions;
