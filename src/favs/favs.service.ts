import {
  Injectable,
  UnprocessableEntityException,
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
      artists: this.artists.map((id) => this.artistsService.getOne(id)),
      albums: this.albums.map((id) => this.albumsService.findOne(id)),
      tracks: this.tracks.map((id) => this.tracksService.findOne(id)),
    };
  }

  addArtist(id: string): void {
    this.artistsService.getOne(id);
    this.artists.push(id);
  }

  addAlbum(id: string): void {
    this.albumsService.findOne(id);
    this.albums.push(id);
  }

  addTrack(id: string): void {
    this.tracksService.findOne(id);
    this.tracks.push(id);
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
      throw new UnprocessableEntityException();
    }
    collection.splice(index, 1);
  }
}
