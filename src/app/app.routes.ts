import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';
import { CreatePostComponent } from './views/create-post/create-post.component';
import { AboutMeComponent } from './views/about-me/about-me.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create-post', component: CreatePostComponent },
  { path: 'about-me', component: AboutMeComponent },
  { path: 'recipe/:id', component: RecipeDetailsComponent },
];
