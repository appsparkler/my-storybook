import {
  enablePunchInButton,
  getPunchInButtonText
} from '../'
import {messages} from '../shared'

const {
  START_YOUR_DAY,  PUNCH_IN
} = messages;

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
