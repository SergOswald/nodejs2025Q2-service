import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  ParseUUIDPipe,
  BadRequestException,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { Artist } from './artist.entity';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  findAll(): Artist[] {
    return this.artistsService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id', ParseUUIDPipe) id: string): Artist {
    return this.artistsService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  create(@Body() body: Partial<Artist>): Artist {
    if (
      typeof body.name !== 'string' ||
      typeof body.grammy !== 'boolean'
    ) {
      throw new BadRequestException();
    }

    return this.artistsService.create({
      name: body.name,
      grammy: body.grammy,
    });
  }

  @Put(':id')
  @HttpCode(200)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: Partial<Artist>,
  ): Artist {
    if (
      typeof body.name !== 'string' ||
      typeof body.grammy !== 'boolean'
    ) {
      throw new BadRequestException();
    }

    return this.artistsService.update(id, {
      name: body.name,
      grammy: body.grammy,
    });
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseUUIDPipe) id: string): void {
    this.artistsService.remove(id);
  }
}
