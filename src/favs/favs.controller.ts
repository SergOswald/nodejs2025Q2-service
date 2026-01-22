import { Controller, Get, Post, Delete, Param, HttpCode } from '@nestjs/common';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  getAll() {
    return this.favsService.getAll();
  }

  @Post('artist/:id')
  addArtist(@Param('id') id: string) {
    this.favsService.addArtist(id);
  }

  @Post('album/:id')
  addAlbum(@Param('id') id: string) {
    this.favsService.addAlbum(id);
  }

  @Post('track/:id')
  addTrack(@Param('id') id: string) {
    this.favsService.addTrack(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtist(@Param('id') id: string) {
    this.favsService.removeArtist(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbum(@Param('id') id: string) {
    this.favsService.removeAlbum(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeTrack(@Param('id') id: string) {
    this.favsService.removeTrack(id);
  }
}
