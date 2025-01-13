import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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

  constructor(
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipesService,
    private commentService: CommentsService
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

  get comments(): Comment[] | undefined {
    if (this.recipe) return this.commentService.comments;
    return undefined;
  }

  addReaction(type: 'likes' | 'dislikes'): void {
    if (this.recipe !== undefined) {
      this.recipe[type] += 1;
      localStorage.setItem(
        'recipes',
        JSON.stringify(
          this.recipeService.recipes.map((all) => {
            if (this.recipe === undefined || all.id !== this.recipe.id) {
              return all;
            }
            return this.recipe;
          })
        )
      );
    }
  }
}
