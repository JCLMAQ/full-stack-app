


import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { tap } from "rxjs/internal/operators/tap";
import { responseMessage } from "../constants/response.constant";
import { IApiBaseActions, ParamsType } from "./api-base-actions.interface";

@Injectable({
  providedIn: 'root'
})
export class ApiHandlerService implements IApiBaseActions {
  httpClient = inject(HttpClient);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
  }

  Get(url: string, params?: ParamsType) {
    return this.httpClient
      .get(url, {params: this.createParams(params)})
      .pipe(tap((x) => this.HandleResponse(x)));
  }


  GetAll(url: string, params?: ParamsType) {
    return this.httpClient
      .get(url, {params: this.createParams(params)})
      .pipe(tap((x) => this.HandleResponse(x)));
  }

  Post(url: string, data: any, params?: ParamsType) {
    return this.httpClient
      .post(url, data, {params: this.createParams(params)})
      .pipe(tap((x) => this.HandleResponse(x)));
  }

  Delete(url: string, data:any, params?: ParamsType) {
    return this.httpClient
      .delete(url, {params: this.createParams(params)})
      .pipe(tap((x) => this.HandleResponse(x)));
  }

  Put(url: string, data: any, params?: ParamsType) {
    return this.httpClient
      .put(url, data, {params: this.createParams(params)})
      .pipe(tap((x) => this.HandleResponse(x)));
  }

  HandleResponse(response: any) {
    if (response.Status === 500) {
      alert(responseMessage.serverError);
    }
  }

  createParams(params?: ParamsType) {
    let httpParams = new HttpParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        httpParams = httpParams.append(key, value);
      });
    }
    return httpParams;
  }
}
