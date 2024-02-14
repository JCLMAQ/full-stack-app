import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export abstract class ResourceService<T> {
  private readonly APIUrl = environment.API_URL + this.getResourceUrl();

  constructor(protected httpClient: HttpClient ) {
  }

  abstract getResourceUrl(): string;

  toServerModel(entity: T): any {
    return entity;
  }

  fromServerModel(json: any): T {
    return json;
  }

  getList(index: number, page: number): Observable<T[]> {
    let params = new HttpParams()
			.set('limit', index.toString())
			.set('offset', page.toString());

    return this.httpClient.get<T[]>(`/${this.APIUrl}}?${params.toString()}`)
      .pipe(
        map((list: any[]) => list.map((item)=> this.fromServerModel(item))),
        catchError(this.handleError)
      );
  }

  get(id: string | number): Observable<T> {
    return this.httpClient.get<T>(`/${this.APIUrl}}/${id}`)
      .pipe(
        map((json) => this.fromServerModel(json)),
        catchError(this.handleError)
      );
  }

  add(resource: T): Observable<any> {
    return this.httpClient.post(`/${this.APIUrl}}`, this.toServerModel(resource))
      .pipe(
        catchError(this.handleError)
      );
  }

  delete(id: string | number): Observable<any> {
    return this.httpClient.delete(`/${this.APIUrl}}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  update(resource: T) {
    return this.httpClient.put(`/${this.APIUrl}}`, this.toServerModel(resource))
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    // Handle the HTTP error here
    return throwError('Something wrong happened');
  }
}
