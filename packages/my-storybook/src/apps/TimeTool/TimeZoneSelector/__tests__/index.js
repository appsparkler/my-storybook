import { getRegions } from '../index.jsx'

describe('getRegions', () => {
  it('should get all regions available in an array', () => {
    const results = getRegions()
    expect(results.length).toBe(11)
  })
})
