
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroupDirective } from '@angular/forms';
import { ValidationPipe } from '../pipes/validation.pipe';

// Source: https://blog.stackademic.com/mastering-angular-form-validation-best-practices-and-pro-tips-%EF%B8%8F-93d75c846f2b

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
  @Input() control!: FormControl | AbstractControl;
  @Input() errorMessages!: object;

  constructor(public formDirective: FormGroupDirective) {}
}

