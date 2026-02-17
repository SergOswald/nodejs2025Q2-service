import { Injectable, Inject, forwardRef, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { Album } from './album.entity';
import { CreateAlbumDto, UpdateAlbumDto } from './album.dto';
import { ArtistsService } from '../artists/artists.service';
import { TracksService } from '../tracks/tracks.service';

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

  findOne(id: string): Album {
    const album = this.albums.find((a) => a.id === id);

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return album;
  }

  create(dto: CreateAlbumDto): Album {
    const album: Album = {
      id: uuidv4(),
      name: dto.name,
      year: dto.year,
      artistId: dto.artistId ?? null,
    };

    this.albums.push(album);
    return album;
  }

  update(id: string, dto: UpdateAlbumDto): Album {
    const album = this.findOne(id);

    album.name = dto.name;
    album.year = dto.year;
    album.artistId = dto.artistId ?? null;

    return album;
  }

  remove(id: string): void {
    const exists = this.albums.some((a) => a.id === id);

    if (!exists) {
      throw new NotFoundException('Album not found');
    }

    this.albums = this.albums.filter((a) => a.id !== id);

    // обнуляем albumId у треков
    this.tracksService.removeAlbum(id);
  }

  // вызывается при удалении артиста
  resetArtist(artistId: string): void {
    this.albums.forEach((album) => {
      if (album.artistId === artistId) {
        album.artistId = null;
      }
    });
  }
}
