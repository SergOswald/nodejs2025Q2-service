import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
} from '@nestjs/common';
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
    this.svc.addArtist(id);
  }

  @Delete('artist/:id')
  removeArtist(@Param('id') id: string) {
    ensureUuidOrThrow(id, 'artistId');
    this.svc.removeArtist(id);
  }

  @Post('album/:id')
  addAlbum(@Param('id') id: string) {
    ensureUuidOrThrow(id, 'albumId');
    this.svc.addAlbum(id);
  }

  @Delete('album/:id')
  removeAlbum(@Param('id') id: string) {
    ensureUuidOrThrow(id, 'albumId');
    this.svc.removeAlbum(id);
  }

  @Post('track/:id')
  addTrack(@Param('id') id: string) {
    ensureUuidOrThrow(id, 'trackId');
    this.svc.addTrack(id);
  }

  @Delete('track/:id')
  removeTrack(@Param('id') id: string) {
    ensureUuidOrThrow(id, 'trackId');
    this.svc.removeTrack(id);
  }
}
