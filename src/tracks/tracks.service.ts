import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Track } from './track.entity';
import { FavsService } from '../favs/favs.service';

@Injectable()
export class TracksService {
  private tracks: Track[] = [];

  constructor(private favs: FavsService) {}

  findAll() {
    return this.tracks;
  }

  findOne(id: string) {
    return this.tracks.find(t => t.id === id);
  }

  create(dto: { name: string; duration: number; artistId?: string | null; albumId?: string | null }) {
    const t: Track = {
      id: uuidv4(),
      name: dto.name,
      duration: dto.duration,
      artistId: dto.artistId ?? null,
      albumId: dto.albumId ?? null,
    };
    this.tracks.push(t);
    return t;
  }

  update(id: string, dto: { name: string; duration: number; artistId?: string | null; albumId?: string | null }) {
    const found = this.findOne(id);
    if (!found) throw new NotFoundException('Track not found');

    found.name = dto.name;
    found.duration = dto.duration;
    found.artistId = dto.artistId ?? null;
    found.albumId = dto.albumId ?? null;

    return found;
  }

  delete(id: string) {
    const idx = this.tracks.findIndex(t => t.id === id);
    if (idx === -1) throw new NotFoundException('Track not found');

    const [removed] = this.tracks.splice(idx, 1);

    this.favs.removeTrackReferences(id);

    return removed;
  }

  getAllRef() {
    return this.tracks;
  }
}
