import { Component, Input } from '@angular/core';
import { Recipe } from '../../shared/interfaces';
import { TruncatePipe } from '../../shared/truncate.pipe';

@Component({
  selector: 'app-recipe-item',
  imports: [TruncatePipe],
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css',
})
export class RecipeItemComponent {
  @Input() recipe: Recipe = {} as Recipe;
}
