import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Artist } from '../models/types';

@Injectable()
export class ArtistsService {
  private artists: Artist[] = [];

  findAll() {
    return this.artists;
  }

  findOne(id: string) {
    return this.artists.find(a => a.id === id);
  }

  create(dto: { name: string }) {
    const art: Artist = { id: uuidv4(), name: dto.name };
    this.artists.push(art);
    return art;
  }

  update(id: string, dto: { name: string }) {
    const found = this.findOne(id);
    if (!found) throw new NotFoundException('Artist not found');
    found.name = dto.name;
    return found;
  }

  delete(id: string) {
    const idx = this.artists.findIndex(a => a.id === id);
    if (idx === -1) throw new NotFoundException('Artist not found');
    const [removed] = this.artists.splice(idx, 1);
    return removed;
  }

  // below for other modules to access array
  getAllRef() {
    return this.artists;
  }
}
