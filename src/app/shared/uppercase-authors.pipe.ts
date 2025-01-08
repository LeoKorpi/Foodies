import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uppercaseAuthors',
})
export class UppercaseAuthorsPipe implements PipeTransform {
  transform(value: any[]): string {
    if (value.length === 1) return value[0].name;

    const names = value.map((item) => item.name);
    const lastName = names.pop();
    return names.length > 0
      ? `${names.join(', ')} and ${lastName}`
      : lastName || '';
  }
}
