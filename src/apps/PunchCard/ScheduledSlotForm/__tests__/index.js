import {
  getIsOk2Submit
} from '../'
import moment from 'moment'

describe("getIsOk2Submit", () => {
  it(`SHOULD return start-timestamp AND end-timestamp
        IF valid`, () => {
    const config = {
      startTime: '2020-11-27 11:00',
      endTime: '2020-11-27 12:00'
    };
    const  result = getIsOk2Submit(config);
    expect(result.startTime)
      .toBe(moment(config.startTime).valueOf());
    expect(result.endTime)
      .toBe(moment(config.endTime).valueOf());
  })

  it('SHOULD return Boolean(false)', () => {
    const config = {
      startTime: '2020-11-27 13:00',
      endTime: '2020-11-27 12:00'
    };
    const  result = getIsOk2Submit(config);
    expect(result).toBe(false);
  })
});
