import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private httpClient = inject(HttpClient);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  register(body: any): Promise<any> {
    return new Promise((resolve, reject) => {
      // Extraire seulement email et password pour l'endpoint IAM
      const signUpData = {
        email: body.email,
        password: body.password
      };
      this.userRegister(signUpData)
        .toPromise()
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error.message);
        });
    });
  }

  userRegister(user: { email: string; password: string }): Observable<any> {
    return this.httpClient.post<any>('api/authentication/sign-up', user);
  }
}
