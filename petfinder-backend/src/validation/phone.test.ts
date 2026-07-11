import phoneRegExp from './phone';

describe('phoneRegExp', () => {
  it.each([
    '11912345678',
    '+55 (11) 91234-5678',
    '(11) 91234-5678',
    '11 91234-5678',
    '1234567890',
  ])('accepts %s', phone => {
    expect(phoneRegExp.test(phone)).toBe(true);
  });

  it.each(['not-a-phone', '123', 'abcdefghij', ''])('rejects %s', phone => {
    expect(phoneRegExp.test(phone)).toBe(false);
  });
});
