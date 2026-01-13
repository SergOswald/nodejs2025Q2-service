import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Artist } from './interfaces/artist.interface';

@Injectable()
export class ArtistsService {
  private artists: Artist[] = [];

  findAll(): Artist[] {
    return this.artists;
  }

  findOne(id: string): Artist {
    const artist = this.artists.find(a => a.id === id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  create(dto: { name: string; grammy: boolean }): Artist {
    const artist: Artist = {
      id: uuidv4(),
      name: dto.name,
      grammy: dto.grammy,
    };
    this.artists.push(artist);
    return artist;
  }

  update(id: string, dto: { name?: string; grammy?: boolean }): Artist {
    const artist = this.findOne(id);
    Object.assign(artist, dto);
    return artist;
  }

  delete(id: string): void {
    this.findOne(id);
    this.artists = this.artists.filter(a => a.id !== id);
  }
}
