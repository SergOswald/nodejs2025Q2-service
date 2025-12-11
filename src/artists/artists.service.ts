import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { FavsService } from '../favs/favs.service';
import { Artist } from './artist.entity';


@Injectable()
export class ArtistsService {
  private artists: Artist[] = [];

  constructor(private favs: FavsService) {}

  findAll() {
    return this.artists;
  }

  findOne(id: string) {
    return this.artists.find(a => a.id === id);
  }

  create(dto: { name: string; grammy: boolean }) {
    const artist: Artist = {
      id: uuidv4(),
      name: dto.name,
      grammy: dto.grammy
    };
    this.artists.push(artist);
    return artist;
  }

  update(id: string, dto: { name: string; grammy: boolean }) {
    const found = this.findOne(id);
    if (!found) throw new NotFoundException('Artist not found');

    found.name = dto.name;
    found.grammy = dto.grammy;

    return found;
  }

  delete(id: string) {
    const idx = this.artists.findIndex(a => a.id === id);
    if (idx === -1) throw new NotFoundException('Artist not found');

    const [removed] = this.artists.splice(idx, 1);

    // очищаем ссылки в tracks, albums и favorites
    this.favs.removeArtistReferences(id);

    return removed;
  }

  getAllRef() {
    return this.artists;
  }
}
