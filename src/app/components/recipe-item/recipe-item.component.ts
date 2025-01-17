import { Component, Input } from '@angular/core';
import { Recipe } from '../../shared/interfaces';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  imports: [RouterLink],
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css',
})
export class RecipeItemComponent {
  @Input() recipe: Recipe = {} as Recipe;
}
