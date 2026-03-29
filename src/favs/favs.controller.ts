import { Controller, Get, Post, Delete, Param, HttpCode, ParseUUIDPipe } from '@nestjs/common';
import { FavsService } from './favs.service';


@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  getAll() {
    return this.favsService.getAll();
  }

  @Post('artist/:id')
  addArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    this.favsService.addArtist(id);
  }


  @Post('album/:id')
  addAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    this.favsService.addAlbum(id);
  }

  @Post('track/:id')
  addTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    this.favsService.addTrack(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    this.favsService.removeArtist(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      this.favsService.removeAlbum(id);
    } catch {}
    
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      this.favsService.removeTrack(id);
    } catch {}
    
  }
}
