import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { MATERIAL } from '@fe/material';
import { OnlyOneErrorPipe } from '@fe/utilities';
import { AuthService } from '../services/auth.service';
import { createPasswordStrengthValidator } from '../validators/password-strength.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    ...MATERIAL,
    FormsModule,
    ReactiveFormsModule,
    JsonPipe,
    OnlyOneErrorPipe,
  ],
})
export class LoginComponent implements OnInit {
  hidePassword = true;
  loading = false;
  submitted = false;
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [
        '',
        {
          validators: [Validators.required, Validators.email],
          updateOn: 'blur',
        },
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          createPasswordStrengthValidator(),
        ],
      ],
    });
  }

  get email() {
    return this.loginForm.controls['email'];
  }
  get password() {
    return this.loginForm.controls['password'];
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value, null, 4));
    // reset alerts on submit
    // this.alertService.clear();
    // stop here if form is invalid

    this.loading = true;

    this.login();
  }

  async login() {
    const { email, password } = this.loginForm.value;
    // console.log("login: ", email, password )
    const isOK = await this.authService.login(email, password);
    if (isOK) {
      this.router.navigate(['/']);
    } else {
      alert('Email ou mot de passe invalide');
    }
  }

  cancelLogin() {
    this.router.navigate(['page/homepage']);
  }

  register() {
    this.router.navigate(['auth/register']);
  }

  backhome() {
    this.router.navigate(['page/homepage']);
  }

  forget() {
    this.router.navigate(['auth/forgotpwd']);
  }
}
