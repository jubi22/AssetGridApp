import { Pipe, PipeTransform } from '@angular/core';
import { Assets } from '../models/assets.model';
// import { test1 } from '../models/test.model';

@Pipe({
  name: 'searchfilter'
})
export class SearchfilterPipe implements PipeTransform {

  transform(assets:Assets[], Search:string): any {
    if(!assets || !Search){
      return assets;
    }
    return assets.filter(s=>s.name.toLocaleLowerCase().includes(Search.toLocaleLowerCase()))
  }

}
