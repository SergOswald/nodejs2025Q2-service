import { BadRequestException } from '@nestjs/common';
import { validate as isUuidValidate } from 'uuid';

export function ensureUuidOrThrow(id: string, name = 'id') {
  if (!isUuidValidate(id)) {
    throw new BadRequestException(`${name} is invalid`);
  }
}
