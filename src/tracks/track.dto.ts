import { ApiProperty } from '@nestjs/swagger';

export class CreateTrackDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  duration: number;

  @ApiProperty({ required: false, nullable: true })
  artistId?: string | null;

  @ApiProperty({ required: false, nullable: true })
  albumId?: string | null;
}

export class UpdateTrackDto extends CreateTrackDto {}

export class TrackResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  duration: number;

  @ApiProperty({ nullable: true })
  artistId: string | null;

  @ApiProperty({ nullable: true })
  albumId: string | null;
}
