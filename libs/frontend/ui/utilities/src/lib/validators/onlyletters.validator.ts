import { AbstractControl } from "@angular/forms";

export default function LetterValidator(control: AbstractControl): { [key: string]: any } | null {
  if(!control.value) return null;

  const reg = new RegExp("^[a-zA-Z]+$");
  return reg.test(control.value) ? null : { invalidSymbols: true };
}

/* Example usage base on: https://blog.stackademic.com/angular-custom-validation-creating-custom-validators-with-examples-fd4740500960
 this.submitForm = this.fb.group({
      name: ['', [LetterValidator]], // add validator here
    });


  <form [formGroup]="submitForm">
  <div>
    <mat-form-field>
      <mat-label>Name</mat-label>
      <input matInput type="text" placeholder="Name" formControlName="name" />

      <mat-error *ngIf="submitForm.controls['name'].hasError('invalidSymbols')">
        Only letters are allowed
      </mat-error>

    </mat-form-field>
  </div>
</form>

*/
