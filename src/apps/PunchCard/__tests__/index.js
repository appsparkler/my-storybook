import {showPunchInButton} from '../'

describe("showPunchInButton", () => {

  it(`SHOULD return Boolean(false)
        IF there are no slots`, () => {
    const args = {
      items: []
    }
    const result = showPunchInButton(args);
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
    const result = showPunchInButton(args);
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
    const result = showPunchInButton(args);
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
    const result = showPunchInButton(args);
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
    const result = showPunchInButton(args);
    expect(result).toBe(false)
  })
});
