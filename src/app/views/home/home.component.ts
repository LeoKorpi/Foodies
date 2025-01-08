import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../shared/interfaces';
import { RecipesService } from '../../shared/recipes.service';
import { RecipeItemComponent } from '../../components/recipe-item/recipe-item.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RecipeItemComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  recipes: Recipe[];

  constructor(private recipeService: RecipesService) {
    this.recipes = [];
  }

  ngOnInit(): void {
    this.recipeService.getRecipes().then((data) => {
      this.recipes = data;
      console.log('Component Recipes: ', this.recipes);
    });
  }
}
