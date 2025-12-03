import { Controller, Delete, Get, Param, Post, BadRequestException } from '@nestjs/common';
import { FavsService } from './favs.service';
import { ensureUuidOrThrow } from '../common/validators';

@Controller('favs')
export class FavsController {
  constructor(private readonly svc: FavsService) {}

  @Get()
  getAll() {
    return this.svc.getAll();
  }

  @Post('artist/:id')
  addArtist(@Param('id') id: string) {
    ensureUuidOrThrow(id, 'artistId');
    try {
      this.svc.addArtist(id);
    } catch (e) {
      throw e;
    }
    return { statusCode: 201, message: 'Artist added to favorites' };
  }

  @Delete('artist/:id')
  removeArtist(@Param('id') id: string) {
    ensureUuidOrThrow(id, 'artistId');
    this.svc.removeArtist(id);
    return { statusCode: 204 };
  }

  @Post('album/:id')
  addAlbum(@Param('id') id: string) {
    ensureUuidOrThrow(id, 'albumId');
    this.svc.addAlbum(id);
    return { statusCode: 201, message: 'Album added to favorites' };
  }

  @Delete('album/:id')
  removeAlbum(@Param('id') id: string) {
    ensureUuidOrThrow(id, 'albumId');
    this.svc.removeAlbum(id);
    return { statusCode: 204 };
  }

  @Post('track/:id')
  addTrack(@Param('id') id: string) {
    ensureUuidOrThrow(id, 'trackId');
    this.svc.addTrack(id);
    return { statusCode: 201, message: 'Track added to favorites' };
  }

  @Delete('track/:id')
  removeTrack(@Param('id') id: string) {
    ensureUuidOrThrow(id, 'trackId');
    this.svc.removeTrack(id);
    return { statusCode: 204 };
  }
}
