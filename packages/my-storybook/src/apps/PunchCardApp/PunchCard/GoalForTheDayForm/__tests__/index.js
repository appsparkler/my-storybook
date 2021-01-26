import { isInRange, getGoalInMinutes } from '../'

describe('isInRange', () => {
  it(`should return Boolean(false)
        IF value isNaN`, () => {
    const args = {
      min: 0,
      max: 59,
      value: '5_',
    }
    const result = isInRange(args)
    expect(result).toBe(false)
  })

  it(`should return Boolean(false)
        IF value < min`, () => {
    const args = {
      min: 0,
      max: 59,
      value: -1,
    }
    const isValid = isInRange(args)
    expect(isValid).toBe(false)
  })

  it(`should return Boolean(false)
        IF value > max`, () => {
    const args = {
      min: 0,
      max: 59,
      value: 60,
    }
    const result = isInRange(args)
    expect(result).toBe(false)
  })

  it(`should return Boolean(true)
        IF value is equal to 0`, () => {
    const args = {
      min: 0,
      max: 59,
      value: 0,
    }
    const result = isInRange(args)
    expect(result).toBe(true)
  })

  it(`should return Boolean(true)
        IF Number(value) === Number(max)`, () => {
    const args = {
      min: 0,
      max: 59,
      value: 59,
    }
    const result = isInRange(args)
    expect(result).toBe(true)
  })

  it(`should return Boolean(true)
        IF value is in range`, () => {
    const args = {
      min: 0,
      max: 59,
      value: 18,
    }
    const result = isInRange(args)
    expect(result).toBe(true)
  })
})

describe('getGoalInMinutes', () => {
  it('SHOULD return goal in minutes', () => {
    const args = {
      hours: '02',
      minutes: '01',
    }
    const goalInMinutes = getGoalInMinutes(args)
    expect(goalInMinutes).toBe(121)
  })

  it(`SHOULD return
        IF any isNaN`, () => {
    const args = {
      hours: '_2',
      minutes: '_1',
    }
    const goalInMinutes = getGoalInMinutes(args)
    expect(goalInMinutes).toBe(0)
  })
})
