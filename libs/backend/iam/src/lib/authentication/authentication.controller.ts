import { ActiveUser, ActiveUserData } from '@be/common';
import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { toFileStream } from 'qrcode';
import { AuthenticationService } from './authentication.service';
import { Auth } from './decorators/auth.decorator';
import { RefreshTokenDto } from './dto/refresh-token.dto/refresh-token.dto';
import { SignInDto } from './dto/sign-in.dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto/sign-up.dto';
import { AuthType } from './enums/auth-type.enum';
import { OtpAuthenticationService } from './otp-authentication/otp-authentication.service';

@Auth(AuthType.None) // This allows public routes
@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly otpAuthService: OtpAuthenticationService) {}

  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    return await this.authService.signUp(signUpDto);
  }


  @HttpCode(HttpStatus.OK) // by default @Post does 201, we wanted 200 - hence using @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(signInDto);
  }

  // Cookies approach
  @HttpCode(HttpStatus.OK) // by default @Post does 201, we wanted 200 - hence using @HttpCode(HttpStatus.OK)
  @Post('sign-in-cookies')
  async signInCookie(
    @Res({ passthrough: true}) response: Response,
    @Body() signInDto: SignInDto) {
    const accessToken = await this.authService.signIn(signInDto);
    response.cookie('accessToken', accessToken, {
      secure: true,
      httpOnly: true,
      sameSite: true,
    });
  }

  // Token refresh ask
  @HttpCode(HttpStatus.OK) // changed since the default is 201
  @Post('refresh-tokens')
  refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshTokens(refreshTokenDto);
  }

  // 2fa QR code generate
  @Auth(AuthType.Bearer)
  @HttpCode(HttpStatus.OK)
  @Post('2fa/generate')
  async generateQrCode(
    @ActiveUser() activeUser: ActiveUserData,
    @Res() response: Response,
  ) {
    const { secret, uri } = await this.otpAuthService.generateSecret(
      activeUser.email,
    );
    await this.otpAuthService.enableTfaForUser(activeUser.email, secret);
    response.type('png');
    return toFileStream(response, uri);
  }
}

