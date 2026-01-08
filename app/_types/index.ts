export type Item = {
  id: string;
  name: string;
  category: "water" | "fire" | "shelter" | "food" | "medical" | "tools";
  weight_oz: number;
  price_usd: number;
  description: string;
  coverage_contribution: number;
  essential: boolean;
  image_url: string;
  tags: string[];
};

export type Kit = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  items: Item[];
  constraints: {
    max_weight_oz: number;
    max_budget_usd: number;
  };
};