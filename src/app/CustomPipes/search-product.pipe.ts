import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchProduct'
})
export class SearchProductPipe implements PipeTransform {

  transform(productList:any[], searchText:string): any[] {
  // return empty array if array is falsy
  if (productList == null)  
      return null;

    return productList.filter((item)=>{
        return item.NAME.toLowerCase().indexOf(searchText.toLowerCase())>-1
    });
  }

}
