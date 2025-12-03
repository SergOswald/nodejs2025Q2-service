import { Body, Controller, Delete, Get, Param, Post, Put, BadRequestException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { TracksService } from './tracks.service';
import { ensureUuidOrThrow } from '../common/validators';

@Controller('track')
export class TracksController {
  constructor(private readonly svc: TracksService) {}

  @Get()
  getAll() {
    return this.svc.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    ensureUuidOrThrow(id, 'trackId');
    const res = this.svc.findOne(id);
    if (!res) throw new BadRequestException('Track not found');
    return res;
  }

  @Post()
  create(@Body() dto: CreateTrackDto) {
    if (!dto?.name) throw new BadRequestException('Missing required fields');
    return { statusCode: 201, body: this.svc.create(dto) };
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: CreateTrackDto) {
    ensureUuidOrThrow(id, 'trackId');
    if (!dto?.name) throw new BadRequestException('Missing required fields');
    return this.svc.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    ensureUuidOrThrow(id, 'trackId');
    return this.svc.delete(id);
  }
}
