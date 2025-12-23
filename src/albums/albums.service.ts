import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { TracksService } from '../tracks/tracks.service';
import { FavsService } from '../favs/favs.service';

@Injectable()
export class AlbumsService {
  private albums = [];

  constructor(
    private tracksService: TracksService,
    private favsService: FavsService,
  ) {}

  findAll() {
    return this.albums;
  }

  findOne(id: string) {
    const album = this.albums.find(a => a.id === id);
    if (!album) throw new NotFoundException();
    return album;
  }

  create(dto) {
    if (!dto.name || !dto.year) {
      throw new BadRequestException();
    }

    const album = {
      id: randomUUID(),
      name: dto.name,
      year: dto.year,
      artistId: dto.artistId ?? null,
    };

    this.albums.push(album);
    return album;
  }

  update(id: string, dto) {
    const album = this.albums.find(a => a.id === id);
    if (!album) throw new NotFoundException();

    Object.assign(album, dto);
    return album;
  }

  delete(id: string) {
    const index = this.albums.findIndex(a => a.id === id);
    if (index === -1) throw new NotFoundException();

    this.tracksService.clearAlbum(id);
    this.favsService.removeAlbum(id);
    this.albums.splice(index, 1);
  }
}
