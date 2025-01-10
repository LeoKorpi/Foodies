export interface Recipe {
  id: number;
  name: string;
  thumbnail_url: string;
  description: string;
  num_servings: number;
  ingredients: Ingredient[];
  instructions: Instruction[];
  likes: number;
  dislikes: number;
  created_at: Date;
  credits: { name: string | null }[];
}

export interface Instruction {
  id: number;
  description: string;
}

export interface Ingredient {
  id: number;
  name: string;
  unit: string;
  quantity: number;
  extra_comment: string;
}

export interface Comment {
  id: number;
  body: string;
}
