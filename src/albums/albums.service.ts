import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { Album } from '../albums/album.entity';
import { ArtistsService } from '../artists/artists.service';
import { TracksService } from '../tracks/tracks.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AlbumsService {
  private albums: Album[] = [];

  constructor(
    @Inject(forwardRef(() => ArtistsService))
    private readonly artistsService: ArtistsService,
    private readonly tracksService: TracksService,
  ) {}

  findAll(): Album[] {
    return this.albums;
  }

  findOne(id: string): Album | null {
    return this.albums.find((a) => a.id === id) ?? null;
  }

  create(data: Omit<Album, 'id'>): Album {
    const album: Album = {
      id: uuidv4(),
      ...data,
    };

    this.albums.push(album);
    return album;
  }

  update(id: string, data: Partial<Album>): Album | null {
    const album = this.findOne(id);
    if (!album) return null;

    Object.assign(album, data);
    return album;
  }

  remove(id: string): void {
    this.albums = this.albums.filter((a) => a.id !== id);

    // обнуляем albumId у треков
    this.tracksService.removeAlbum(id);
  }

  resetArtist(artistId: string): void {
    this.albums.forEach((album) => {
      if (album.artistId === artistId) {
        album.artistId = null;
      }
    });
  }
  
  
}
