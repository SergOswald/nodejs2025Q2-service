import { Body, Controller, Delete, Get, Param, Post, Put, BadRequestException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { ArtistsService } from './artists.service';
import { ensureUuidOrThrow } from '../common/validators';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly svc: ArtistsService) {}

  @Get()
  getAll() {
    return this.svc.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    ensureUuidOrThrow(id, 'artistId');
    const res = this.svc.findOne(id);
    if (!res) throw new BadRequestException('Artist not found'); // will be 404 normally but we map later
    return res;
  }

  @Post()
  create(@Body() dto: CreateArtistDto) {
    if (!dto?.name) throw new BadRequestException('Missing required fields');
    return { statusCode: 201, body: this.svc.create(dto) };
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: CreateArtistDto) {
    ensureUuidOrThrow(id, 'artistId');
    if (!dto?.name) throw new BadRequestException('Missing required fields');
    return this.svc.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    ensureUuidOrThrow(id, 'artistId');
    return this.svc.delete(id);
  }
}
