import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CreatePostService } from '../../shared/services/create-post.service';
import { RecipesService } from '../../shared/services/recipes.service';

@Component({
  selector: 'app-recipe-form',
  imports: [ReactiveFormsModule],
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.css',
})
export class RecipeFormComponent {
  postForm = new FormGroup({
    title: new FormControl(''),
    imageUrl: new FormControl(''),
    description: new FormControl(''),
    noOfServings: new FormControl(0),
    ingredients: new FormControl([]),
    instructions: new FormControl([]),
  });

  constructor(
    public createPostService: CreatePostService,
    private recipeService: RecipesService,
    private router: Router
  ) {}

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];
    if (file) {
      this.createPostService.updateImagePreview(file);
    }
  }

  onSubmit() {
    if (this.postForm.invalid)
      return alert(
        'All fields but be filled in before you can publish the post'
      );

    const newRecipe = {
      id: Math.ceil(Math.random() * 10000),
      name: this.createPostService.title(),
      thumbnail_url: this.createPostService.imagePreview(),
      description: this.createPostService.description(),
      num_servings: this.createPostService.noOfServings(),
      ingredients: this.createPostService.ingredients(),
      instructions: this.createPostService.instructions(),
      likes: 0,
      dislikes: 0,
      created_at: new Date(),
      credits: [{ name: 'Admin' }],
    };
    this.recipeService.addRecipe(newRecipe);
    this.router.navigateByUrl('/');
  }
}
