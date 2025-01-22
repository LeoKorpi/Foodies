import { Injectable } from '@angular/core';
import { Ingredient, Instruction, Recipe } from '../models';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private apiRecipes: Recipe[] = [];
  private localRecipes: Recipe[] = [];
  private readonly key: string = '';

  constructor() {
    this.key = process.env.API_KEY;
    this.getRecipes().then(([api, local]) => {
      this.apiRecipes = api;
      this.localRecipes = local;
    });
  }

  get recipes(): Recipe[] {
    return this.apiRecipes.concat(this.localRecipes);
  }

  async getRecipes(): Promise<[Recipe[], Recipe[]]> {
    const localData = localStorage.getItem('recipes');

    if (localData) {
      console.log('Loading recipes from localStorage...');
      const parsedData = JSON.parse(localData).map((recipe: Recipe) => {
        recipe.created_at = new Date(recipe.created_at);
        return recipe;
      });
      return [[], parsedData];
    } else {
      console.log('No recipes found, Fetching data from the API...');
      const fetchedRecipes = await this.fetchRecipesFromApi();
      localStorage.setItem('recipes', JSON.stringify(fetchedRecipes));
      return [fetchedRecipes, []];
    }
  }

  addRecipe(recipe: Recipe): void {
    this.localRecipes.unshift(recipe);
    localStorage.setItem('recipes', JSON.stringify(this.localRecipes));
  }

  addReaction(id: number, type: 'likes' | 'dislikes'): void {
    const recipe = this.recipes.find((all) => all.id == id);
    if (!recipe) return;
    recipe[type]++;
    localStorage.setItem(
      'recipes',
      JSON.stringify(this.recipes.map((all) => (all.id === id ? recipe : all)))
    );
  }

  private async fetchRecipesFromApi(): Promise<Recipe[]> {
    console.time('recipe fetch done');
    const url =
      'https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes';
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': this.key,
        'x-rapidapi-host': 'tasty.p.rapidapi.com',
      },
    };

    const response = await fetch(url, options);
    if (!response.ok) throw new Error('Failed to fetch recipes');
    const result = await response.json();
    console.timeEnd('recipe fetch done');
    return this.recipeMapper(result.results);
  }

  private recipeMapper(recipes: any[]): Recipe[] {
    return recipes.map(
      ({
        id,
        name,
        thumbnail_url,
        description,
        num_servings,
        sections,
        instructions,
        user_ratings,
        created_at,
        credits,
      }) => ({
        id,
        name,
        thumbnail_url,
        description,
        num_servings,
        ingredients: this.mapIngredients(sections?.[0]?.components || []),
        instructions: this.mapInstructions(instructions),
        ...this.mapUserRatings(user_ratings),
        created_at: new Date(created_at * 1000),
        credits,
      })
    );
  }

  private mapIngredients(components: any[]): Ingredient[] {
    return (
      components?.map((component: any) => {
        const measurement =
          component.measurements?.length === 2
            ? component.measurements[1]
            : component.measurements[0];

        return {
          id: component.id || 0,
          name: component.ingredient.name || '',
          unit: measurement?.unit.abbreviation || '',
          quantity: measurement?.quantity || '',
          extra_comment: component.extra_comment || '',
        };
      }) || []
    );
  }

  private mapInstructions(instructions: any[]): Instruction[] {
    return (
      instructions?.map((instruction: any) => ({
        id: instruction.id || 0,
        description: instruction.display_text || '',
      })) || []
    );
  }

  private mapUserRatings(userRatings: any): {
    likes: number;
    dislikes: number;
  } {
    return {
      likes: userRatings?.count_positive || 0,
      dislikes: userRatings?.count_negative || 0,
    };
  }
}
