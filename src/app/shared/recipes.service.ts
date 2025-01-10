import { Injectable } from '@angular/core';
import { Ingredient, Instruction, Recipe } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private apiRecipes: Recipe[] = [];
  private localRecipes: Recipe[] = [];
  private readonly key: string = '';

  constructor() {
    this.key = process.env.API_KEY;
    this.localRecipes = this.loadLocalData();
    if (this.localRecipes.length < 1)
      this.getRecipes().then((recipes) => (this.apiRecipes = recipes));
  }

  public get recipes(): Recipe[] {
    return this.recipeMapper(this.apiRecipes.concat(this.localRecipes)); //kör dethär genom recipeMapper med
  }

  public async getRecipes(): Promise<Recipe[]> {
    const localData = localStorage.getItem('recipes');

    if (localData) {
      console.log('Loading recipes from localStorage...');
      const parsedData = JSON.parse(localData);
      console.log('Parsed localData: ', parsedData);
      this.localRecipes = this.recipeMapper(parsedData);
    } else {
      console.log('No recipes found, Fetching data from the API...');
      const fetchedRecipes = await this.fetchRecipesFromApi();
      this.apiRecipes = fetchedRecipes;
      localStorage.setItem('recipes', JSON.stringify(fetchedRecipes));
    }

    return this.apiRecipes.concat(this.localRecipes);
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

  private loadLocalData(): Recipe[] {
    const recipes = localStorage.getItem('recipes');
    return !recipes ? [] : JSON.parse(recipes);
  }
}
