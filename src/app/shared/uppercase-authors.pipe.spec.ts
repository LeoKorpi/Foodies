import { UppercaseAuthorsPipe } from './uppercase-authors.pipe';

describe('UppercaseAuthorsPipe', () => {
  it('create an instance', () => {
    const pipe = new UppercaseAuthorsPipe();
    expect(pipe).toBeTruthy();
  });
});
