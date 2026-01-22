import { Module, forwardRef } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';

import { ArtistsModule } from '../artists/artists.module';
import { AlbumsModule } from '../albums/albums.module';
import { TracksModule } from '../tracks/tracks.module';

@Module({
  imports: [
    forwardRef(() => ArtistsModule),
    AlbumsModule,
    TracksModule,
  ],
  controllers: [FavsController],
  providers: [FavsService],
  exports: [FavsService], // ← ВОТ ЭТО КРИТИЧНО
})
export class FavsModule {}
