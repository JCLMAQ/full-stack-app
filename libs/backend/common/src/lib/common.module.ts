import { Module } from '@nestjs/common';
import { BcryptService } from './hashing/bcrypt.service';
import { HashingService } from './hashing/hashing.service';
import { JoiValidationPipe } from './pipes/data-validation/data-validation.pipe';
import { StringUtilities } from './utilities/string-utilities';




@Module({


    imports: [],
  providers: [
    // {
    //   provide: APP_GUARD, useClass: ApiKeyGuard
    // }
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    StringUtilities,
    JoiValidationPipe,

  ],
  exports: [

  ]
})
export class CommonModule {}

