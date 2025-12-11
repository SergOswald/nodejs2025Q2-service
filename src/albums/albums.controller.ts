import { 
  Controller, Get, Post, Param, Delete, Body, Put, NotFoundException 
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiParam } from '@nestjs/swagger';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto, UpdateAlbumDto, AlbumResponseDto } from './album.dto';

@ApiTags('Albums')
@Controller('albums')
export class AlbumsController {
  constructor(private readonly albums: AlbumsService) {}

  @Get()
  @ApiResponse({ status: 200, type: [AlbumResponseDto] })
  findAll() {
    return this.albums.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, type: AlbumResponseDto })
  @ApiResponse({ status: 404 })
  findOne(@Param('id') id: string) {
    const a = this.albums.findOne(id);
    if (!a) throw new NotFoundException('Album not found');
    return a;
  }

  @Post()
  @ApiResponse({ status: 201, type: AlbumResponseDto })
  create(@Body() dto: CreateAlbumDto) {
    return this.albums.create(dto);
  }

  @Put(':id')
  @ApiResponse({ status: 200, type: AlbumResponseDto })
  @ApiResponse({ status: 404 })
  update(@Param('id') id: string, @Body() dto: UpdateAlbumDto) {
    return this.albums.update(id, dto);
  }

  @Delete(':id')
  @ApiResponse({ status: 204 })
  delete(@Param('id') id: string) {
    this.albums.delete(id);
  }
}
