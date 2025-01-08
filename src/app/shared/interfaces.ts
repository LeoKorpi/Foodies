export interface Recipe {
  id: number;
  name: string;
  thumbnail_url: string;
  description: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
  likes: number;
  dislikes: number;
  creation_date: Date;
  comments: string[];
  [key: string]: any;
}

export interface Instruction {
  id: number;
  step: number;
  description: string;
}

export interface Ingredient {
  id: number;
  name: string;
  unit: string;
  quantity: number;
}
