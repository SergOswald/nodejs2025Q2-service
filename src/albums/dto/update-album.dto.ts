import { IsString, IsInt, IsUUID, IsOptional } from 'class-validator';

export class UpdateAlbumDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  year?: number;

  @IsOptional()
  @IsUUID()
  artistId?: string | null;
}
