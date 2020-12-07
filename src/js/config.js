import nyc from 'nyc-lib/nyc'

const cacheBust = nyc.cacheBust(5)

export default {
  // FACILITY_CSV_URL: `data/location.csv?${cacheBust}`,
  FACILITY_CSV_URL: `https://data.cityofnewyork.us/api/views/mkm2-2p3d/rows.csv?$$app_token=&accessType=DOWNLOAD`,
  GEOCLIENT_URL: 'https://maps.nyc.gov/geoclient/v2/search.json?app_key=74DF5DB1D7320A9A2&app_id=nyc-lib-example',
  DIRECTIONS_URL: 'https://maps.googleapis.com/maps/api/js?&sensor=false&libraries=visualization',
  SPLASH_MESSAGE: 'IDNYC splash message......',
  FACILITY_LIMIT: 3
}
