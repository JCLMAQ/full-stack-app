import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MATERIAL } from '@fe/material';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs';
import { UserInterface } from '../+state/users.models';
import { usersFeature } from '../+state/users.state';
import { UsersService } from '../services/users.service';
import { createPasswordStrengthValidator } from '../validators/password-strength.validator';


@Component({
  selector: 'lib-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    ...MATERIAL,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private usersService = inject(UsersService);
  private dateAdapter = inject<DateAdapter<Date>>(DateAdapter);


  private errorMsg?: string;

  public user: UserInterface | undefined | null;

  form!: FormGroup;
  userId!: string;
  isAddMode!: boolean;
  isAdmin!: boolean; // Needed to be sure that the user has an Id
  loading = false;
  submitted = false;
  hidePassword = true;
  mode: 'create' | 'update' | 'view' | undefined;
  formControls = {};

  private readonly store = inject(Store);
  // readonly selectedUser$ = this.store.select(usersFeature.selectSelectedUser);
  readonly selectedUser$ = this.store.pipe(select(usersFeature.selectSelectedUser));

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor(  // private alertService: AlertService,
  ) {
    this.mode = 'view'
  }

  ngOnInit(){
    this.userId = this.route.snapshot.params['id'];
    this.isAddMode = !this.userId; // Only for User profil
    this.mode = this.route.snapshot.params['mode'];
    // if(this.mode == 'view' ) { this.form.disable()}
  // console.log("mode: ", this.mode);
    // TODO verify isAdmin from the User logged
    this.isAdmin = false;
    // password not required in update mode
    const passwordValidators = [Validators.minLength(8)];
    if (this.isAddMode) {
        passwordValidators.push(Validators.required);
    }
    // const formOptions: AbstractControlOptions = { validators: MustMatch('password', 'confirmPassword') };

    this.formControls = {
      title: ['', []],
      email: ['', {
            validators: [ Validators.required, Validators.email, ],
            // asyncValidators: [userEmailValidator(this.usersService)],
            updateOn: 'blur'
            }],
      nickName: ['', {
            validators: [Validators.required, Validators.maxLength(10), Validators.minLength(3)],
            // asyncValidators: [userNickNameValidator(this.usersService)],
            updateOn: 'blur'
            }],
      lastName: ['', ],
      firstName: ['', ],
      // validates date format yyyy-mm-dd : dob = date of birth
      dob: ['', []],
    };

    if (this.mode === 'update' || this.mode ===  'view'){
      this.form = this.fb.group(this.formControls);

      this.selectedUser$.subscribe(event => this.user = event)
      this.form.patchValue({
        // id: this.user?.id,
        id: this.userId,
        title: this.user?.title,
        nickName: this.user?.nickName,
        firstName: this.user?.firstName,
        lastName: this.user?.lastName,
        email: this.user?.email,
        dob: this.user?.dob
      });
      // if(this.mode == 'view' ) { this.form.disable()}
    } else
        if (this.mode == 'create' || this.isAddMode ) {
        this.form = this.fb.group({
            ...this.formControls,
            password: ['', [Validators.minLength(8), this.isAddMode ? Validators.required : Validators.nullValidator,  createPasswordStrengthValidator(),]],
            confirmPassword: ['', this.isAddMode ? Validators.required : Validators.nullValidator],
            role: ['USER', this.isAdmin ? Validators.required : Validators.nullValidator],
            acceptTerms: [false, Validators.requiredTrue]
        });
      }

    // this.form.valueChanges
    // .subscribe(val => {
    //     const dobDate = val.dob;
    //     val.dob = dobDate.toDateString();
    // });

  } // end of ngOnInit

  get formField() {

    return this.form.controls;
  }
  // get dob(): Date{
  //   return this.formControls[dob].toDateString()

  onSubmit() {
    this.submitted = true;
    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.form.value, null, 4));
    // reset alerts on submit
    // this.alertService.clear();
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.loading = false
    if (this.mode == 'update') {
        this.save();
    } else {
        this.create();
    }
  }

  reload(id: string | undefined) {
    this.usersService.getAllUserItems()
    .pipe(
      map((users :UserInterface[]) => users.find((user :UserInterface)=> user.id === this.userId)))
    .subscribe((result) => {this.user = result} );
    if (this.mode == 'update' || 'view') {
    //   this.form.patchValue({...data.course})
      this.form.patchValue({
        id: this.user?.id,
        title: this.user?.title,
        nickName: this.user?.nickName,
        firstName: this.user?.firstName,
        lastName: this.user?.lastName,
        email: this.user?.email,
        dob: this.user?.dob
      });
    } else if (this.mode == 'create' || this.isAddMode ) {
      this.form = this.fb.group({
          ...this.formControls,
          password: ['', [Validators.minLength(8), this.isAddMode ? Validators.required : Validators.nullValidator,  createPasswordStrengthValidator(),]],
          confirmPassword: ['', this.isAddMode ? Validators.required : Validators.nullValidator],
          role: ['USER', this.isAdmin ? Validators.required : Validators.nullValidator],
          acceptTerms: [false, Validators.requiredTrue]
      });
    }
  }


  save() {
    const val = this.form.value;
    const dobIn = val.dob?.toISOString();
    // console.log("dobIn: ", dobIn)
    // const user: User = {
    //     ...this.user,
    //     ...this.form.value,
    // };
    const user: UserInterface = {
      id: this.user?.id,
      title: val?.title,
      firstName: val?.firstName,
      lastName: val?.lastName,
      email: val.email,
      nickName: val?.nickName,
      dob: dobIn
    }

    // console.log("User updated: ", user)
    // console.log("dob ", this.user?.dob)
    if (this.mode == 'update') {
        this.usersService.updateUser(user.id, user);
    } else if (this.mode == 'create') {

        // this.usersService.createUser(user, {isOptimistic: false})
        this.usersService.createUser(user)
            .subscribe(
                // newUser => {
                //     console.log('New Usere', newUser);
                // }
            );

    }
    this.router.navigate(['users']);
}

  add() {}

  create() {}

  cancel() {}

  remove() {}

  reset() {}

  virtualRemove() {}

  next() {}

  last() {}

  first() {}

  previous() {}

  async register() {
    // try {
    //   const res = await this.registerService.register(userToRegister);
    //   if(res && res.errorMessage){
    //     alert(res.errorMessage);
    //   }
    // } catch (e) {
    //   alert('Désolé, une erreur a eu lieu empéchant votre enregistrement');
    // }
    this.router.navigate(['login']);
  }

  onReset() {
    this.submitted = false;
    this.form.reset();
  }

  login() {
    this.router.navigate(['login']);
  }

  backHome() {
    this.router.navigate(['home']);
  }

  cancelRegister() {
    this.router.navigate(['home'])
  }



}
