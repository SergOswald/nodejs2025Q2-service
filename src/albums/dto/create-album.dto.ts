import { IsString, IsNumber, IsUUID, IsOptional } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  name: string;

  @IsNumber()
  year: number;

  @IsUUID()
  @IsOptional()
  artistId: string | null;
}
