import { IsString, IsNumber, IsUUID, IsOptional } from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  name: string;

  @IsNumber()
  duration: number;

  @IsUUID()
  @IsOptional()
  artistId: string | null;

  @IsUUID()
  @IsOptional()
  albumId: string | null;
}
