import { Pipe, PipeTransform } from '@angular/core';
import { test1 } from '../models/test.model';

@Pipe({
  name: 'searchfilter'
})
export class SearchfilterPipe implements PipeTransform {

  transform(assets:test1[], Search:string): any {
    if(!assets || !Search){
      return assets;
    }
    return assets.filter(s=>s.assets.name.toLocaleLowerCase().includes(Search.toLocaleLowerCase()))
  }

}
