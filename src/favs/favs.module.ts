import { Module, forwardRef } from '@nestjs/common';
import { FavsService } from './favs.service';
import { ArtistsModule } from '../artists/artists.module';
import { AlbumsModule } from '../albums/albums.module';
import { TracksModule } from '../tracks/tracks.module';

@Module({
  imports: [
    forwardRef(() => ArtistsModule),
    forwardRef(() => AlbumsModule),
    forwardRef(() => TracksModule),
  ],
  providers: [FavsService],
  exports: [FavsService],
})
export class FavsModule {}
