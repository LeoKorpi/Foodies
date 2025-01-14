import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormatter',
})
export class DateFormatterPipe implements PipeTransform {
  transform(value: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    };
    return value.toLocaleDateString('en-US', options);
  }
}
