import moment from 'moment'
import {reducePunchedSlotsToGoalAccomplished} from '../utils'

describe("reducePunchedSlotsToGoalAccomplished", () => {
  it(`
    should correctly return the goal accomplished
    in minutes given the punched slots.
`, () => {
    const punchedSlots = [{
      id: '1234',
      inTime: moment('09:52', 'HH:mm').valueOf().toString(),
      outTime: moment('09:55', 'HH:mm').valueOf().toString()
    }];
    const results = punchedSlots
      .reduce(reducePunchedSlotsToGoalAccomplished, 0)
    expect(results).toBe(3)
  })

  it(`
    should not include the slot if out-time is null/falsy
`, () => {
      const punchedSlots = [{
        id: '1234',
        inTime: moment('09:52', 'HH:mm').valueOf().toString(),
        outTime: moment('09:55', 'HH:mm').valueOf().toString()
      }, {
        id: '1235',
        inTime: moment('10:52', 'HH:mm').valueOf().toString(),
        outTime: null
      }]
      const results = punchedSlots.reduce(reducePunchedSlotsToGoalAccomplished, 0);
      expect(results).toBe(3)
    })
});
