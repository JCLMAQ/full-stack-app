import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Post } from "@prisma/client";
import { ResourceService } from "./http-generic-service";

// Post Service
@Injectable({
  providedIn: 'root'
})
export class PostService extends ResourceService<Post>{
  protected httpClient: HttpClient;

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);


  constructor() {
    const httpClient = inject(HttpClient);

    super(httpClient);
    this.httpClient = httpClient;

  }

  getResourceUrl(): string {
    return 'posts';
  }
}

// Comment Service

@Injectable({
  providedIn: 'root'
})
export class CommentService extends ResourceService<Comment>{
  protected httpClient: HttpClient;

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);


  constructor() {
    const httpClient = inject(HttpClient);

    super(httpClient);
    this.httpClient = httpClient;

  }

  getResourceUrl(): string {
    return 'comments';
  }
}
