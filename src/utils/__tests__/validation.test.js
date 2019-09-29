import { valid, email, required } from '../validation';

describe('valid()', () => {
  it('calls each given middleware function', () => {
    const mockValidator = jest.fn();
    const secondMockValidator = jest.fn();

    valid(mockValidator, secondMockValidator)('foo bar baz');

    expect(mockValidator).toHaveBeenCalledWith('foo bar baz');
    expect(secondMockValidator).toHaveBeenCalledWith('foo bar baz');
  });

  it('returns the first error encountered', () => {
    const mockValidator = jest.fn();
    const secondMockValidator = jest.fn(() => 'SECOND_MOCK_VALIDATOR_ERROR');
    const thirdMockValidator = jest.fn(() => 'THIRD_MOCK_VALIDATOR_ERROR');

    const errMsg = valid(
      mockValidator,
      secondMockValidator,
      thirdMockValidator
    )('foo bar baz');

    expect(errMsg).toEqual('SECOND_MOCK_VALIDATOR_ERROR');
    expect(thirdMockValidator).not.toHaveBeenCalled();
  });
});

describe('required()', () => {
  it('returns an error if the value is undefined, null, or empty string', () => {
    let errMsg = valid(required())(undefined);
    expect(errMsg).toBeTruthy();

    errMsg = valid(required())(null);
    expect(errMsg).toBeTruthy();

    errMsg = valid(required())('');
    expect(errMsg).toBeTruthy();
  });

  it('can return a custom error message', () => {
    const errMsg = valid(required('My custom message'))(undefined);
    expect(errMsg).toEqual('My custom message');
  });
});

describe('email()', () => {
  it('returns an error if the email is in the wrong format', () => {
    const errMsg = valid(email())('not_a_valid_email');
    expect(errMsg).toBeTruthy();
  });

  it('does not return an error if the email is in the correct format', () => {
    const errMsg = valid(email())('a_valid_email@example.com');
    expect(errMsg).toBe(undefined);
  });

  it('can return a custom error message', () => {
    const errMsg = valid(email('My custom message'))('not_a_valid_email');
    expect(errMsg).toEqual('My custom message');
  });
});
