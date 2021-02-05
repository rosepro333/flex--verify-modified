import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(value: any, searchValue: any): any {
    if (!searchValue) {
      return value;
    }
    else {
      // return value.filter(value => {
      //   return value.toLowerCase().indexOf(searchValue.toLowerCase()) > -1;
      // });
      // return value.map((data) => {
      //   console.log(data.name)
      return value.filter((val: any) => {
        // console.log(val)
        return val.name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1;

      })
      // })
    }
  }
}
