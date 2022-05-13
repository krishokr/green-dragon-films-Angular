import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { MatIconModule } from '@angular/material/icon';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MainPageComponent } from './main-page/main-page.component';
import { FavoriteMoviesComponent } from './favorite-movies/favorite-movies.component';
import { SingleMoviePageComponent } from './single-movie-page/single-movie-page.component';


const routes: Routes = [
  {path: 'welcome', component: WelcomePageComponent},
  {path: 'movies', component: MainPageComponent},
  {path: '', redirectTo: 'welcome', pathMatch: 'prefix'},
  {path: 'profile', component: UserProfileComponent},
  {path: 'favorites', component: FavoriteMoviesComponent},
  {path: 'movies/:MovieTitle', component: SingleMoviePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), MatIconModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
