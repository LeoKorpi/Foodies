import { Component } from '@angular/core';
import { RecipeItemComponent } from '../../components/recipe-item/recipe-item.component';
import { Recipe } from '../../shared/models';
import { RecipesService } from '../../shared/services/recipes.service';

@Component({
  selector: 'app-home',
  imports: [RecipeItemComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private recipeService: RecipesService) {}

  get recipes(): Recipe[] {
    return this.recipeService.recipes;
  }
}
