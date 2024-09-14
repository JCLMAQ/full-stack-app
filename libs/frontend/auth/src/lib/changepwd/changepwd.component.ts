import { Component, OnInit, inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControlOptions,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { AuthService } from '../services/auth.service';
import { MustMatch, MustNotMatch } from '../validators/mustMatch.validator';
import { createPasswordStrengthValidator } from '../validators/password-strength.validator';
import { OnlyOneErrorPipe } from '../../pipes/only-one-error.pipe';
import { JsonPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-changepwd',
  templateUrl: './changepwd.component.html',
  styleUrls: ['./changepwd.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    JsonPipe,
    OnlyOneErrorPipe,
  ],
})
export class ChangepwdComponent implements OnInit {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  private store = inject<Store<AppState>>(Store);

  // changepwdForm: FormGroup;
  hidePassword = true;
  hidePassword2 = true;
  hidePassword3 = true;

  changepwdForm!: FormGroup;

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);
  // formOptions: AbstractControlOptions = { validators: [ MustMatch('newPassword', 'verifyPassword'), MustNotMatch('oldPassword', 'newPassword') ]};
  // changepwdForm = this.fb.group({
  //         oldPassword: ['', [
  //           Validators.required,
  //           Validators.minLength(8),]],
  //         newPassword: ['', [
  //           Validators.required,
  //           Validators.minLength(8),
  //           createPasswordStrengthValidator(),
  //           ]],
  //         verifyPassword: ['', [Validators.required]]
  //     }, this.formOptions);

  constructor() {
    const fb = this.fb;

    const formOptions: AbstractControlOptions = {
      validators: [
        MustMatch('newPassword', 'verifyPassword'),
        MustNotMatch('oldPassword', 'newPassword'),
      ],
    };
    this.changepwdForm = fb.group(
      {
        oldPassword: ['', [Validators.required, Validators.minLength(8)]],
        newPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            createPasswordStrengthValidator(),
          ],
        ],
        verifyPassword: ['', [Validators.required]],
      },
      formOptions,
    );
  }

  ngOnInit(): void {}

  get oldPassword() {
    return this.changepwdForm.get('oldPassword');
  }

  get newPassword() {
    return this.changepwdForm.get('newPassword');
  }

  get verifyPassword() {
    return this.changepwdForm.get('verifyPassword');
  }

  changePwd() {}

  backhome() {
    this.router.navigate(['home']);
  }
}
