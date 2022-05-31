import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SendGridProducerService } from '../utils/jobs/sendgrid/sendgrid-producer.service';
import { Role } from '../utils/enums/role.enum';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private sendGridProducer: SendGridProducerService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const { password, ...user } = await this.userService.findOne({
      email: email,
    });
    if (!user) throw new UnauthorizedException("User doesn't exist");

    const valid = await bcrypt.compare(pass, password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    return user;
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      id: user.id,
      roles: user.roles,
    };
    return this.jwtService.sign(payload, { expiresIn: '3d' });
  }

  async verifyJwt(jwt): Promise<{
    expired: boolean;
    roles?: Role[];
    email?: string;
    id?: string;
    expiresIn?: number;
  }> {
    try {
      const decoded = await this.jwtService.verify(jwt);
      const { exp, access_until, roles, email, id } = decoded;

      if (access_until && access_until <= Date.now()) {
        return { expired: true };
      }

      if (exp > Date.now() / 1000) {
        return { expired: false, roles, email, expiresIn: exp, id };
      }

      return { expired: true };
    } catch (error) {
      return { expired: true };
    }
  }
}
