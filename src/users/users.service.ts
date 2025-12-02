import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../models/types';

@Injectable()
export class UsersService {
  private users: User[] = [];

  findAll(): Omit<User, 'password'>[] {
    return this.users.map(({ password, ...rest }) => rest);
  }

  findOneRaw(id: string): User | undefined {
    return this.users.find(u => u.id === id);
  }

  findOnePublic(id: string): Omit<User, 'password'> {
    const u = this.findOneRaw(id);
    if (!u) throw new NotFoundException('User not found');
    // hide password
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = u;
    return rest;
  }

  create(createDto: { login: string; password: string }) {
    const u: User = {
      id: uuidv4(),
      login: createDto.login,
      password: createDto.password,
    };
    this.users.push(u);
    const { password, ...publicUser } = u;
    return publicUser;
  }

  updatePassword(id: string, oldPass: string, newPass: string) {
    const user = this.findOneRaw(id);
    if (!user) throw new NotFoundException('User not found');
    if (user.password !== oldPass) {
      return null; // caller will translate to 403
    }
    user.password = newPass;
    const { password, ...publicUser } = user;
    return publicUser;
  }

  delete(id: string) {
    const idx = this.users.findIndex(u => u.id === id);
    if (idx === -1) throw new NotFoundException('User not found');
    this.users.splice(idx, 1);
  }
}
