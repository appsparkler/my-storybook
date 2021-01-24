import {convertMinutesToHours} from '../shared'

describe("convertMinutesToHours", () => {
  it(`SHOULD return "00:00" for when mins is 0`, () => {
    const mins = 0;
    const result = convertMinutesToHours(mins);
    expect(result).toBe('00:00')
  })

  it(`SHOULD return "00:00" for a falsy`, () => {
    const minsNull = null;
    const resultNull = convertMinutesToHours(minsNull);
    expect(resultNull).toBe('00:00')

    const minsUndefined = undefined;
    const resultUndefined = convertMinutesToHours(minsUndefined);
    expect(resultUndefined).toBe('00:00')
  })

  it(`SHOULD return "00:00" for undefined`, () => {
    const mins = null;
    const result = convertMinutesToHours(mins);
    expect(result).toBe('00:00')
  })

  it(`SHOULD return "00:10" for String(10)`, () => {
    const mins = "10";
    const result = convertMinutesToHours(mins);
    expect(result).toBe('00:10')
  })

  it(`SHOULD return "00:10" for Number(10)`, () => {
    const mins = 10;
    const result = convertMinutesToHours(mins);
    expect(result).toBe('00:10')
  })

  it(`SHOULD return "- 00:10" for -Number(10)`, () => {
    const mins = -10;
    const result = convertMinutesToHours(mins);
    expect(result).toBe('- 00:10')
  })

  it(`SHOULD return "- 00:10" for String(10)`, () => {
    const mins = "-10";
    const result = convertMinutesToHours(mins);
    expect(result).toBe('- 00:10')
  })

});
