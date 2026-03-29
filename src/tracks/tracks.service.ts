import { Injectable, Inject, forwardRef, 
  UnprocessableEntityException,  NotFoundException } from '@nestjs/common';

import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';

@Injectable()
export class TracksService {
  constructor(
    @Inject(forwardRef(() => AlbumsService))
    private readonly albumsService: AlbumsService,

    @Inject(forwardRef(() => ArtistsService))
    private readonly artistsService: ArtistsService,
  ) {}

  private tracks = [];

  findAll() {
    return this.tracks;
  }

  findOne(id: string) {
    const track = this.tracks.find((a) => a.id === id);
  
    if (!track) {
      throw new NotFoundException();
    }
  
    return track;
  }
  
  

  create(data) {
    if (data.artistId !== null) {
      try {
        this.artistsService.findOne(data.artistId);
      } catch {
        throw new UnprocessableEntityException();
      }
    }

    if (data.albumId !== null) {
      try {
        this.albumsService.findOne(data.albumId);
      } catch {
        throw new UnprocessableEntityException();
      }
    }
    
    const track = {
      id: crypto.randomUUID(),
      ...data,
    };

    this.tracks.push(track);
    return track;
  }

  update(id: string, data) {
    const track = this.findOne(id);
    if (!track) return null;

    if (data.artistId) {
      this.artistsService.findOne(data.artistId);
    }

    if (data.albumId) {
      this.albumsService.findOne(data.albumId);
    }

    Object.assign(track, data);
    return track;
  }

  
  remove(id: string): void {
    const index = this.tracks.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new NotFoundException();
    }
  
    this.tracks.splice(index, 1);
  }
  

  removeAlbum(albumId: string) {
    this.tracks.forEach((track) => {
      if (track.albumId === albumId) {
        track.albumId = null;
      }
    });
  }

  removeArtist(artistId: string) {
    this.tracks.forEach((track) => {
      if (track.artistId === artistId) {
        track.artistId = null;
      }
    });
  }
  
  resetArtist(artistId: string) {
    this.removeArtist(artistId);
  }
  
}
