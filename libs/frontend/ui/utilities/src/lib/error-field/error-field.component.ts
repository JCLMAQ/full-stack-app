
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroupDirective } from '@angular/forms';
import { ValidationPipe } from '../pipes/validation.pipe';

// Source: https://blog.stackademic.com/mastering-angular-form-validation-best-practices-and-pro-tips-%EF%B8%8F-93d75c846f2b
/* Example of implemntation:
<form [formGroup]="formGroup">
  <label for="email">Email</label>
  <input id="email" type="email" formControlName="email">
  <app-error-field [control]="formGroup.controls['email']" [errorMessages]="validationMessages.email"></app-error-field>
  <button type="submit">Submit</button>
</form>
*/
@Component({
  selector: 'full-stack-app-error-field',
  standalone: true,
  imports: [
    ValidationPipe
],
  templateUrl: './error-field.component.html',
  styleUrl: './error-field.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorFieldComponent {
  formDirective = inject(FormGroupDirective);


  @Input() control!: FormControl | AbstractControl;
  // control = input.required<FormControl | AbstractControl>();
  @Input() errorMessages!: object;

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);
  // errorMessages = input.required<object>();

  constructor() {}
 // Add the following validation messages to the component
  validationMessages = {
    email: {
      required: 'Email is required',
      email: 'Please provide a valid email',
    },
    // Add more validation messages as needed for other form controls
  };

}

