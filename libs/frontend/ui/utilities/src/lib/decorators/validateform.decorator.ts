// From: https://medium.com/@ddmytro787/practical-angular-decorators-2d516be1feb8

import { FormGroup } from '@angular/forms';
// 1. Define the function to be used as a decorator
// NOTE: In this case, it is a factory decorator because we want to
// pass input arguments here
export function ValidateForm(propertyName: string, cb?: Function) {
  return (target: any, methodName: string, descriptor: PropertyDescriptor) => {
    // 2. Get access to the original method
    const method = descriptor.value;
    // 3. Override the original method with form invalid check and
    // marking fields as touched and disabling executing the
    // body of the original method
    descriptor.value = function (...args: any[]) {
      // 4. Get access to the form
      const form = (this as { [key: string]: FormGroup })[propertyName];
      if (form?.status === 'INVALID') {
        // 5. Execute callback function in case we need some
        // additional logic before marking all fields as touched and
        // when the form is INVALID
        cb?.(this);
        form.markAllAsTouched();
        form.updateValueAndValidity();
        return;
      }
      // 6. If the form is valid, execute the original method
      return method.apply(this, args);
    };
  };
}
// 7. @ValidateForm decorator is ready to use

// Then, instead of the previous structure
/*
@Component({...})
export class TestComponent {
  form = new FormGroup({...});

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // make request here
  }
}

// We can optimize it by using @Unsubscribe decorator
@Component({...})
export class TestComponent {
  form = new FormGroup({...});

  @ValidateForm('form')
  submit() {
    // make request here
  }
}

// In case you need to run some custom logic, it will look like the following
@Component({...})
export class TestComponent {
  form = new FormGroup({...});
  someProperty = 'hello';

  @ValidateForm('form', (cmp: ValidateFormDialogComponent) => {
    console.log(cmp.someProperty);
  })
  submit() {
    // make request here
  }
}
*/
