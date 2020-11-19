import moment from 'moment'
import {v4 as uuid} from 'uuid'
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

describe("isNewInTimeValid", () => {
  it("should return Boolean appropriately", () => {
    const isNewInTimeValid = ({
      item, newInTime
    }) => {
      const newInTimeMoment = moment(newInTime,  'YYYY-MM-DD HH:mm');
      if(!newInTimeMoment.isValid()) return {
        isValid: false,
        errorMessage: 'Invalid date/time'
      }
      // newInTime should be greater than previous item outTime
      // newInTime should be less than or equal to current outTime
    }
    const toTimestamp = (HHmm) => moment(HHmm, "HH:mm")
      .valueOf();
    const slots = [{
      id: uuid(),
      inTime: toTimestamp("12:00"),
      outTime: toTimestamp("12:30"),
      punchInTimeCell: {
        value: '2020-11-18 12:00'
      },
      punchOutTimeCell: {
        value: '2020-11-18 12:30'
      }
    }, {
      id: uuid(),
      inTime: toTimestamp("13:00"),
      outTime: toTimestamp("13:30"),
      punchInTimeCell: {
        value: '2020-11-18  13:00'
      },
      punchOutTimeCell: {
        value: '2020-11-18  13:30'
      }
    }]

    const result = isNewInTimeValid({
      newInTime: '9999-23-23 92:93'
    })
    expect(result.isValid).toBe(false);
    // const result = isNewInTimeValid({
    //   newInTime: '2020-11-18 12:'
    // })
  });
})
