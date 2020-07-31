import nyc from 'nyc-lib/nyc'

const cacheBust = nyc.cacheBust(5)

export default {
  FACILITY_CSV_URL: `https://data.cityofnewyork.us/api/views/5pbr-mxtd/rows.csv?accessType=DOWNLOAD`,
  GEOCLIENT_URL: 'https://maps.nyc.gov/geoclient/v1/search.json?app_key=2C5EA5305187CD57C&app_id=gis-idnyc',
  DIRECTIONS_URL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBB0m1-hNGz_za3-BpD3uoc6JqwITWI_xg&channel=idnyc&sensor=false&libraries=visualization'
}
