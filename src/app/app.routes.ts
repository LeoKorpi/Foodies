import { Routes } from '@angular/router';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';
import { AboutMeComponent } from './views/about-me/about-me.component';
import { CreatePostComponent } from './views/create-post/create-post.component';
import { HomeComponent } from './views/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create-post', component: CreatePostComponent },
  { path: 'about-me', component: AboutMeComponent },
  { path: 'recipe/:id', component: RecipeDetailsComponent },
];
