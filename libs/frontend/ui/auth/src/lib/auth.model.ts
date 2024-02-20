export interface IUserRegister {
  email: string;
  password: string;
  confirmPassword: string;
  lastName?: string;
  firstName?: string;
  nickName?: string;
  title?: string;
  gender?: string;
  role?: string;
}

export interface ICurrentUser {
  username?: string;
  fullName?: string;
}

export interface ILoginResponse {
  // authJwtToken: string;
  // user: User;
  access_token: string;
  fullName: string;
  role: string;
}

export interface IJwt {
  username?: string;
  role?: string;
  exp: string;
  iat: string;
  sub: string;
}

export interface IForgotEmail {
  message: string;
  success: boolean;
}

