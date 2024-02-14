import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "@prisma/client";
import { ResourceService } from "./http-generic-service";

// Post Service
@Injectable({
  providedIn: 'root'
})
export class PostService extends ResourceService<Post>{

  constructor(protected httpClient: HttpClient ) {
    super(httpClient);
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

  constructor(protected httpClient: HttpClient ) {
    super(httpClient);
  }

  getResourceUrl(): string {
    return 'comments';
  }
}
