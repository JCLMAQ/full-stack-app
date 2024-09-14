// Inheriting the base service or using Dependency injection. finally, we have a generic service
// for CRUD operation that is used throughout the application.

import { Injectable, inject } from '@angular/core';
import { ApiHandlerService } from './api-handler.service';

@Injectable({
  providedIn: 'root'
})
export class GenericService {
  private apiService = inject(ApiHandlerService);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
  }
  get(endpoint:string){
    return this.apiService.Get(`${AppSettings}`+endpoint)
  }

  post(endpoint:string,body?:any){
    return this.apiService.Post(`${AppSettings}`+endpoint,body)
  }

  put(endpoint:string,body?:any){
    return this.apiService.Put(`${AppSettings}`+endpoint,body)
  }

  delete(endpoint:string){
    return this.apiService.Delete(`${AppSettings}`+endpoint,null)
  }
}

/*
In this way, we follow the DRY principle and created a centralized service in our application.

In our component, we only pass the endpoint as argument.
 //pass endpoint as argument
 this.GenericService.get('personalDevelopmentAreas').subscribe({
      next:(response)=>{
        this.data = response;
      }
    })


   this.adminService.get('schools').subscribe({
      next:(response)=>{
        this.data = response;
      }
    })
  }

*/

