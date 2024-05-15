import { HttpClient, HttpContext, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from '@fe/shared/util-signal-store';
import { Observable, catchError, firstValueFrom, lastValueFrom, throwError } from 'rxjs';
import { PostInterface, PostPartialInterface } from '../store/post.interface';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json',
    // Authorization: 'my-auth-token'
	})
};

export type PostFilter = {
  ownerId: string;
  orgId: string;
}

@Injectable({
  providedIn: 'root',
})
export class PostService implements DataService<PostInterface, PostFilter> {
  // private readonly http = inject(HttpClient);

  private apiUrl = `api/`;
  // private baseUrl = `${this.apiUrl}posts`; //postswithrelated
  private baseUrl = `${this.apiUrl}`;

  constructor(
    private readonly http: HttpClient)
    { }

  load(): Promise<PostInterface[]> {
    return this.findAsPromise();
  }

  private findAsPromise(): Promise<PostInterface[]> {
    return firstValueFrom(this.find());
  }

  private find(): Observable<PostInterface[]> {
    const url = [this.baseUrl, 'posts'].join('/');
    const params = new HttpParams();
    // const params = new HttpParams().set('ownerId', ownerId).set('orgId', orgId);
    const headers = new HttpHeaders().set('Accept', 'application/json');
    const context = new HttpContext();
    // const context = new HttpContext().set(SkipLoading, true); // Add this to avoid the loading indicator

    return this.http.get<PostInterface[]>(url, { params, headers, context });
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

  getItems(): Promise<PostInterface[]>{
    const posts = lastValueFrom(this.http
      .get<PostInterface[]>(`${this.baseUrl}/posts`, httpOptions)
      .pipe(
        catchError(this.handleError)));
        console.log("GetItems for Posts: ", posts)
    return posts
  }

  getItem(id: string): Promise<PostInterface> {
    const item = lastValueFrom(this.http
      .get<PostInterface>(`${this.baseUrl}/post/${id}`)
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
      .post<PostInterface>(`${this.baseUrl}/createPost`, values )
      .pipe(
        catchError(this.handleError)));
    return itemCreated
  }

  updateItem(data: PostPartialInterface) {
    const itemUpdated: Promise<PostPartialInterface> = lastValueFrom(this.http
      .put<PostPartialInterface>(`${this.baseUrl}/updatePost/${data?.id}`, data)
      .pipe(
        catchError(this.handleError)));
    return itemUpdated
  }

  deleteItem(id: string ) {
    const deletedItem = lastValueFrom(this.http
      .delete(`${this.baseUrl}/deletepost/${id}`)
      .pipe(
        catchError(this.handleError)));
    return deletedItem
  }

}
