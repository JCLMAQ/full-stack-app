import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { createPasswordStrengthValidator } from '../validators/password-strength.validator';
import { OnlyOneErrorPipe } from '../../pipes/only-one-error.pipe';
import { JsonPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [MatCardModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, JsonPipe, OnlyOneErrorPipe]
})
export class LoginComponent implements OnInit {

  hidePassword = true;
  loading = false;
  submitted = false;
  loginForm!: FormGroup


  constructor(
      private fb:FormBuilder,
      private authService: AuthService,
      private router:Router,
      ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['',{
        validators: [ Validators.required, Validators.email, ],
        updateOn: 'blur'
        }
      ],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        createPasswordStrengthValidator(),
        ]
      ]
    });
  }

  get email() {return this.loginForm.controls['email'];}
  get password() {return this.loginForm.controls['password'];}


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

  // cancelLogin() {

  // }

  register() {
    this.router.navigate(['register']);
  }

  backhome() {
    this.router.navigate(['home']);
  }

  forget() {
    this.router.navigate(['forgotpwd']);
  }

}
