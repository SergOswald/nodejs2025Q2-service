import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { ArtistsService } from '../artists/artists.service';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';
import { FavoritesResponse } from '../models/types';

@Injectable()
export class FavsService {
  private favArtists = new Set<string>();
  private favAlbums = new Set<string>();
  private favTracks = new Set<string>();

  constructor(
    private artists: ArtistsService,
    private albums: AlbumsService,
    private tracks: TracksService
  ) {}

  getAll(): FavoritesResponse {
    const artists = [...this.favArtists]
      .map(id => this.artists.findOne(id))
      .filter(Boolean);

    const albums = [...this.favAlbums]
      .map(id => this.albums.findOne(id))
      .filter(Boolean);

    const tracks = [...this.favTracks]
      .map(id => this.tracks.findOne(id))
      .filter(Boolean);

    return { artists, albums, tracks };
  }

  addArtist(id: string) {
    const art = this.artists.findOne(id);
    if (!art) throw new UnprocessableEntityException('Artist not found');
    this.favArtists.add(id);
  }

  removeArtist(id: string) {
    if (!this.favArtists.has(id)) throw new NotFoundException('Artist is not favorite');
    this.favArtists.delete(id);
  }

  addAlbum(id: string) {
    const album = this.albums.findOne(id);
    if (!album) throw new UnprocessableEntityException('Album not found');
    this.favAlbums.add(id);
  }

  removeAlbum(id: string) {
    if (!this.favAlbums.has(id)) throw new NotFoundException('Album is not favorite');
    this.favAlbums.delete(id);
  }

  addTrack(id: string) {
    const tr = this.tracks.findOne(id);
    if (!tr) throw new UnprocessableEntityException('Track not found');
    this.favTracks.add(id);
  }

  removeTrack(id: string) {
    if (!this.favTracks.has(id)) throw new NotFoundException('Track is not favorite');
    this.favTracks.delete(id);
  }

  removeArtistReferences(artistId: string) {
    this.favArtists.delete(artistId);

    this.albums.getAllRef().forEach(a => {
      if (a.artistId === artistId) a.artistId = null;
    });

    this.tracks.getAllRef().forEach(t => {
      if (t.artistId === artistId) t.artistId = null;
    });
  }

  removeAlbumReferences(albumId: string) {
    this.favAlbums.delete(albumId);

    this.tracks.getAllRef().forEach(t => {
      if (t.albumId === albumId) t.albumId = null;
    });
  }

  removeTrackReferences(trackId: string) {
    this.favTracks.delete(trackId);
  }
}
