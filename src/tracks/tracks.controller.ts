import { 
  Controller, Get, Post, Param, Delete, Body, Put, NotFoundException 
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiParam } from '@nestjs/swagger';
import { TracksService } from './tracks.service';
import { CreateTrackDto, UpdateTrackDto, TrackResponseDto } from './track.dto';

@ApiTags('Tracks')
@Controller('tracks')
export class TracksController {
  constructor(private readonly tracks: TracksService) {}

  @Get()
  @ApiResponse({ status: 200, type: [TrackResponseDto] })
  findAll() {
    return this.tracks.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, type: TrackResponseDto })
  @ApiResponse({ status: 404 })
  findOne(@Param('id') id: string) {
    const t = this.tracks.findOne(id);
    if (!t) throw new NotFoundException('Track not found');
    return t;
  }

  @Post()
  @ApiResponse({ status: 201, type: TrackResponseDto })
  create(@Body() dto: CreateTrackDto) {
    return this.tracks.create(dto);
  }

  @Put(':id')
  @ApiResponse({ status: 200, type: TrackResponseDto })
  @ApiResponse({ status: 404 })
  update(@Param('id') id: string, @Body() dto: UpdateTrackDto) {
    return this.tracks.update(id, dto);
  }

  @Delete(':id')
  @ApiResponse({ status: 204 })
  delete(@Param('id') id: string) {
    this.tracks.delete(id);
  }
}
