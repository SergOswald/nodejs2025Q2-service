import { Body, Controller, Delete, Get, Param, Post, Put, BadRequestException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { AlbumsService } from './albums.service';
import { ensureUuidOrThrow } from '../common/validators';

@Controller('album')
export class AlbumsController {
  constructor(private readonly svc: AlbumsService) {}

  @Get()
  getAll() {
    return this.svc.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    ensureUuidOrThrow(id, 'albumId');
    const res = this.svc.findOne(id);
    if (!res) throw new BadRequestException('Album not found');
    return res;
  }

  @Post()
  create(@Body() dto: CreateAlbumDto) {
    if (!dto?.name) throw new BadRequestException('Missing required fields');
    return { statusCode: 201, body: this.svc.create(dto) };
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: CreateAlbumDto) {
    ensureUuidOrThrow(id, 'albumId');
    if (!dto?.name) throw new BadRequestException('Missing required fields');
    return this.svc.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    ensureUuidOrThrow(id, 'albumId');
    return this.svc.delete(id);
  }
}
