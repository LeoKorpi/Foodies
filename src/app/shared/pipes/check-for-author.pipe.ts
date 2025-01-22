import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkForAuthor',
})
export class CheckForAuthorPipe implements PipeTransform {
  // Some recipes are missing authors
  // using the nullish-operator, we can replace the empty strings with "Mystery Chef"
  transform(credits: { name: string | null }[]): { name: string }[] {
    return credits.map((credit) => ({
      name: credit.name ?? 'Mystery Chef',
    }));
  }
}
