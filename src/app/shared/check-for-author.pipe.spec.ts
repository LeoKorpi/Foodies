import { CheckForAuthorPipe } from './check-for-author.pipe';

describe('CheckForAuthorPipe', () => {
  it('create an instance', () => {
    const pipe = new CheckForAuthorPipe();
    expect(pipe).toBeTruthy();
  });
});
