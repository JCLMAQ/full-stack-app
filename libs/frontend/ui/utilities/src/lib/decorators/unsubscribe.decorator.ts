// From: https://medium.com/@ddmytro787/practical-angular-decorators-2d516be1feb8

import { Subscription } from "rxjs";

// 1. Define the function to be used as a decorator
export function Unsubscribe(
  target: any,
  methodName: string,
  description: PropertyDescriptor
) {
  // 2. Get access to the class
  const prototype = target.constructor.prototype;
  // 3. Define a variable for unsubscribing
  let subscription: Subscription;
  // 4. Get the original method
  const method = description.value;
  // 5. Override the original method and assign its response to the
  // subscription variable
  // NOTE: The return type must be Subscription
  description.value = function (...args: any[]) {
    subscription = method.apply(this, args);
  };
  // 6. Try to get the original ngOnDestroy method from the component or
  // define it as a simple void method
  const onDestroy = prototype.ngOnDestroy ?? (() => {});
  // 7. Override ngOnDestroy with our logic, but before executing
  // the original method if it was defined
  prototype.ngOnDestroy = function () {
    onDestroy.call(this);
    // 8. Use chaining logic to protect ourselves from using
    // the decorator in the wrong place and unsubscribing from the stream
    subscription?.unsubscribe?.();
  };
}
// 9. @Unsubscribe decorator is ready to use

// Then, instead of the previous structure
/*
@Component({...})
export class TestComponent implements OnInit, OnDestroy {
  subject = new Subject();
  subscription = new Subscription();

  constructor(private coursesService: CoursesService) {
    this.getCourses();
    this.getDataFromSubject();
  }

  ngOnInit(): void {
    let count = 0;
    setInterval(() => this.subject.next(count++), 2000);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getCourses(): void {
    this.isLoadingCourses = true;
    this.subscription.add(
      this.coursesService
        .getCourses()
        .pipe(
           tap((courses) => (this.dataSource.data = courses)),
           finalize(() => (this.isLoadingCourses = false)),
        )
        .subscribe(),
    );
  }

 getDataFromSubject(): void {
   this.subscription.add(this.subject.subscribe(console.log));
 }
}

// We can optimize it by using @Unsubscribe decorator
@Component({...})
export class TestComponent implements OnInit {
  subject = new Subject();

  constructor(private coursesService: CoursesService) {
    this.getCourses();
    this.getDataFromSubject();
  }

  ngOnInit(): void {
    let count = 0;
    setInterval(() => this.subject.next(count++), 2000);
  }

  @Unsubscribe
  getCourses(): Subscription {
    this.isLoadingCourses = true;
    // NOTE: return type has to be Subscription
    return this.coursesService
      .getCourses()
      .pipe(
         tap((courses) => (this.dataSource.data = courses)),
         finalize(() => (this.isLoadingCourses = false)),
      )
      .subscribe();
  }

  @Unsubscribe
  getDataFromSubject(): Subscription {
     // NOTE: return type has to be Subscription
     return this.subject.subscribe(console.log);
  }
}
*/
