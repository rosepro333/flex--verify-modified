import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roleName'
})
export class RoleNamePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if(value === '1'){
      return 'Flexm Admin';
    }else if(value === '2'){
      return 'Flexm Operator';
    }
    else if(value === '3'){
      return 'Tenent Admin';
    }
    else if(value === '4'){
      return 'Tenent Operator';
    }
    return null;
  }

}
