import { Ingredient } from './ingredient';
import { Instruction } from './instruction';

export interface Recipe {
  id: number;
  title: string;
  thumbnailUrl: string;
  body: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
  likes: number;
  dislikes: number;
  creationDate: Date;
  comments: string[];
  [key: string]: any;
}
