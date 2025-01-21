import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../shared/models';
import { RecipesService } from '../../shared/services/recipes.service';
import { RecipeItemComponent } from '../../components/recipe-item/recipe-item.component';

@Component({
  selector: 'app-home',
  imports: [RecipeItemComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  recipes: Recipe[];

  constructor(private recipeService: RecipesService) {
    this.recipes = [];
  }

  ngOnInit(): void {
    this.recipeService.getRecipes().then(([api, local]) => {
      this.recipes = api.concat(local);
    });
  }
}
