import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { UsersService } from '@fe/user';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export function uniqueUsernameValidator(userService: UsersService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const username = control.value as string;

    return userService.getUser(username).pipe(
      map(user => {
        // for testing we will return false if username is 'test'
        const isTaken = (username === 'test') ? false : !!user
        return (isTaken ? { usernameTaken: true } : null)
      }),
      catchError(() => of(null)) // In case of an error, we assume the username is available.
    );
  };
}

/* Example usage base on: https://blog.stackademic.com/angular-custom-validation-creating-custom-validators-with-examples-fd4740500960
this.userForm = this.fb.group({
      name: [
        '',
        [Validators.required],
        [uniqueUsernameValidator(this.userService)]
      ]
    })

    <mat-form-field>
      <mat-label>User name</mat-label>
      <input matInput type="text" placeholder="Name" formControlName="name" />
      <mat-error *ngIf="userForm.controls['name'].hasError('usernameTaken')">
        Username is taken
      </mat-error>
    </mat-form-field>
*/
