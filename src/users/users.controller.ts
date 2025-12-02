import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    BadRequestException,
    NotFoundException,
    ForbiddenException,
  } from '@nestjs/common';
  import { CreateUserDto } from './dto/create-user.dto';
  import { UpdatePasswordDto } from './dto/update-password.dto';
  import { UsersService } from './users.service';
  import { ensureUuidOrThrow } from '../common/validators';
  
  @Controller('user')
  export class UsersController {
    constructor(private usersService: UsersService) {}
  
    @Get()
    getAll() {
      return this.usersService.findAll();
    }
  
    @Get(':id')
    getOne(@Param('id') id: string) {
      ensureUuidOrThrow(id, 'userId');
      try {
        return this.usersService.findOnePublic(id);
      } catch (e) {
        if (e instanceof NotFoundException) throw e;
        throw new BadRequestException('Bad request');
      }
    }
  
    @Post()
    create(@Body() dto: CreateUserDto) {
      if (!dto?.login || !dto?.password) {
        throw new BadRequestException('Missing required fields');
      }
      return { statusCode: 201, body: this.usersService.create(dto) };
    }
  
    @Put(':id')
    updatePassword(@Param('id') id: string, @Body() dto: UpdatePasswordDto) {
      ensureUuidOrThrow(id, 'userId');
      if (!dto || !dto.oldPassword || !dto.newPassword) {
        throw new BadRequestException('Missing required fields');
      }
      const updated = this.usersService.updatePassword(id, dto.oldPassword, dto.newPassword);
      if (updated === null) {
        throw new ForbiddenException('oldPassword is wrong');
      }
      return updated;
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      ensureUuidOrThrow(id, 'userId');
      try {
        this.usersService.delete(id);
      } catch (e) {
        if (e instanceof NotFoundException) throw e;
      }
      return { statusCode: 204 };
    }
  }
  