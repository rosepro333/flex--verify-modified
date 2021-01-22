import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameFilter'
})
export class NameFilterPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    // console.log(value)
    return value?.charAt(0).toUpperCase();
  }

}
