import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const apiUrl = 'https://greendragonflix.herokuapp.com/';


@Injectable({
  providedIn: 'root'
})

export class UserRegistrationService {
  /**
   * @param http Constructor imports HttpClient
   */
  constructor(private http: HttpClient) {}

  /**
   * Function for registering a new user.
   * @param userDetails An object that contains the new user's username, email, password, and birthday.
   * @returns The http response to the user registration request from the API.
   */
  userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(catchError(this.handleError));
  }

  /**
   * Function that allows users to login.
   * @param userDetails An object that contains the user's username and password.
   * @returns If the user's username and password were correct, the function will return the token and the username for local storage.
   */

  userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    //is this bad not to use .pipe( map(res => res) ) ?
    //HttpClient automatically returns the response body according to Angular Docs
    return this.http.post(apiUrl + 'login', userDetails).pipe(catchError(this.handleError))
    
  }

  /**
   * Function that gets a specific movie from the API.
   * @param movieTitle A movie's title.
   * @returns An object with the specific movie's data including its title, director, genre, and description.
   */

  getMovie(movieTitle: string | null): Observable<any> {
      let accessToken = localStorage.getItem('token');
      return this.http.get(apiUrl + 'movies/' + movieTitle, {
        headers: {Authorization: `Bearer ${accessToken}`}
      }).pipe(catchError(this.handleError))
    
  }

  /**
   * Function that gets information about a specific director.
   * @param directorName A director's name as a string.
   * @returns An object with information about the director, including their name, birth year, and biography.
   */

  getDirector(directorName: string): Observable<any> {
    const accessToken = localStorage.getItem('token');
    return this.http.get(apiUrl + 'directors/' + directorName, {
      headers: {Authorization: `Bearer ${accessToken}`}
    }).pipe(map(res => this.extractResponseData))
    
  }

  /**
   * Function that gets information about a specific genre.
   * @param genreName A specific genre's name as a string.
   * @returns An object with information about the genre including the genre's name and description.
   */

  getGenre(genreName: string): Observable<any> {
    const accessToken = localStorage.getItem('token');
    return this.http.get(apiUrl + 'genres/' + genreName, {
      headers: {Authorization: `Bearer ${accessToken}`}
    }).pipe(map(res => this.extractResponseData))
  }

  /**
   * Function that gets information about the current user.
   * @returns An object with information about a user including their username, email, birthday, hashed password, and favorite movies.
   */

  getUser(): Observable<any> {
    const accessToken = localStorage.getItem("token");
    const username = localStorage.getItem("user");
    return this.http.get(apiUrl + 'users/' + username, {
      headers: {Authorization: `Bearer ${accessToken}`}
    })
  }

  
  /**
   * Function that adds a new favorite movie to the user's favorite movies.
   * @param movieID The movie ID of the movie to add as a string.
   * @returns A response status ensuring the movie has been added.
   */

  addFavoriteMovie(movieID: string): Observable<any> {
    const accessToken = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    console.log('adding favorite movie...')
    return this.http.post(apiUrl + 'users/' + username + '/movies/' + movieID, movieID, {
      headers: {Authorization: `Bearer ${accessToken}`}
    }).pipe(catchError(this.handleError))
  }

  /**
   * Function that deletes a favorite movie from the user's favorite movies.
   * @param movieID The movie ID of the movie to delete as a string.
   * @returns A response status ensuring the movie has been deleted.
   */
  deleteFavoriteMovie(movieID: string): Observable<any> {
    const accessToken = localStorage.getItem("token");
    const username = localStorage.getItem('user');
    return this.http.delete(apiUrl + 'users/' + username + '/movies/' + movieID, {
      headers: {Authorization: `Bearer ${accessToken}`}
    }).pipe(catchError(this.handleError))
  }

  /**
   * Function that allows a user to update their information.
   * @param userDetails An object with the user's updated and old information including the username, password, email, birthday, and favorite movies.
   * @returns A response status ensuring the user's information has been updated.
   */

  updateUser(userDetails: any): Observable<any> {
    const accessToken = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.put(apiUrl + 'users/' + username, userDetails, {
      headers: {Authorization: `Bearer ${accessToken}`}
    }).pipe(catchError(this.handleError))
    
  }

  /**
   * Function that allows the user to delete their profile.
   * @param username The user's username as a string.
   * @returns A response status indicating the success or failure of the deletion.
   */
  deleteUser(username: string): Observable<any> {
    const accessToken = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/' + username, {
      headers: {Authorization: `Bearer ${accessToken}`}
    }).pipe(catchError(this.handleError))
  }

  /**
   * Error-handling function.
   * @param error Http response error from any API call.
   * @returns Specific error in console, as well as a string that warns the user the request did not go through.
   */

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

  /**
   * Function that gets all movies.
   * @returns An array with all the movies in the database as objects.
   */

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

  /**
   * Helper function that allows service functions to format response data.
   * @param res Response from any API call.
   * @returns The response, or an empty object.
   */
  private extractResponseData(res: Response): any {
    const body = res;
    return body || {}
  }

}

export class FetchApiDataService {
  
}
