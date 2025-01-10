import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'recipe/:id', component: RecipeDetailsComponent },
];
