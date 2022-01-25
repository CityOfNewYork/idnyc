import oodFeatures from '../src/js/oodFeatures'

const past = '2020-05-02'
const today = new Date()
const futureDate = new Date()
futureDate.setFullYear(today.getFullYear() + 1)
const future1 = futureDate.toISOString().split('T')[0]
futureDate.setFullYear(futureDate.getFullYear() + 1)
const future2 = futureDate.toISOString().split('T')[0]

test('start date and end date of facility', () => {
    // start date is empty
    expect(oodFeatures.withinOpenDate('', '')).toBe(true)

    // today is within date range
    expect(oodFeatures.withinOpenDate(past, future1)).toBe(true)

    // today is before start date
    expect(oodFeatures.withinOpenDate(future1, future2)).toBe(false)

    // today is after end date
    expect(oodFeatures.withinOpenDate('2020-05-02', '2020-7-9')).toBe(false)

})