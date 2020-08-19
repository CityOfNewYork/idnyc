import oodFeatures from '../src/js/oodFeatures'

test('start date and end date of facility', () => {
    // start date is empty
    expect(oodFeatures.withinOpenDate('', '')).toBe(true)

    // today is within date range
    expect(oodFeatures.withinOpenDate('2020-05-02', '2021-7-9')).toBe(true)

    // today is before start date
    expect(oodFeatures.withinOpenDate('2021-11-02', '2022-7-9')).toBe(false)

    // today is after end date
    expect(oodFeatures.withinOpenDate('2020-05-02', '2020-7-9')).toBe(false)

})