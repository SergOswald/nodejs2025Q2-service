import { Module, forwardRef } from '@nestjs/common';
import { FavsController } from './favs.controller';
import { FavsService } from './favs.service';
import { ArtistsModule } from '../artists/artists.module';
import { AlbumsModule } from '../albums/albums.module';
import { TracksModule } from '../tracks/tracks.module';
import { ArtistsService } from '../artists/artists.service';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';

@Module({
  imports: [ArtistsModule, AlbumsModule, TracksModule],
  controllers: [FavsController],
  providers: [FavsService],
  exports: [FavsService]
})
export class FavsModule {}
