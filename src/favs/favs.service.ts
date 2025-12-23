import {
  Injectable,
  BadRequestException,
  UnprocessableEntityException,
  NotFoundException,
} from '@nestjs/common';
import { ArtistsService } from '../artists/artists.service';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';

@Injectable()
export class FavsService {
  private readonly favs = {
    artists: [],
    albums: [],
    tracks: [],
  };

  constructor(
    private readonly artistsService: ArtistsService,
    private readonly albumsService: AlbumsService,
    private readonly tracksService: TracksService,
  ) {}

  getAll() {
    return this.favs;
  }

  addArtist(id: string) {
    const artist = this.artistsService.findOne(id);
    if (!artist) throw new UnprocessableEntityException();
    this.favs.artists.push(artist);
  }

  removeArtist(id: string) {
    const idx = this.favs.artists.findIndex(a => a.id === id);
    if (idx === -1) throw new NotFoundException();
    this.favs.artists.splice(idx, 1);
  }

  addAlbum(id: string) {
    const album = this.albumsService.findOne(id);
    if (!album) throw new UnprocessableEntityException();
    this.favs.albums.push(album);
  }

  removeAlbum(id: string) {
    const idx = this.favs.albums.findIndex(a => a.id === id);
    if (idx === -1) throw new NotFoundException();
    this.favs.albums.splice(idx, 1);
  }

  addTrack(id: string) {
    const track = this.tracksService.findOne(id);
    if (!track) throw new UnprocessableEntityException();
    this.favs.tracks.push(track);
  }

  removeTrack(id: string) {
    const idx = this.favs.tracks.findIndex(t => t.id === id);
    if (idx === -1) throw new NotFoundException();
    this.favs.tracks.splice(idx, 1);
  }

  removeArtistReferences(id: string) {
    this.favs.artists = this.favs.artists.filter(a => a.id !== id);
  }

  removeAlbumReferences(id: string) {
    this.favs.albums = this.favs.albums.filter(a => a.id !== id);
  }

  removeTrackReferences(id: string) {
    this.favs.tracks = this.favs.tracks.filter(t => t.id !== id);
  }
}
