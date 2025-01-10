import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hideZeroQuantity',
})
export class HideZeroQuantityPipe implements PipeTransform {
  transform(value: number): string {
    return value != 0 ? value.toString() : '';
  }
}
