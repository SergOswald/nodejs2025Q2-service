import {
  Injectable,
  UnprocessableEntityException,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common';


import { ArtistsService } from '../artists/artists.service';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';

@Injectable()
export class FavsService {
  private readonly artists: string[] = [];
  private readonly albums: string[] = [];
  private readonly tracks: string[] = [];

  constructor(
    @Inject(forwardRef(() => ArtistsService))
    private readonly artistsService: ArtistsService,
    private readonly albumsService: AlbumsService,
    private readonly tracksService: TracksService,
  ) {}

  getAll() {
    return {
      artists: this.artists
        .map((id) => {
          try {
            return this.artistsService.findOne(id);
          } catch {
            return null;
          }
        })
        .filter(Boolean),

      albums: this.albums
        .map((id) => {
          try {
            return this.albumsService.findOne(id);
          } catch {
            return null;
          }
        })
        .filter(Boolean),

      tracks: this.tracks
        .map((id) => {
          try {
            return this.tracksService.findOne(id);
          } catch {
            return null;
          }
        })
        .filter(Boolean),
    };
  }

  addArtist(id: string): void {
    try {
      this.artistsService.findOne(id);
    } catch {
      throw new UnprocessableEntityException();
    }
  
    if (!this.artists.includes(id)) {
      this.artists.push(id);
    }
  }
  
  addAlbum(id: string): void {
    try {
      this.albumsService.findOne(id);
    } catch {
      throw new UnprocessableEntityException();
    }
  
    if (!this.albums.includes(id)) {
      this.albums.push(id);
    }
  }
  
  addTrack(id: string): void {
    try {
      this.tracksService.findOne(id);
    } catch {
      throw new UnprocessableEntityException();
    }
  
    if (!this.tracks.includes(id)) {
      this.tracks.push(id);
    }
  }
  

  removeArtist(id: string): void {
    this.remove(this.artists, id);
  }

  removeAlbum(id: string): void {
    this.remove(this.albums, id);
  }

  removeTrack(id: string): void {
    this.remove(this.tracks, id);
  }


  private remove(collection: string[], id: string): void {
    const index = collection.indexOf(id);
  
    if (index === -1) {
      throw new NotFoundException();
    }
  
    collection.splice(index, 1);
  }
  
}


