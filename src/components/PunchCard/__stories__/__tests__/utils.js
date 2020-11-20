import moment from 'moment'
import {
  reducePunchedSlotsToGoalAccomplished, verifyNewInTime
} from '../utils'

describe("reducePunchedSlotsToGoalAccomplished", () => {
  it(`SHOULD correctly return the goal accomplished
    in minutes given the punched slots.`, () => {
    const punchedSlots = [{
      id: '1234',
      inTime: moment('09:52', 'HH:mm').valueOf().toString(),
      outTime: moment('09:55', 'HH:mm').valueOf().toString()
    }];
    const results = punchedSlots
      .reduce(reducePunchedSlotsToGoalAccomplished, 0)
    expect(results).toBe(3)
  })

  it(`SHOULD not include the slot if out-time is null/falsy`, () => {
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

describe("verifyNewInTime", () => {
  let slots = []

  beforeEach(() => {
    const toTimestamp = (time) => moment(time, 'YYYY-MM-DD HH:mm')
      .valueOf();
    slots = [{
      index: 0,
      id: '8e038ad6-d65f-42ea-af9b-9727c23801b7',
      inTime: toTimestamp("2020-11-20 12:00"),
      outTime: toTimestamp("2020-11-20 12:30"),
      punchInTimeCell: {
        value: '2020-11-20 12:00'
      },
      punchOutTimeCell: {
        value: '2020-11-20 12:30'
      }
    }, {
      index: 1,
      id: 'd6dad402-970a-4555-8ca2-083bbe695025',
      inTime: toTimestamp("2020-11-20 13:00"),
      outTime: toTimestamp("2020-11-20 13:30"),
      punchInTimeCell: {
        value: '2020-11-20 13:00'
      },
      punchOutTimeCell: {
        value: '2020-11-20 13:30'
      }
    }]
  })

  it(`SHOULD invalidate
        IF time-string is not-valid`, () => {
    const result = verifyNewInTime({
      newInTime: '9999-23-23 92:93',
    })
    expect(result.isValid).toBe(false);
  });

  it(`SHOULD invalidate
        IF new-in-time is less than out-time of prevous slot`, () => {
      const result = verifyNewInTime({
        newInTime: '2020-11-20 12:15',
        slots, item: slots[1]
      })
      expect(result.isValid).toBe(false)
    })

  it(`SHOULD invalidate
      IF new-in-time is greater than out-time of the slot`, () => {
    const result = verifyNewInTime({
      newInTime: '2020-11-20 13:45',
      slots, item: slots[1]
    })
    expect(result.isValid).toBe(false)
    expect(result.errorMessage)
      .toBe(`Updated time is less than out time of this slot.`)
  })

  it(`SHOULD return valid
      IF new-in-time is > out-time of previous-slot
      AND new-in-time is < out-time of current-slot`, () => {
    const result4 = verifyNewInTime({
      newInTime: '2020-11-20 13:15',
      slots, item: slots[1]
    })
    expect(result4.isValid).toBe(true)
  });
})
