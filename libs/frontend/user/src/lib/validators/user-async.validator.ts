import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map } from 'rxjs/operators';
import { UsersService } from '../services/users.service';

// Async validators for the email (verify that the email is not already used)
export function userEmailValidator(userService: UsersService):AsyncValidatorFn  {
    return (control: AbstractControl) => {
        return userService.getAllUserItems()
            .pipe(
                map(users => {
                    const user= users.find(
                        user => user.email?.toLowerCase()
                            == control.value.toLowerCase() );
                    return user ? {emailExists:true} : null; // null =  the email does-not exist
                })
            )

    }
}


// Async validators for the nickName (verify that the nickName is not already used)
export function userNickNameValidator(userService: UsersService):AsyncValidatorFn  {
  return (control: AbstractControl) => {
      return userService.getAllUserItems()
          .pipe(
              map(users => {
                  const user= users.find(
                      user => user.nickName?.toLowerCase()
                          == control.value.toLowerCase() );
                  return user ? {nickNameExists:true} : null; // null =  the nickName does-not exist
              })
          )

  }
}
