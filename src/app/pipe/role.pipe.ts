import { Pipe, PipeTransform } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Pipe({
  name: 'role'
})
export class RolePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    const accessType= Cookie.get('Access_Type');
    console.log(accessType);
    const data = [];
    value.map((i: any,index: number) => {
      if(index === 0){
        //  data.push(i)
      }
      if(accessType === '3'){
        if(index > 2 || index === 0){
           data.push(i)
        }
      }
      if(accessType === '1'){
          data.push(i)
      }
    })
    return data;
    // console.log(data)

  }

}
