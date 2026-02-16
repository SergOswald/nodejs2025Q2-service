import { Module, forwardRef } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { AlbumsModule } from '../albums/albums.module';
import { TracksModule } from '../tracks/tracks.module';
import { FavsModule } from '../favs/favs.module';

@Module({
  imports: [
    forwardRef(() => AlbumsModule),
    forwardRef(() => TracksModule),
    forwardRef(() => FavsModule),
  ],
  controllers: [ArtistsController],
  providers: [ArtistsService],
  exports: [ArtistsService],
})
export class ArtistsModule {}
