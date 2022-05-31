import { Injectable } from '@nestjs/common';
import { CreateUserDTO, FindOneUserDTO } from './dto/Users.dto';
import * as bcrypt from 'bcrypt';
import { Role } from '../utils/enums/role.enum';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '../db/models';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(body: CreateUserDTO) {
    const cryptedPass = await bcrypt.hash(body.password, 14);

    const { password: _, ...user } = await this.prisma.user.create({
      data: {
        email: body.email,
        roles: [Role.USER],
        password: cryptedPass,
        profile: {
          create: {
            nick: body.nick,
          },
        },
      },
    });
    return user;
  }

  async findOne(filter: FindOneUserDTO): Promise<User | null> {
    if (!filter.email && !filter.id) return null;

    const user = await this.prisma.user.findUnique({
      where: filter,
    });

    return user ?? null;
  }
}
