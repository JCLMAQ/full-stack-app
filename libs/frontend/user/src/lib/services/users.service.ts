import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ICreateUser, IUpdateUser, IUpsertUser, UserInterface } from '../+state/users.models';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json',
    // Authorization: 'my-auth-token'
	})
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl = 'api/users'; // URL to web api

  constructor(
    private readonly http: HttpClient)
    { }

	private handleError(error: HttpErrorResponse) {
		if (error.error instanceof ErrorEvent) {
			// A client-side or network error occured. Handle it accordingly
			console.error('An error occured:', error.error.message);
		} else {
			// The backend returned an unsuccessful respone code.
			// The response body may contain clues as to what was wrong
			console.log(
				`Backend returned code ${error.status}, body was: ${error.status}`
			);
		}
		// return an observable wuth a user-facing error message
		return throwError(() => new Error('Something bad happened; please try again later.'));
	}


  getUsers(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(this.baseUrl, httpOptions)
   //  .pipe(

   //   catchError(this.handleError)
   //  )
  }

  // To be tested

  getAllUserItems(): Observable<UserInterface[]> {
    return this.http
      .get<UserInterface[]>(this.baseUrl, httpOptions)
      .pipe(
        map((results: any) => results.users),
        catchError(this.handleError));
  }

  getUserById(userId: string): Observable<UserInterface> {
    const url = `${this.baseUrl}/${userId}`;
    return this.http
    .get<UserInterface>(url, httpOptions)
    .pipe(catchError(this.handleError));
  }

  createUser(userData: ICreateUser): Observable<UserInterface> {
    return this.http
      .post<UserInterface>(this.baseUrl, userData, httpOptions)
      .pipe(catchError(this.handleError));
  }

  updateUser(userId: string | undefined, userData: IUpdateUser): Observable<UserInterface> {
    const url = `${this.baseUrl}/${userId}`;
    return this.http
      .patch<UserInterface>(url, userData, httpOptions)
      .pipe(catchError(this.handleError));
  }

  createOrUpdateUser(userId: string, userData: IUpsertUser): Observable<UserInterface> {
    const url = `${this.baseUrl}/${userId}`;
    return this.http
      .put<UserInterface>(url, userData, httpOptions)
      .pipe(catchError(this.handleError));
  }

  deleteUser(userId: string): Observable<never> {
    const url = `${this.baseUrl}/${userId}`; // DELETE api/users/42-5c-...
    return this.http
      .delete<never>(url, httpOptions)
      .pipe(catchError(this.handleError));
  }

  // public create(user: User): Observable<User> {
	// 	return this.http
	// 		.post<User>(this.baseUrl, user, httpOptions)
	// 		.pipe(catchError(this.handleError));
	// }

  // public findAll(): Observable<User[]> {
	// 	return this.http.get<User[]>(this.baseUrl, httpOptions).pipe(
	// 		map((results: any) => results.users),
	// 		catchError(this.handleError)
	// 	);
	// }

  // public delete(id: string): Observable<object> {
	// 	const url = `${this.baseUrl}/${id}`; // DELETE api/users/42-5c-...
	// 	return this.http
	// 		.delete(url, httpOptions)
	// 		.pipe(catchError(this.handleError));
	// }
}
