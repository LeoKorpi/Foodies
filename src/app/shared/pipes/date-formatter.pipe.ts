import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormatter',
})
export class DateFormatterPipe implements PipeTransform {
  // Transforms the date in numbers to a US-format date-string (MM-DD-YYYY)
  transform(value: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    };
    return value.toLocaleDateString('en-US', options);
  }
}
