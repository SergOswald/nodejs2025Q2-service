import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { ArtistsService, Artist } from './artists.service';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  getAll(): Artist[] {
    return this.artistsService.getAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseUUIDPipe) id: string): Artist {
    return this.artistsService.getOne(id);
  }

  @Post()
  create(@Body() body: Omit<Artist, 'id'>): Artist {
    return this.artistsService.create(body);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: Omit<Artist, 'id'>,
  ): Artist {
    return this.artistsService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseUUIDPipe) id: string): void {
    this.artistsService.remove(id);
  }
}
