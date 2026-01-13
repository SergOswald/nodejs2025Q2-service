import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

export interface Album {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}

@Injectable()
export class AlbumsService {
  private albums: Album[] = [];

  findAll(): Album[] {
    return this.albums;
  }

  findOne(id: string): Album {
    const album = this.albums.find((a) => a.id === id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  create(data: Omit<Album, 'id'>): Album {
    const album: Album = {
      id: uuidv4(),
      ...data,
    };
    this.albums.push(album);
    return album;
  }

  update(id: string, data: Omit<Album, 'id'>): Album {
    const album = this.findOne(id);
    Object.assign(album, data);
    return album;
  }

  remove(id: string): void {
    this.findOne(id);
    this.albums = this.albums.filter((a) => a.id !== id);
  }

  clearArtist(artistId: string): void {
    this.albums.forEach((a) => {
      if (a.artistId === artistId) {
        a.artistId = null;
      }
    });
  }
}
