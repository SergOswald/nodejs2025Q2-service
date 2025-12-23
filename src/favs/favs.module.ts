import { Module } from '@nestjs/common';
import { FavsController } from './favs.controller';
import { FavsService } from './favs.service';
import { ArtistsModule } from '../artists/artists.module';
import { AlbumsModule } from '../albums/albums.module';
import { TracksModule } from '../tracks/tracks.module';

@Module({
  imports: [ArtistsModule, AlbumsModule, TracksModule],
  controllers: [FavsController],
  providers: [FavsService],
})
export class FavsModule {}
