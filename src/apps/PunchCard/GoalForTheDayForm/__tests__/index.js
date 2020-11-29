import {
  isValidMinutes
} from '../'

describe("isValidMinutes", () => {
  it(`should return Boolean(false)
        IF value is masked`, () => {
    const args = {
      minutes: '5_'
    };
    const result = isValidMinutes(args)
    expect(result).toBe(false)
  });

  it(`should return Boolean(false)
        IF value is greater than 59`, () => {
    const args = {
      minutes: '60'
    };
    const result = isValidMinutes(args)
    expect(result).toBe(false)
  });

  it(`should return Boolean(false)
        IF value is less than 0`, () => {
    const args = {
      minutes: '-60'
    };
    const result = isValidMinutes(args)
    expect(result).toBe(false)
  });

  it(`should return Boolean(true)
        IF value is equal to 0`, () => {
    const args = {
      minutes: 0
    };
    const result = isValidMinutes(args)
    expect(result).toBe(true)
  });

  it(`should return Boolean(true)
        IF value is equal to 59`, () => {
    const args = {
      minutes: 59
    };
    const result = isValidMinutes(args)
    expect(result).toBe(true)
  });

  it(`should return Boolean(true)
        IF value is between 0 and 59`, () => {
    const args = {
      minutes: 12
    };
    const result = isValidMinutes(args)
    expect(result).toBe(true)
  });
});
