import nyc from 'nyc-lib/nyc'

const cacheBust = nyc.cacheBust(5)

export default {
  // FACILITY_CSV_URL: `data/location.csv?${cacheBust}`,
  FACILITY_CSV_URL: `https://data.cityofnewyork.us/api/views//rows.csv?$$app_token=&accessType=DOWNLOAD`,
  GEOCLIENT_URL: 'https://maps.nyc.gov/geoclient/v2/search.json?app_key=74DF5DB1D7320A9A2&app_id=nyc-lib-example',
  DIRECTIONS_URL: 'https://maps.googleapis.com/maps/api/js?&sensor=false&libraries=visualization',
  SPLASH_MESSAGE: 'IDNYC is the free photo identification card available to all New York City residents age 10 and older. More than just identification, IDNYC opens a door to invaluable resources and cultural experiences, giving all of us the opportunity to show who we are - New Yorkers. As a government-issued photo identification card, IDNYC offers New Yorkers increased access to City services and secures the peace of mind that comes from having recognized identification. IDNYC benefits every city resident, including the most vulnerable communities - the homeless, youth, the elderly, undocumented immigrants, the formerly incarcerated and others who may have difficulty obtaining government-issued ID.',
  FACILITY_LIMIT: 3
}
