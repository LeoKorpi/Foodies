import { Component } from '@angular/core';
import { CreatePostService } from '../../shared/services/create-post.service';

@Component({
  selector: 'app-recipe-preview',
  imports: [],
  templateUrl: './recipe-preview.component.html',
  styleUrl: './recipe-preview.component.css',
})
export class RecipePreviewComponent {
  constructor(public createPostService: CreatePostService) {}
}
