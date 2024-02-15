import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, firstValueFrom, lastValueFrom, throwError } from 'rxjs';
import { TodoInterface, TodoPartialInterface, } from '../store/todo.model';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json',
    // Authorization: 'my-auth-token'
	})
};

export type TodoFilter = {
  ownerId: string;
  orgId: string;
}



@Injectable({
  providedIn: 'root',
})
export class TodoService {
  // export class TodoService implements DataService<TodoInterface, TodoFilter> {
  private readonly http = inject(HttpClient);

  private apiUrl = `api/`;
  private baseUrl = `${this.apiUrl}`;

  constructor(
    // private readonly http: HttpClient
    )
    { }

  load(): Promise<TodoInterface[]> {
    return this.findAsPromise();
  }

  private findAsPromise(): Promise<TodoInterface[]> {
    return firstValueFrom(this.find());
  }

  private find(): Observable<TodoInterface[]> {
    const url = [this.baseUrl, 'todos'].join('/');
    const ownerId = "";
    const orgId = "";
    // const params = new HttpParams()
    const params = new HttpParams().set('ownerId', ownerId).set('orgId', orgId);
    const headers = new HttpHeaders().set('Accept', 'application/json');
    return this.http.get<TodoInterface[]>(url, { params, headers });
  }

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

  // getItemsAsPromise(): Promise<TodoInterface[]>{
  //   return lastValueFrom(this.getItems());
  // }

  // getItems(): Observable<TodoInterface[]> {
  //   return this.http
  //     .get<TodoInterface[]>(`${this.baseUrl}/todos`, httpOptions)
  //     .pipe(
  //       catchError(this.handleError));;
  // }

  // getItem(id: string) {
  //   return this.http.get<TodoInterface>(`${this.baseUrl}/todo/${id}`);
  // }

  // addItem(value: string) {
  //   return this.http.todo<TodoInterface>(this.baseUrl, { value });
  // }

  // updateItem(value: TodoInterface) {
  //   return this.http.put<TodoInterface>(`${this.baseUrl}/${value?.id}`, value);
  // }

  // deleteItem(value: TodoInterface ) {
  //   return this.http.delete(`${this.baseUrl}/${value?.id}`);
  // }

  getItems(): Promise<TodoInterface[]>{
    const todos = lastValueFrom(this.http
      .get<TodoInterface[]>(`${this.baseUrl}/todos`, httpOptions)
      .pipe(
        catchError(this.handleError)));
        console.log("GetItems for Todos: ", todos)
    return todos
  }

  getItem(id: string): Promise<TodoInterface> {
    const item = lastValueFrom(this.http
      .get<TodoInterface>(`${this.baseUrl}/todo/${id}`)
      .pipe(
        catchError(this.handleError)));
    return item;
  }

  addItem(values: {
    content: string | null | undefined;
    title: string| null | undefined;
    ownerId: string;
    orgId: string
    }){
    const itemCreated = lastValueFrom(this.http
      .post<TodoInterface>(`${this.baseUrl}/createTodo`, values )
      .pipe(
        catchError(this.handleError)));
    return itemCreated
  }

  updateItem(data: TodoPartialInterface) {
    const itemUpdated: Promise<TodoPartialInterface> = lastValueFrom(this.http
      .put<TodoPartialInterface>(`${this.baseUrl}/updateTodo/${data?.id}`, data)
      .pipe(
        catchError(this.handleError)));
    return itemUpdated
  }

  deleteItem(id: string ) {
    const deletedItem = lastValueFrom(this.http
      .delete(`${this.baseUrl}/deletetodo/${id}`)
      .pipe(
        catchError(this.handleError)));
    return deletedItem
  }
}
