import { Injectable, Inject, forwardRef, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { FavsService } from '../favs/favs.service';

export interface Artist {
  id: string;
  name: string;
  grammy: boolean;
}

@Injectable()
export class ArtistsService {
  // ⬇️ ВОТ ЭТОГО ПОЛЯ НЕ ХВАТАЛО
  private readonly artists: Artist[] = [];

  constructor(
    @Inject(forwardRef(() => FavsService))
    private readonly favsService: FavsService,
  ) {}

  getAll(): Artist[] {
    return this.artists;
  }

  getOne(id: string): Artist {
    const artist = this.artists.find((a) => a.id === id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  create(data: Omit<Artist, 'id'>): Artist {
    const artist: Artist = {
      id: uuidv4(),
      ...data,
    };
    this.artists.push(artist);
    return artist;
  }

  update(id: string, data: Omit<Artist, 'id'>): Artist {
    const artist = this.getOne(id);
    artist.name = data.name;
    artist.grammy = data.grammy;
    return artist;
  }

  remove(id: string): void {
    const index = this.artists.findIndex((a) => a.id === id);
    if (index === -1) {
      throw new NotFoundException('Artist not found');
    }

    // ⬇️ важно для тестов
    this.favsService.removeArtist(id);

    this.artists.splice(index, 1);
  }
}
