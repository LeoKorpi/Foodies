import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CheckForAuthorPipe } from '../../shared/pipes/check-for-author.pipe';
import {
  Ingredient,
  Instruction,
  Recipe,
  Comment,
} from '../../shared/interfaces';
import { JoinAuthorsPipe } from '../../shared/pipes/join-authors.pipe';
import { RecipesService } from '../../shared/recipes.service';
import { DateFormatterPipe } from '../../shared/pipes/date-formatter.pipe';
import { HideZeroQuantityPipe } from '../../shared/pipes/hide-zero-quantity.pipe';
import { CommentItemComponent } from '../comment-item/comment-item.component';
import { CommentsService } from '../../shared/comments.service';

@Component({
  selector: 'app-recipe-details',
  imports: [
    CommonModule,
    RouterLink,
    CheckForAuthorPipe,
    JoinAuthorsPipe,
    DateFormatterPipe,
    HideZeroQuantityPipe,
    CommentItemComponent,
  ],

  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css',
})
export class RecipeDetailsComponent {
  id: number = -1;
  reactions = signal<{ likes: number; dislikes: number }>({
    likes: 0,
    dislikes: 0,
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipesService,
    private commentService: CommentsService
  ) {
    activatedRoute.params.subscribe(
      (params) => (this.id = parseInt(params['id']))
    );
    this.loadReactions();
  }

  get recipe(): Recipe | undefined {
    const recipe = this.recipeService.recipes.find((all) => all.id == this.id);
    console.log(recipe);
    return recipe;
  }

  get ingredients(): Ingredient[] | undefined {
    if (this.recipe) return this.recipe.ingredients;
    return undefined;
  }

  get instructions(): Instruction[] | undefined {
    if (this.recipe) return this.recipe.instructions;
    return undefined;
  }

  get comments(): Comment[] | undefined {
    if (this.recipe) return this.commentService.comments;
    return undefined;
  }

  loadReactions() {
    const recipes = JSON.parse(localStorage.getItem('recipes') || '[]');
    const recipe = recipes.find((r: any) => r.id === this.id);

    if (recipe && recipe.user_ratings) {
      this.reactions.set({
        likes: recipe.user_ratings.count_positive || 0,
        dislikes: recipe.user_ratings.count_negative || 0,
      });
    }
  }

  addReaction(type: 'positive' | 'negative'): void {
    const recipes = JSON.parse(localStorage.getItem('recipes') || '[]');
    const recipeIndex = recipes.findIndex((r: any) => r.id === this.id);

    if (recipeIndex !== -1) {
      const recipe = recipes[recipeIndex];
      recipe.user_ratings = recipe.user_ratings || {};
      recipe.user_ratings[`count_${type}`] =
        (recipe.user_ratings[`count_${type}`] || 0) + 1;

      recipes[recipeIndex] = recipe;
      localStorage.setItem('recipes', JSON.stringify(recipes));

      this.reactions.set({
        likes: recipe.user_ratings.count_positive,
        dislikes: recipe.user_ratings.count_negative,
      });
    }
  }
}
