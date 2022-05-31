import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { Sanitize } from '../functions/sanitize';
import 'dotenv/config';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype, type, data }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return await Sanitize(value);
    }

    const object = plainToClass(metatype, value);
    process.env.LOG_REQUESTS === 'true' && console.log(object);
    const errors = await validate(object, { whitelist: true });

    if (errors.length > 0) {
      // throw new BadRequestException('Validation failed - ' + errors);
      console.log('Validation failed - ' + errors);
      throw new BadRequestException('Input mal formatado.');
    }

    // return value;
    return await Sanitize(object);
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
