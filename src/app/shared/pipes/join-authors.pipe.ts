import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'joinAuthors',
})
export class JoinAuthorsPipe implements PipeTransform {
  // If a recipe has more than one author we return a string with 'and' inbetween
  transform(value: any[]): string {
    if (value.length === 1) return value[0].name;

    const names = value.map((item) => item.name);
    const lastName = names.pop();
    return names.length > 0
      ? `${names.join(', ')} and ${lastName}`
      : lastName || '';
  }
}
