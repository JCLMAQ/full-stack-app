import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordConfirmationValidator(controlName: string, matchingControlName: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const passwordControl = formGroup.get(controlName);
    const confirmPasswordControl = formGroup.get(matchingControlName);

    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }

    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
    } else {
      confirmPasswordControl.setErrors(null);
    }

    return null;
  };
}

/* base on: https://blog.stackademic.com/angular-custom-validation-creating-custom-validators-with-examples-fd4740500960

this.registrationForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(3)]],
      confirmPassword: ['', [Validators.required]],
    }, {
      validator: passwordConfirmationValidator('password', 'confirmPassword')
    });


    <form [formGroup]="registrationForm">

  <div>
    <mat-form-field>
      <mat-label>Password</mat-label>
      <input matInput formControlName="password" type="password" />
    </mat-form-field>
  </div>

  <mat-form-field>
    <mat-label>Confirm Password</mat-label>
    <input matInput formControlName="confirmPassword" type="password" />
    <mat-error *ngIf="registrationForm.controls['confirmPassword'].hasError('passwordMismatch')">
      Passwords do not match.
    </mat-error>
  </mat-form-field>
  <p>
    <button type="submit" [disabled]="registrationForm.invalid">Register</button>
  </p>

</form>
*/
