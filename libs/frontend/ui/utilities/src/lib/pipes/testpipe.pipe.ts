import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'testpipe',
  standalone: true,
})
export class TestpipePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
