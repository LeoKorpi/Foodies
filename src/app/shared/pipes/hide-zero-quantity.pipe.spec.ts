import { HideZeroQuantityPipe } from './hide-zero-quantity.pipe';

describe('HideZeroQuantityPipe', () => {
  it('create an instance', () => {
    const pipe = new HideZeroQuantityPipe();
    expect(pipe).toBeTruthy();
  });
});
