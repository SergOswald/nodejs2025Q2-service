import { ApiProperty } from '@nestjs/swagger';

export class CreateAlbumDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  year: number;

  @ApiProperty({ required: false, nullable: true })
  artistId?: string | null;
}

export class UpdateAlbumDto extends CreateAlbumDto {}

export class AlbumResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  year: number;

  @ApiProperty({ nullable: true })
  artistId: string | null;
}
