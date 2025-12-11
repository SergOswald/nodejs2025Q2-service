import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { FavsService } from '../favs/favs.service';
import { Album } from './album.entity';
import { Track } from '../tracks/track.entity';


@Injectable()
export class AlbumsService {
  private albums: Album[] = [];

  constructor(private favs: FavsService) {}

  findAll() {
    return this.albums;
  }

  findOne(id: string) {
    return this.albums.find(a => a.id === id);
  }

  create(dto: { name: string; year: number; artistId?: string | null }) {
    const item: Album = {
      id: uuidv4(),
      name: dto.name,
      year: dto.year,
      artistId: dto.artistId ?? null
    };
    this.albums.push(item);
    return item;
  }

  update(id: string, dto: { name: string; year: number; artistId?: string | null }) {
    const found = this.findOne(id);
    if (!found) throw new NotFoundException('Album not found');

    found.name = dto.name;
    found.year = dto.year;
    found.artistId = dto.artistId ?? null;

    return found;
  }

  delete(id: string) {
    const idx = this.albums.findIndex(a => a.id === id);
    if (idx === -1) throw new NotFoundException('Album not found');

    const [removed] = this.albums.splice(idx, 1);

    this.favs.removeAlbumReferences(id);

    return removed;
  }

  getAllRef() {
    return this.albums;
  }
}
