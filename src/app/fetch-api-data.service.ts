import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';


//Declaring the api url that will provide data for the client app
const apiUrl = 'https://myflix-z4g1.onrender.com/';

/**
 * @description Service for user registration operations.
 * @injectable
*/
@Injectable({
  providedIn: 'root'
})

  /**
    * @constructor
    * @param {HttpClient} http - Angular's HttpClient module for making HTTP requests.
    * @param {DataService} dataService - Service for handling shared data between components.
  */
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }

  /**
    * @description Make an API call for user registration.
    * @param {any} userDetails - User details for registration.
    * @returns {Observable<any>} - Observable for the API response.
  */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }
  /**
    * @description Make an API call for user login.
    * @param {any} userDetails - User details for login.
    * @returns {Observable<string>} - Observable for the API response containing the user token.
  */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
    catchError(this.handleError)
    );
  }
  /**
    * @description Make an API call to retrieve all movies.
    * @returns {Observable<any>} - Observable for the API response containing all movies.
  */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
   
  /**
    * @description Extract non-typed response data from the API response.
    * @param {any} res - API response.
    * @returns {any} - Extracted response data.
    * @private
  */
  private extractResponseData(res: Object): any {
    const body = res;
    return body || {};
  }

  /**
    * @description Make an API call to retrieve a single movie.
    * @param {string} movieTitle - title of the movie to be retrieved.
    * @returns {Observable<any>} - Observable for the API response containing the requested movie.
  */
  getOneMovies(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + title, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  /**
    * @description Make an API call to retrieve a director by name.
    * @param {string} directorName - Name of the director to be retrieved.
    * @returns {Observable<any>} - Observable for the API response containing the requested director.
  */
  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/directors/:Name', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  /**
    * @description Make an API call to retrieve a genre by name.
    * @param {string} genreName - Name of the genre to be retrieved.
    * @returns {Observable<any>} - Observable for the API response containing the requested genre.
  */
  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genre/:Name', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
   /**
    * @description Make an API call to retrieve a user by username.
    * @param {string} username - Username of the user to be retrieved.
    * @returns {Observable<any>} - Observable for the API response containing the requested username.
    */
  getUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user;
  }
  // Making the api call for the Get Favorite Movies for a user endpoint
  getFavoriteMovies(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + username, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      map((data) => data.FavoriteMovies),
      catchError(this.handleError)
    );
  }
  // Making the api call for the Add a Movie to Favourite Movies endpoint
  addFavoriteMovies(movieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.post(apiUrl + 'users/' + username + '/movies/' + movieID, null, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  /**
    * @description Make an API call to edit user information.
    * @param {string} username - username of the user to be updated.
    * @returns {Observable<any>} - Observable for the API response.
  */
  editUser(userDetails: any): Observable<any> {
    console.log(userDetails);
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/' + userDetails.Username, userDetails, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  /**
    * @description Make an API call to delete a user.
    * @param {string} username - username of the user to be deleted.
    * @returns {Observable<any>} - Observable for the API response.
  */
  deleteUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + user.Username, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
    /**
    * @description Make an API call to delete a favorite movie for a user.
    * @param {string} username - username of the user.
    * @param {string} movieID - ID of the movie to be removed from favorites.
    * @returns {Observable<any>} - Observable for the API response.
    */
    deleteFavoriteMovies(MovieID: string): Observable<any> {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('user');
      return this.http.delete(apiUrl + 'users/' + username + '/movies/' + MovieID, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
   /**
    * @description Handle HTTP errors and log them.
    * @param {HttpErrorResponse} error - HTTP error response.
    * @returns {any} - Error details.
    * @private
    */
  private handleError(error: HttpErrorResponse): any {
      if (error.error instanceof ErrorEvent) {
          console.error('Some error occurred:', error.error.message);
      } else {
          console.error(
              `Error Status code ${error.status}, ` +
              `Error body is: ${error.error}`
          );
      }
      throw 'Something bad happened; please try again later.';
  }
  
}