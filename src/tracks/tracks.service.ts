import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class TracksService {
  private tracks = [];

  findAll() {
    return this.tracks;
  }

  findOne(id: string) {
    const track = this.tracks.find(t => t.id === id);
    if (!track) throw new NotFoundException();
    return track;
  }

  create(dto) {
    if (!dto.name || !dto.duration) {
      throw new BadRequestException();
    }

    const track = {
      id: randomUUID(),
      name: dto.name,
      artistId: dto.artistId ?? null,
      albumId: dto.albumId ?? null,
      duration: dto.duration,
    };

    this.tracks.push(track);
    return track;
  }

  update(id: string, dto) {
    const track = this.tracks.find(t => t.id === id);
    if (!track) throw new NotFoundException();

    Object.assign(track, dto);
    return track;
  }

  delete(id: string) {
    const index = this.tracks.findIndex(t => t.id === id);
    if (index === -1) throw new NotFoundException();
    this.tracks.splice(index, 1);
  }

  clearArtist(id: string) {
    this.tracks.forEach(t => {
      if (t.artistId === id) t.artistId = null;
    });
  }

  clearAlbum(id: string) {
    this.tracks.forEach(t => {
      if (t.albumId === id) t.albumId = null;
    });
  }
}
