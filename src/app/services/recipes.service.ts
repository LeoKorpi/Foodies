import { Injectable } from '@angular/core';
import { Recipe } from '../interfaces/recipe';

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
    return this.apiRecipes.concat(this.localRecipes);
  }

  public async getRecipes(): Promise<Recipe[]> {
    const localData = localStorage.getItem('recipes');

    if (localData) {
      console.log('Loading recipes from localStorage...');
      this.localRecipes = JSON.parse(localData);
    } else {
      console.log('No localdata found, Fetching data from the API...');

      const fetchedRecipes = await this.fetchRecipesFromApi();
      this.apiRecipes = fetchedRecipes;
      localStorage.setItem('recipes', JSON.stringify(fetchedRecipes));
    }
    return this.apiRecipes.concat(this.localRecipes);
  }

  private async fetchRecipesFromApi(): Promise<Recipe[]> {
    console.time('fetch done');
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
    if (!response.ok) throw new Error('Failed to fetch');

    const result = await response.json();
    console.timeEnd('fetch done');
    return result.results;
  }

  private loadLocalData(): Recipe[] {
    const recipes = localStorage.getItem('recipes');
    return !recipes ? [] : JSON.parse(recipes);
  }
}
