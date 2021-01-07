import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataCheck'
})
export class DataCheckPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    console.log(value);
    if(value === undefined || value === null){
      return 'N/A';
    }
    return value;
  }

}
