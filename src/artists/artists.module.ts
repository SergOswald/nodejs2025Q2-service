import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { TracksModule } from '../tracks/tracks.module';
import { FavsModule } from '../favs/favs.module';

@Module({
  imports: [
    TracksModule, // ← чтобы получить TracksService
    FavsModule,   // ← чтобы получить FavsService
  ],
  controllers: [ArtistsController],
  providers: [ArtistsService],
})
export class ArtistsModule {}
