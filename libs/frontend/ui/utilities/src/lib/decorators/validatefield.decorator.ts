// From: https://medium.com/@ddmytro787/practical-angular-decorators-2d516be1feb8

import { AbstractControl, Validators } from "@angular/forms";


export function Required(target: any, propertyName: string) {
  const prototype = target.constructor.prototype;
  const onInit = prototype.ngOnInit ?? (() => {});

  prototype.ngOnInit = function () {
    onInit.call(this);
    const control: AbstractControl = this[propertyName];
    control?.addValidators(Validators.required);
  };
}

export function MaxLength(length: number) {
  return (target: any, propertyName: string) => {
    const prototype = target.constructor.prototype;
    const onInit = prototype.ngOnInit ?? (() => {});

    prototype.ngOnInit = function () {
      onInit.call(this);
      const control: AbstractControl = this[propertyName];
      control?.addValidators(Validators.maxLength(length));
    };
  };
}

// Usage:
/*
@Component({...})
export class TestComponent {
  @Required
  @MaxLength(5)
  inputControl = new FormControl('');
  @Required
  @MaxLength(7)
  inputControl2 = new FormControl('');
  @Required
  startDateControl = new FormControl('');
  @Required
  endDateControl = new FormControl('');
  dateRangeControl = new FormGroup({
    startDate: this.startDateControl,
    endDate: this.endDateControl,
  });
  form = new FormGroup({
    input: this.inputControl,
    input2: this.inputControl2,
    dateRange: this.dateRangeControl,
  });

  @ValidateForm('form')
  submit() {
    // request here
  }
}
*/
