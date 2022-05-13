import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const apiUrl = 'https://greendragonflix.herokuapp.com/';


@Injectable({
  providedIn: 'root'
})

export class UserRegistrationService {

  constructor(private http: HttpClient) {}

  userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(catchError(this.handleError));
  }

  userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    //is this bad not to use .pipe( map(res => res) ) ?
    //HttpClient automatically returns the response body according to Angular Docs
    return this.http.post(apiUrl + 'login', userDetails).pipe(catchError(this.handleError))
    
  }

  getMovie(movieTitle: string | null): Observable<any> {
      let accessToken = localStorage.getItem('token');
      return this.http.get(apiUrl + 'movies/' + movieTitle, {
        headers: {Authorization: `Bearer ${accessToken}`}
      }).pipe(catchError(this.handleError))
    
  }

  getDirector(directorName: string): Observable<any> {
    const accessToken = localStorage.getItem('token');
    return this.http.get(apiUrl + 'directors/' + directorName, {
      headers: {Authorization: `Bearer ${accessToken}`}
    }).pipe(map(res => this.extractResponseData))
    
  }

  getGenre(genreName: string): Observable<any> {
    const accessToken = localStorage.getItem('token');
    return this.http.get(apiUrl + 'genres/' + genreName, {
      headers: {Authorization: `Bearer ${accessToken}`}
    }).pipe(map(res => this.extractResponseData))
  }

  getUser(): Observable<any> {
    const accessToken = localStorage.getItem("token");
    const username = localStorage.getItem("user");
    return this.http.get(apiUrl + 'users/' + username, {
      headers: {Authorization: `Bearer ${accessToken}`}
    })
  }

  //get favorite movies from user info (use info from getUser)

  addFavoriteMovie(movieID: string): Observable<any> {
    const accessToken = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    console.log('adding favorite movie...')
    return this.http.post(apiUrl + 'users/' + username + '/movies/' + movieID, movieID, {
      headers: {Authorization: `Bearer ${accessToken}`}
    }).pipe(catchError(this.handleError))
  }

  deleteFavoriteMovie(movieID: string): Observable<any> {
    const accessToken = localStorage.getItem("token");
    const username = localStorage.getItem('user');
    return this.http.delete(apiUrl + 'users/' + username + '/movies/' + movieID, {
      headers: {Authorization: `Bearer ${accessToken}`}
    }).pipe(catchError(this.handleError))
  }

  updateUser(userDetails: any): Observable<any> {
    const accessToken = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.put(apiUrl + 'users/' + username, userDetails, {
      headers: {Authorization: `Bearer ${accessToken}`}
    }).pipe(catchError(this.handleError))
    
  }

  deleteUser(username: string): Observable<any> {
    const accessToken = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/' + username, {
      headers: {Authorization: `Bearer ${accessToken}`}
    }).pipe(catchError(this.handleError))
  }

  handleError(error: HttpErrorResponse): any {
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

  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${token}`,
        }
      )
    })
  }

  private extractResponseData(res: Response): any {
    const body = res;
    return body || {}
  }

}

export class FetchApiDataService {
  
}
