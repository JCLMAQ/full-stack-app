// From: https://medium.com/@ddmytro787/practical-angular-decorators-2d516be1feb8
// and https://blog.stackademic.com/confirmation-logic-using-decorator-and-material-dialog-angular-34e75458a5dd



// export let AppInjector: Injector;
// export function setAppInject(injector: Injector) {
//   AppInjector = injector;
// }

// Then inside AppComponent if you're using standalone components or inside
// AppModule, we have to set the Injector
/*
@Component({...})
export class AppComponent {
  constructor(private injector: Injector) {
    setAppInject(this.injector);
  }
}
*/
import { MatDialog } from '@angular/material/dialog';
import { filter, tap } from 'rxjs';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { AppInjector } from './app-injector';

// 1. Define the function to be used as a decorator
// NOTE: In this case, it is a factory decorator because we want to
// pass input arguments here
export function Confirm(message: string) {
  return (target: any, methodName: string, descriptor: PropertyDescriptor) => {
    // 2. Get access to the original method
    const method = descriptor.value;
    // 3. Override the original method with injection MatDialog and
    // opening ConfirmDialogComponent with the message, also using the first
    // argument in the function as an identifier and replacing the string
    // for this
    descriptor.value = function (...args: any[]) {
      AppInjector.get(MatDialog)
        .open(ConfirmationDialogComponent, {
          minWidth: '400px',
          data: message.replace('{{id}}', `"${args[0]?.toString()}"`),
        })
        .afterClosed()
        .pipe(
          // 4. Default configuration for confirmation
          // if the dialog returns true, then we execute the original method
          // body if false, nothing is happening, and the action wasn't
          // confirmed
          filter((confirm) => !!confirm),
          tap(() => method.apply(this, args)),
        )
        .subscribe();
    };
  };
}
// 5. @Confirm decorator is ready to use

// Then, instead of the previous structure
/*
@Component({...})
export class TestComponent {
  constructor(private dialog: MatDialog) {
  }

  removeCourse(name: string) {
    this.dialog
      .open(ConfirmDialogComponent, { data: `Are you sure you want to remove following item: ${name}?` })
      .afterClosed()
      .pipe(
        filter((confirm) => !!confirm),
        tap(() => console.log(`Course "${name}" is removing...`)),
      )
      .subscribe();
  }
}

// We can optimize it by using @Unsubscribe decorator
@Component({...})
export class TestComponent {
  @Confirm('Are you sure you want to remove following item: {{id}}?')
  removeCourse(name: string) {
    console.log(`Course "${name}" is removing...`);
  }
}
*/
