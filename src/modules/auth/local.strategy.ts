import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    });
  }

  async validate(username : string, password: string): Promise<any> {
   
    const login = await this.authService.validateUser(username, password);
    
    if (!login) {
      throw new UnauthorizedException();
    }
    return login;
  }
}