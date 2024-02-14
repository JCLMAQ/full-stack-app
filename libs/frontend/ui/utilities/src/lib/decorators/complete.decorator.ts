// From: https://medium.com/@ddmytro787/practical-angular-decorators-2d516be1feb8

// 1. Define the function to be used as a decorator
export function Complete(target: any, propertyName: string) {
  // 2. Get access to the class where our event is defined
  const prototype = target.constructor.prototype;
  // 3. Try to get the original ngOnDestroy method from the component or
  // define it as a simple void method
  const onDestroy = prototype.ngOnDestroy ?? (() => {});

  // 4. Override ngOnDestroy with our logic, but before executing
  // the original method if it was defined
  prototype.ngOnDestroy = function () {
    onDestroy.call(this);
    // 5. Use chaining logic to protect ourselves from using
    // the decorator in the wrong place and completing event
    this[propertyName]?.complete?.();
  };
}
// 6. @Complete decorator is ready to use

// Then, instead of the previous structure
/*
@Component({...})
export class TestDialogComponent implements OnDestroy {
  @Output() event = new EventEmitter();

  ngOnDestroy(): void {
    this.event.complete();
  }
}

// We can optimize it by using @Complete decorator
@Component({...})
export class TestDialogComponent implements OnDestroy {
  @Complete @Output() event = new EventEmitter();
}
*/
