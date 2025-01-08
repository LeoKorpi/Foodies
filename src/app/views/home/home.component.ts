import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Recipe } from '../../shared/interfaces';
import { RecipesService } from '../../shared/recipes.service';
import { RecipeItemComponent } from '../../components/recipe-item/recipe-item.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RecipeItemComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private recipeService: RecipesService) {}

  get recipes(): Recipe[] {
    return this.recipeService.recipes;
  }
}
