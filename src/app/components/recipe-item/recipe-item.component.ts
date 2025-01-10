import { Component, Input } from '@angular/core';
import { CheckForAuthorPipe } from '../../shared/check-for-author.pipe';
import { Recipe } from '../../shared/interfaces';
import { TruncatePipe } from '../../shared/truncate.pipe';
import { JoinAuthorsPipe } from '../../shared/join-authors.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  imports: [TruncatePipe, CheckForAuthorPipe, JoinAuthorsPipe, RouterLink],
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css',
})
export class RecipeItemComponent {
  @Input() recipe: Recipe = {} as Recipe;
}
