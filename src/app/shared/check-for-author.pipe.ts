import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkForAuthor',
})
export class CheckForAuthorPipe implements PipeTransform {
  transform(credits: { name: string | null }[]): { name: string }[] {
    return credits.map((credit) => ({
      name: credit.name ?? 'Mystery Chef',
    }));
  }
}
