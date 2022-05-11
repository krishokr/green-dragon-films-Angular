import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { MatDialog } from '@angular/material/dialog';

import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';



@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent implements OnInit{

  movies: any[] = [];
  // user: {Username: string, Password: string, Email: string, FavoriteMovies: [], Birthday: string} = {};

  constructor(
    public UserRegistration: UserRegistrationService,
    public router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.UserRegistration.getAllMovies().subscribe( (resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    })
  }

  navigateUserProfile(): void {
    this.router.navigate(['profile'])
  }

  openGenreDialog(genre: object): void {

    this.dialog.open(GenreComponent, {
      width: '280px',
      data: genre
    })
  }

  openDirectorDialog(director: object): void {
    this.dialog.open(DirectorComponent, {
      width: '280px',
      data: director
    })
  }

  openSynopsisDialog(description: string): void {
    this.dialog.open(SynopsisComponent, {
      width: '280px',
      data: {
        description
      }
    })
  }

  //Adding a Favorite Movie
  // getUser(): object {   
  //   return this.UserRegistration.getUser().subscribe((result: any) => {
  //     this.user = result.data;
  //     console.log(this.user);
  //   });
  // }

  // duplicateFavoriteMovie(id: string) {

  //   if (this.user.FavoriteMovies.includes(id)) {
  //       return true;
  //   }
  //   return false
  // }

  addFavoriteMovie(id: string): void {   
    console.log(id);
    // if (!this.duplicateFavoriteMovie(id)) {
      this.UserRegistration.addFavoriteMovie(id).subscribe(
        result => console.log(result)
      )
    // }
    // return console.log('something went wrong...');   
  }
  

}
