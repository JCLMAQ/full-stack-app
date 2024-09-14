import { JsonPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgotpwd',
  templateUrl: './forgotpwd.component.html',
  styleUrls: ['./forgotpwd.component.scss'],
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
  ],
})
export class ForgotpwdComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  forgotPwdForm: FormGroup;

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    this.forgotPwdForm = this.fb.group({
      email: ['Your email', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {}

  get email() {
    return this.forgotPwdForm.get('email');
  }

  async sendforget() {
    // const res = await this.authService.sendEmailForgotPwd(email.value);
    // alert(res.message);
    this.router.navigate(['auth/login']);
  }

  backhome() {
    // this.router.navigate(['page/homepage']);
    this.router.navigate(['auth/login']);
  }
}
