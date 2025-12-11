import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
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
    if (!res) throw new NotFoundException('Artist not found');
    return res;
  }

  @Post()
  @HttpCode(201)
  create(@Body() dto: CreateArtistDto) {
    if (!dto?.name) throw new BadRequestException('Missing name');
    return this.svc.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: CreateArtistDto) {
    ensureUuidOrThrow(id, 'artistId');

    if (!dto?.name) throw new BadRequestException('Missing name');

    const updated = this.svc.update(id, dto);
    if (!updated) throw new NotFoundException('Artist not found');

    return updated;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    ensureUuidOrThrow(id, 'artistId');
    const deleted = this.svc.delete(id);
    if (!deleted) throw new NotFoundException('Artist not found');
  }
}
