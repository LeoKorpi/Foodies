import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hideZeroQuantity',
})
export class HideZeroQuantityPipe implements PipeTransform {
  // Some of the ingredients have 0 quantity, e.g. 'salt to taste' would be '0 salt to taste'
  // To avoid this we replace 0s with ''
  transform(value: number): string {
    return value != 0 ? value.toString() : '';
  }
}
