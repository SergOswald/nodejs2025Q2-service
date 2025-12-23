import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { TracksService } from '../tracks/tracks.service';
import { FavsService } from '../favs/favs.service';

@Injectable()
export class ArtistsService {
  private artists = [];

  constructor(
    private tracksService: TracksService,
    private favsService: FavsService,
  ) {}

  findAll() {
    return this.artists;
  }

  findOne(id: string) {
    const artist = this.artists.find(a => a.id === id);
    if (!artist) throw new NotFoundException();
    return artist;
  }

  create(dto) {
    if (!dto.name) throw new BadRequestException();

    const artist = {
      id: randomUUID(),
      name: dto.name,
      grammy: !!dto.grammy,
    };

    this.artists.push(artist);
    return artist;
  }

  update(id: string, dto) {
    const artist = this.artists.find(a => a.id === id);
    if (!artist) throw new NotFoundException();

    Object.assign(artist, dto);
    return artist;
  }

  delete(id: string) {
    const index = this.artists.findIndex(a => a.id === id);
    if (index === -1) throw new NotFoundException();

    this.tracksService.clearArtist(id);
    this.favsService.removeArtistReferences(id);
    this.artists.splice(index, 1);
  }
}
