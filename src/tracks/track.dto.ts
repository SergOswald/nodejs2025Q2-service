import { IsString, IsInt, Min, IsOptional, IsUUID } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsUUID()
  artistId: string | null;

  @IsOptional()
  @IsUUID()
  albumId: string | null;

  @IsInt()
  @Min(0)
  duration: number;
}

export class UpdateTrackDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsUUID()
  artistId?: string | null;

  @IsOptional()
  @IsUUID()
  albumId?: string | null;

  @IsOptional()
  @IsInt()
  @Min(0)
  duration?: number;
}
