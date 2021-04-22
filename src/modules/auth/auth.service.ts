import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(private userService : UserService,
      @InjectRepository(User)
      private UserRepository : Repository<User>,
              private jwtService : JwtService){
  }

  async validateUser(username: string, pass: string): Promise<any> {
      
      const login = await this.UserRepository.findOne({where:{username: username}});
      if (login && login.password === pass) {
        const { password, ...result } = login;
        return result;
      }
      return null;
  }

  async login(login: any) {
    
       const payload = { username: login.user.username, sub: login.user.id };
       return {
        access_token: this.jwtService.sign(payload),
      };
  }
}
