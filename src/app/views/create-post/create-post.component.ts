import { Component } from '@angular/core';
import { RecipeFormComponent } from '../../components/recipe-form/recipe-form.component';
import { RecipePreviewComponent } from '../../components/recipe-preview/recipe-preview.component';

@Component({
  selector: 'app-create-post',
  imports: [RecipeFormComponent, RecipePreviewComponent],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent {}
