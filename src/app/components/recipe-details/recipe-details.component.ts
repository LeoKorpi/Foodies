import { Component, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CommentsService } from '../../shared/comments.service';
import {
  Comment,
  Ingredient,
  Instruction,
  Recipe,
} from '../../shared/interfaces';
import { CheckForAuthorPipe } from '../../shared/pipes/check-for-author.pipe';
import { DateFormatterPipe } from '../../shared/pipes/date-formatter.pipe';
import { HideZeroQuantityPipe } from '../../shared/pipes/hide-zero-quantity.pipe';
import { JoinAuthorsPipe } from '../../shared/pipes/join-authors.pipe';
import { RecipesService } from '../../shared/recipes.service';
import { CommentItemComponent } from '../comment-item/comment-item.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipe-details',
  imports: [
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
  id = computed(() => {
    const paramMap = this.paramMap();
    return paramMap ? parseInt(paramMap.get('id') || '0', 10) : null;
  });

  private paramMap!: () => ParamMap | null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipesService,
    private commentService: CommentsService
  ) {
    this.paramMap = toSignal(this.activatedRoute.paramMap, {
      initialValue: null,
    });
  }

  get recipe(): Recipe | undefined {
    return this.recipeService.recipes.find((all) => all.id == this.id());
  }

  get ingredients(): Ingredient[] | undefined {
    return this.recipe?.ingredients;
  }

  get instructions(): Instruction[] | undefined {
    return this.recipe?.instructions;
  }

  get comments(): Comment[] | undefined {
    return this.recipe ? this.commentService.comments : undefined;
  }

  // flytta till recipe.service för att hålla all data-logik där
  addReaction(type: 'likes' | 'dislikes'): void {
    if (this.recipe) {
      this.recipe[type]++;
      localStorage.setItem(
        'recipes',
        JSON.stringify(
          this.recipeService.recipes.map((all) =>
            this.recipe && all.id === this.recipe.id ? this.recipe : all
          )
        )
      );
    }
  }
}
