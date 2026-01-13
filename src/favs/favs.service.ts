import { Injectable } from '@nestjs/common';
import { ArtistsService } from '../artists/artists.service';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';

interface Favs {
  artists: string[];
  albums: string[];
  tracks: string[];
}

@Injectable()
export class FavsService {
  private favs: Favs = {
    artists: [],
    albums: [],
    tracks: [],
  };

  constructor(
    private readonly artistsService: ArtistsService,
    private readonly albumsService: AlbumsService,
    private readonly tracksService: TracksService,
  ) {}

  findAll() {
    return {
      artists: this.favs.artists.map((id) => this.artistsService.findOne(id)),
      albums: this.favs.albums.map((id) => this.albumsService.findOne(id)),
      tracks: this.favs.tracks.map((id) => this.tracksService.findOne(id)),
    };
  }

  addArtist(id: string): void {
    this.artistsService.findOne(id);
    this.favs.artists.push(id);
  }

  removeArtist(id: string): void {
    this.favs.artists = this.favs.artists.filter((a) => a !== id);
  }

  addAlbum(id: string): void {
    this.albumsService.findOne(id);
    this.favs.albums.push(id);
  }

  removeAlbum(id: string): void {
    this.favs.albums = this.favs.albums.filter((a) => a !== id);
  }

  addTrack(id: string): void {
    this.tracksService.findOne(id);
    this.favs.tracks.push(id);
  }

  removeTrack(id: string): void {
    this.favs.tracks = this.favs.tracks.filter((t) => t !== id);
  }
}
