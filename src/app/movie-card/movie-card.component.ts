import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
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
  user: any = {};

  constructor(
    public UserRegistration: UserRegistrationService,
    public router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getUser();
  }

  getMovies(): void {
    this.UserRegistration.getAllMovies().subscribe( (resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    })
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

  // Adding a Favorite Movie
  getUser(): void {   
    this.UserRegistration.getUser().subscribe((result: any) => {
      this.user = result;
      console.log(this.user);
    });
  }
  

  duplicateFavoriteMovie(id: string): boolean {
    this.getUser();
    if (this.user.FavoriteMovies.includes(id)) {

        return true;
    }
    return false
  }


  addFavoriteMovie(id: string): void {   
    
    if (!this.duplicateFavoriteMovie(id)) {
      console.log(this.duplicateFavoriteMovie(id));
      this.UserRegistration.addFavoriteMovie(id).subscribe(
        result => console.log(result)
      )
    } else {
      // this.status = 'Duplicate movie cannot be added.'
      console.log('Duplicate movie - cannot be added.')
    }
  }
  

  deleteFavoriteMovie(id: string): void {

    this.getUser();

    if (this.user.FavoriteMovies.includes(id)) {
      this.UserRegistration.deleteFavoriteMovie(id).subscribe(
        result => {
          console.log(result);
          console.log('Movie has been deleted')
        }
      )
    }

    this.getUser();
    console.log('Favorite movies: ')
    console.log(this.user.FavoriteMovies);
  }



}
