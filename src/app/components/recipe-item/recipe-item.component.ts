import { Component, Input } from '@angular/core';
import { CheckForAuthorPipe } from '../../shared/check-for-author.pipe';
import { Recipe } from '../../shared/interfaces';
import { TruncatePipe } from '../../shared/truncate.pipe';
import { UppercaseAuthorsPipe } from '../../shared/uppercase-authors.pipe';

@Component({
  selector: 'app-recipe-item',
  imports: [TruncatePipe, CheckForAuthorPipe, UppercaseAuthorsPipe],
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css',
})
export class RecipeItemComponent {
  @Input() recipe: Recipe = {} as Recipe;
}
