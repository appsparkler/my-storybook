import { getIsOk2Submit } from '../'
import moment from 'moment'

describe('getIsOk2Submit', () => {
  it(`SHOULD return start-timestamp AND end-timestamp
        IF valid`, () => {
    const config = {
      inTime: '2020-11-27 11:00',
      outTime: '2020-11-27 12:00',
    }
    const result = getIsOk2Submit(config)
    expect(result.inTime).toBe(moment(config.inTime).valueOf())
    expect(result.outTime).toBe(moment(config.outTime).valueOf())
  })

  it('SHOULD return Boolean(false)', () => {
    const config = {
      inTime: '2020-11-27 13:00',
      outTime: '2020-11-27 12:00',
    }
    const result = getIsOk2Submit(config)
    expect(result).toBe(false)
  })
})
