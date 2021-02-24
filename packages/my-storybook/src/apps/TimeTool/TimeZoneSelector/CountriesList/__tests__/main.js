import TimezoneData from 'moment-timezone/data/meta/latest'

const getListOfCountries = () => {
  const { countries } = TimezoneData
  return Object.entries(countries).map(([key, value]) => ({
    name: value.name,
    abbr: key,
  }))
}

const getTimezonesForACountry = (countryAbbr) =>
  TimezoneData.countries[countryAbbr].zones

describe('getListOfCountries', () => {
  it('should get a list of countries from raw data', () => {
    const listOfCountries = getListOfCountries()
    expect(typeof listOfCountries).toBe('object')
    expect(Array.isArray(listOfCountries)).toBe(true)
  })
})

describe('getTimezonesForACountry', () => {
  it('should get timezones for the country abbreviation', () => {
    const timezonesForIN = getTimezonesForACountry('IN')
    expect(Array.isArray(timezonesForIN)).toBe(true)
    expect(timezonesForIN.length).toBe(1)
    expect(timezonesForIN[0]).toBe('Asia/Kolkata')
  })
})
