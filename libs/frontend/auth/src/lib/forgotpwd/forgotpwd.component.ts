import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { JsonPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-forgotpwd',
    templateUrl: './forgotpwd.component.html',
    styleUrls: ['./forgotpwd.component.scss'],
    standalone: true,
    imports: [MatCardModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, JsonPipe]
})
export class ForgotpwdComponent implements OnInit {

  forgotPwdForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.forgotPwdForm = this.fb.group({
      email: ['Your email', [
        Validators.required,
        Validators.email
      ]]
    });
  }

  ngOnInit(): void {

  }

  get email() {
    return this.forgotPwdForm.get('email');
  }

  async sendforget() {
    // const res = await this.authService.sendEmailForgotPwd(email.value);
    // alert(res.message);
    // this.router.navigate(['portal']);
  }

  backhome() {
    this.router.navigate(['home']);
  }

}
