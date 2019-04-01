import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any, searchText: string): any {
    if (!items || !searchText){
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.filter(item => item.nombre.toLowerCase().indexOf(searchText) !== -1 
    || item.apellido.toLowerCase().indexOf(searchText) !== -1 
    || item.identificacion.indexOf(searchText) !== -1);
   }
}
