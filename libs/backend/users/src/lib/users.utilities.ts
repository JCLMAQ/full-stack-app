import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";

@Injectable()
export class UsersUtilities {


generateFullName(user: User): string | null | undefined {
    // Full Name replacement
    let fullName: string | null | undefined = user.firstName + " " + user.lastName;
    if((user.firstName == "") || (user.lastName == "")) {
      ( user.nickName == "") ? fullName = user.email : fullName = user.nickName
    }
    return fullName
  }


// Exclude keys from user
excludeForUser<User, Key extends keyof User>(
  user: User, ...keys: Key[] ): Omit<User, Key> {
  for (let key of keys) {
    delete user[key]
  }
  return user
}
// Example of use :
/*
const user = await prisma.user.findUnique({ where: 1 })
const userWithoutPassword = exclude(user, 'password')
*/


exclude<T, Key extends keyof T>(resultSet: T, ...keys: Key[]): Omit<T, Key> {
  for (let key of keys) {
    delete resultSet[key];
  }
  return resultSet;
}

}
