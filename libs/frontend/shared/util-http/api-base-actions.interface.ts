// Create an interface for strong typing. also for intellisense.
// from: https://medium.com/@zeeshankhan8838/best-practice-to-use-http-service-1f4378145620

import { Observable } from 'rxjs';

export type ParamsType = { hideLoader: boolean }

export interface IApiBaseActions {
  Get(url: string, params?: ParamsType): Observable<any>;

  GetAll(url: string, params?: ParamsType): Observable<any>;

  Post(url: string, data: any, params?: ParamsType): Observable<any>;

  Delete(url: string, data?: any, params?: ParamsType): Observable<any>;

  Put(url: string, data: any, params?: ParamsType): Observable<any>;

}
