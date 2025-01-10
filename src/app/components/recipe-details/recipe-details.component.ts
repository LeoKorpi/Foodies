import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CheckForAuthorPipe } from '../../shared/check-for-author.pipe';
import { Ingredient, Instruction, Recipe } from '../../shared/interfaces';
import { JoinAuthorsPipe } from '../../shared/join-authors.pipe';
import { RecipesService } from '../../shared/recipes.service';
import { DateFormatterPipe } from '../../shared/date-formatter.pipe';
import { HideZeroQuantityPipe } from '../../shared/hide-zero-quantity.pipe';

@Component({
  selector: 'app-recipe-details',
  imports: [
    CommonModule,
    RouterLink,
    CheckForAuthorPipe,
    JoinAuthorsPipe,
    DateFormatterPipe,
    HideZeroQuantityPipe,
  ],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css',
})
export class RecipeDetailsComponent {
  id: number = -1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipesService
  ) {
    activatedRoute.params.subscribe(
      (params) => (this.id = parseInt(params['id']))
    );
  }

  get recipe(): Recipe | undefined {
    return this.recipeService.recipes.find((all) => all.id == this.id);
  }

  get ingredients(): Ingredient[] | undefined {
    if (this.recipe) return this.recipe.ingredients;
    return undefined;
  }

  get instructions(): Instruction[] | undefined {
    if (this.recipe) return this.recipe.instructions;
    return undefined;
  }
}
