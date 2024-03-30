import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'validation',
  standalone: true,
})
export class ValidationPipe implements PipeTransform {
  transform(value: any, errors: object): unknown {
    const firstErrorKey = Object.keys(errors)[0];
    return value[firstErrorKey];
  }
//   transform(value: any, errorObj: object): unknown {
//     return value[Object.keys(errorObj)[0]];
// }
}
