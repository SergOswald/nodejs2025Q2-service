import {
  Injectable,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { Artist } from './artist.entity';
import { v4 as uuidv4 } from 'uuid';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';
import { FavsService } from '../favs/favs.service';

@Injectable()
export class ArtistsService {
  private artists: Artist[] = [];

  constructor(
    @Inject(forwardRef(() => AlbumsService))
    private readonly albumsService: AlbumsService,
  
    @Inject(forwardRef(() => TracksService))
    private readonly tracksService: TracksService,
  
    @Inject(forwardRef(() => FavsService))
    private readonly favsService: FavsService,
  ) {}
  

  findAll(): Artist[] {
    return this.artists;
  }

  findOne(id: string): Artist {
    const artist = this.artists.find((a) => a.id === id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  create(data: Omit<Artist, 'id'>): Artist {
    const artist: Artist = {
      id: uuidv4(),
      name: data.name,
      grammy: data.grammy,
    };

    this.artists.push(artist);
    return artist;
  }

  update(id: string, data: Omit<Artist, 'id'>): Artist {
    const artist = this.findOne(id);

    artist.name = data.name;
    artist.grammy = data.grammy;

    return artist;
  }

  remove(id: string): void {
    const index = this.artists.findIndex((a) => a.id === id);
    if (index === -1) {
      throw new NotFoundException();
    }
  
    this.albumsService.resetArtist(id);
    this.tracksService.resetArtist(id);
  
    try {
      this.favsService.removeArtist(id);
    } catch {}
  
    this.artists.splice(index, 1);
  }
  
}
