import { Component } from '@angular/core';
import { CreatePostService } from '../../shared/services/create-post.service';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { Ingredient, Instruction } from '../../shared/models';
import { RecipesService } from '../../shared/services/recipes.service';

@Component({
  selector: 'app-create-post',
  imports: [ReactiveFormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent {
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
    private recipeService: RecipesService
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
    console.warn(this.postForm.value);
    // mappa till ett recipe objekt,
    // lägg till i localstorage i recipes

    // const newRecipe = {
    //   id: Math.ceil(Math.random() * 10),
    //   name: this.postForm.value.title,
    //   thumbnail_url: this.postForm.value.imageUrl,
    //   description: this.postForm.value.description,
    //   num_servings: this.postForm.value.noOfServings,
    //   ingredients: this.postForm.value.ingredients?.map(),
    //   instructions: this.postForm.value.instructions?.map(),
    //   likes: 0,
    //   dislikes: 0,
    //   created_at: Date.now(),
    //   credits: { name: 'Admin' },
    // };
    // this.recipeService.addRecipe(newRecipe);
  }
}
