import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'https://greendragonflix.herokuapp.com/';


@Injectable({
  providedIn: 'root'
})

export class UserRegistrationService {

  constructor(private http: HttpClient) {}

  userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }

  userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe( 
      map(response => {
        //need to store token??
          let data = response.data;
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', data.user);
          return console.log(data);
        }
      )

    )
  }

  getMovie(movieTitle: string): Observable<any> {

    const accessToken = localStorage.getItem('token');

    if (accessToken) {
      return this.http.get(apiUrl + 'movies' + movieTitle, {
        headers: {Authorization: `Bearer ${accessToken}`}
      }).pipe(map(res => this.extractResponseData))
    }
  }

  getDirector(directorName: string): Observable<any> {
    const accessToken = localStorage.getItem('token');
    if (accessToken) {
      return this.http.get(apiUrl + 'directors/' + directorName, {
        headers: {Authorization: `Bearer ${accessToken}`}
      }).pipe(map(res => this.extractResponseData))
    }
  }

  getGenre(genreName: string): Observable<any> {
    const accessToken = localStorage.getItem('token');
    if (accessToken) {
      return this.http.get(apiUrl + 'genres/' + genreName, {
        headers: {Authorization: `Bearer ${accessToken}`}
      }).pipe(map(res => this.extractResponseData))
    }
  }

  getUser(username: string): Observable<any> {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      return this.http.get(apiUrl + 'users/' + username, {
        headers: {Authorization: `Bearer ${accessToken}`}
      }).pipe(map(res => this.extractResponseData))
    }
  }

  //get favorite movies from user info (use info from getUser)
  public getFavoriteMovies(): Observable<any> {
    const favoriteMovies = this.getUser().FavoriteMovies;
    return this.extractResponseData(favoriteMovies);
  }

  public addFavoriteMovie(username: string, movieID: string): Observable<any> {
    const accessToken = localStorage.getItem('token');
    if (accessToken) {
      return this.http.post(apiUrl + 'users/' + username + '/movies/' + movieID, {
        headers: {Authorization: `Bearer ${accessToken}`}
      }).pipe(map(res => console.log(res)))
    }
  }

  public deleteFavoriteMovie(username: string, movieID: string): Observable<any> {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      return this.http.delete(apiUrl + 'users/' + username + '/movies/' + movieID, {
        headers: {Authorization: `Bearer ${accessToken}`}
      }).pipe(map(res => console.log(res)))
    }
  }

  public updateUser(username: string, userDetails: any): Observable<any> {
    const accessToken = localStorage.getItem('token');
    if (accessToken) {
      return this.http.put(apiUrl + 'users/' + username, userDetails, {
        headers: {Authorization: `Bearer ${accessToken}`}
      }).pipe(map(res => console.log(res)))
    }
  }

  public deleteUser(username: string): Observable<any> {
    const accessToken = localStorage.getItem('token');
    if (accessToken) {
      return this.http.put(apiUrl + 'users/' + username, {
        headers: {Authorization: `Bearer ${accessToken}`}
      }).pipe(map(res => console.log(res)))
    }
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }

  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer' + token,
        }
      )
    }).pipe(
      map(response => this.extractResponseData),
      catchError(this.handleError)
    )
  }

  

  private extractResponseData(res: Response): any {
    const body = res;
    return body || {}
  }


}


// export class FetchApiDataService {
//   constructor() { }

  

// }
