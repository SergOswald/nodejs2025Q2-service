import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class UsersService {
  private users = [];

  findAll() {
    return this.users.map(({ password, ...u }) => u);
  }

  findOnePublic(id: string) {
    const user = this.users.find(u => u.id === id);
    if (!user) throw new NotFoundException();
    const { password, ...rest } = user;
    return rest;
  }

  create(dto) {
    if (!dto.login || !dto.password) {
      throw new BadRequestException();
    }

    const user = {
      id: randomUUID(),
      login: dto.login,
      password: dto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.users.push(user);
    return this.findOnePublic(user.id);
  }

  updatePassword(id: string, oldPass: string, newPass: string) {
    const user = this.users.find(u => u.id === id);
    if (!user) throw new NotFoundException();
    if (user.password !== oldPass) throw new BadRequestException();

    user.password = newPass;
    user.version++;
    user.updatedAt = Date.now();

    return this.findOnePublic(id);
  }

  delete(id: string) {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) throw new NotFoundException();
    this.users.splice(index, 1);
  }
}
