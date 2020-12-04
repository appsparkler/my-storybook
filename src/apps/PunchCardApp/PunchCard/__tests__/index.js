import {
  enablePunchInButton,
  getPunchInButtonText,
  getGoalInMinutes,
  getMinutesFromSlots
} from '../'
import {messages} from '../../shared'
import {v4 as uuid} from 'uuid'
import moment from 'moment'

const {
  START_YOUR_DAY,  PUNCH_IN
} = messages;

describe('getGoalInMinutes', () => {
  it(`SHOULD return 0
        IF no-goal-hours or no-goal-minutes`, () => {
    const args = {
      hours: '00',
      minutes: '00'
    }
    const result = getGoalInMinutes(args);
    expect(result).toBe(0)
  });

  it(`SHOULD return 0
        IF goal-hours and/or minutes`, () => {
    const args = {
      hours: '11',
      minutes: '30'
    }
    const result = getGoalInMinutes(args);
    expect(result).toBe((11 * 60) + 30);
  });
})

describe("getMinutesFromSlots", () => {

  it(`SHOULD return 0 minutes
        IF there are no slots`, () => {
    const args = {
      slots: []
    }
    const result = getMinutesFromSlots(args);
    expect(result).toBe(0);
  });

  it(`SHOULD return 0
        IF there are no slots`, () => {
    const args = {
      slots: [{
        id: uuid(),
        inTime: moment('11:00', 'HH:mm')
          .valueOf(),
        outTime: null
      }]
    };
    const result = getMinutesFromSlots(args);
    expect(result).toBe(0);
  })

  it(`SHOULD return the sum-of-minutes-diff
        IF there are qualifying slots - ONLY 1 slot`, () => {
    const args = {
      slots: [{
        id: uuid(),
        inTime: moment('11:00', 'HH:mm')
          .valueOf(),
        outTime: moment('12:00', 'HH:mm')
          .valueOf()
      }]
    };
    const result = getMinutesFromSlots(args);
    expect(result).toBe(60);
  })

  it(`SHOULD return the sum-of-minutes-diff
        IF there are qualifying slots - > 1 slot`, () => {
    const args = {
      slots: [{
        id: uuid(),
        inTime: moment('11:00', 'HH:mm')
          .valueOf(),
        outTime: moment('12:00', 'HH:mm')
          .valueOf()
      },{
        id: uuid(),
        inTime: moment('13:00', 'HH:mm')
          .valueOf(),
        outTime: moment('13:20', 'HH:mm')
          .valueOf()
      }]
    };
    const result = getMinutesFromSlots(args);
    expect(result).toBe(80);
  })
});

describe("getPunchInButtonText", () => {
  it(`SHOULD return "${START_YOUR_DAY}"
        IF no items`, () => {
    const numberOfItems = null;
    const result = getPunchInButtonText(numberOfItems);
    expect(result).toBe(START_YOUR_DAY)
  });
  it(`SHOULD return "${PUNCH_IN}"
        IF no items`, () => {
    const numberOfItems = 2;
    const result = getPunchInButtonText(numberOfItems);
    expect(result).toBe(PUNCH_IN)
  });
});

describe("enablePunchInButton", () => {

  it(`SHOULD return Boolean(false)
        IF there are no slots`, () => {
    const args = {
      items: []
    }
    const result = enablePunchInButton(args);
    expect(result).toBe(true)
  });

  it(`SHOULD return Boolean(true)
        IF the last-item has out-time - 1`, () => {
    const args = {
      items: [{
        id: '12929',
        inTime: Date.now(),
        outTime: Date.now() + (60 * 1000 * 60)
      }]
    }
    const result = enablePunchInButton(args);
    expect(result).toBe(true)
  })

  it(`SHOULD return Boolean(true)
        IF the last-item has out-time - 2`, () => {
    const args = {
      items: [{
        id: '12929-A',
        inTime: Date.now(),
        outTime: Date.now() + (60 * 1000 * 60)
      },{
        id: '12929-B',
        inTime: Date.now() + (62 * 60 * 1000),
        outTime: Date.now() + (122 * 60 * 1000)
      }]
    }
    const result = enablePunchInButton(args);
    expect(result).toBe(true)
  })

  it(`SHOULD return Boolean(false)
        IF the last item doesn't have out-time - 1`, () => {
    const args = {
      items: [{
        id: '12929',
        inTime: Date.now(),
        outTime: null
      }]
    }
    const result = enablePunchInButton(args);
    expect(result).toBe(false)
  })

  it(`SHOULD return Boolean(false)
        IF the last item doesn't have out-time - 2`, () => {
    const args = {
      items: [{
        id: '12929-A',
        inTime: Date.now(),
        outTime: Date.now() + (60 * 1000 * 60)
      },{
        id: '12929-B',
        inTime: Date.now() + (62 * 60 * 1000),
        outTime: null
      }]
    }
    const result = enablePunchInButton(args);
    expect(result).toBe(false)
  })
});
