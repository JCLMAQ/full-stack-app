import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthStore } from '@fe/auth/data-access';
import { DynamicFormComponent, Field, formsActions, ListErrorsComponent, ngrxFormsQuery } from '@fe/core/forms';
import { Store } from '@ngrx/store';


// From: https://github.com/stefanoslig/angular-ngrx-nx-realworld-example-app/tree/main
// Article: https://medium.com/@stefanoslig/angular-ngrx-nx-realworld-example-app-2a9d8c9a8e7e

const structure: Field[] = [
  {
    type: 'INPUT',
    name: 'email',
    placeholder: 'Email',
    validator: [Validators.required],
  },
  {
    type: 'INPUT',
    name: 'password',
    placeholder: 'Password',
    validator: [Validators.required],
    attrs: {
      type: 'password',
    },
  },
];

@Component({
  selector: 'full-stack-app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ListErrorsComponent, DynamicFormComponent, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, OnDestroy {
  private readonly store = inject(Store);
  private readonly authStore = inject(AuthStore);

  structure$ = this.store.select(ngrxFormsQuery.selectStructure);
  data$ = this.store.select(ngrxFormsQuery.selectData);

  ngOnInit() {
    this.store.dispatch(formsActions.setStructure({ structure }));
  }

  updateForm(changes: any) {
    this.store.dispatch(formsActions.updateData({ data: changes }));
  }

  submit() {
    this.authStore.login();
  }

  ngOnDestroy() {
    this.store.dispatch(formsActions.initializeForm());
  }
}
