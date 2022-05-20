import { Component, Input, OnInit } from '@angular/core';
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
  allMovies: any[] = [];
  user: any = {};
  userFavoriteMovies: any = {};

  @Input() favoriteView: boolean = false;

  constructor(
    public UserRegistration: UserRegistrationService,
    public router: Router,
    public dialog: MatDialog,
  ) { }

  /**
   * component is used
   */
  ngOnInit(): void {
    this.favoriteView ? this.populateFavoriteMoviesInMoviesArray() : this.initializeApp();
  }

  initializeApp() {
    console.log('All movies view')
    this.getMovies();
    this.getUser();
  }


  determineInitialFavorites() {
    console.log('inside determineFavorites')
    console.log(this.user);
    console.log(this.movies);
    this.movies.forEach(movie => {
      let id = movie._id;
      this.user.FavoriteMovies.includes(id) ? this.userFavoriteMovies[id] = true : this.userFavoriteMovies = false;
    })
    console.log('User Favorite Movies: ')
    console.log(Object.keys(this.userFavoriteMovies))
  }

  getMovies(): void {
      this.UserRegistration.getAllMovies().subscribe( (resp: any[]) => {
        if (this.favoriteView) {
          console.log('populating movies with favorites...')
          console.log(this.user.FavoriteMovies);
          let collectFavorites: any[] = [];
          
          this.user.FavoriteMovies.forEach((id: string) => {
            collectFavorites.push(resp.find(movie => movie._id === id));
          })
        
          this.movies = collectFavorites;
          console.log(this.movies);
        } else {
          this.movies = resp
        }
        console.log(this.movies);
        return this.movies;
      })
  }

  async populateFavoriteMoviesInMoviesArray() {
    console.log('Favorite movies')
    await this.getUser();
    await this.getMovies();
  }

  openGenreDialog(genre: object): void {

    this.dialog.open(GenreComponent, {
      width: '50vw',
      data: genre
    })
  }

  openDirectorDialog(director: object): void {
    this.dialog.open(DirectorComponent, {
      width: '70vw',
      data: director
    })
  }

  openSynopsisDialog(description: string): void {
    this.dialog.open(SynopsisComponent, {
      width: '70vw',
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
  
  viewMovie(title: string): void {
    this.router.navigate([`movies/${title}`]);
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
    this.getUser()
  }

}
