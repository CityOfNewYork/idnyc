import style from '../src/js/style'
import decorations from '../src/js/decorations'
import nyc from 'nyc-lib/nyc'
import CsvPoint from 'nyc-lib/nyc/ol/format/CsvPoint'
import Feature from 'ol/Feature'

const csvPoint = new CsvPoint({
  x: 'x_coordinate',
  y: 'y_coordinate',
  defaultDataProjection: 'EPSG:2263'
})

const permanent = {
  id: 62,
  name: "King Manor",
  address1: "150-03 Jamaica Ave",
  address2: "",
  city: "Queens",
  zip: "11432",
  hours: "10am - 5pm",
  type: "permanent",
  location: "(40.702446, -73.803428)",
  x_coordinate: 1038704,
  y_coordinate: 195232,
  start_date: '2020-08-01',
  end_date: '2020-09-03',
  url: ''
}
const facilityPermanent = csvPoint.readFeature(permanent)

const cultural = {
  id: 46,
  name: "PNC Bank",
  address1: "340 Madison Avenue",
  address2: "(1st floor)",
  city: "New York",
  zip: "10017",
  hours: "Mon-Fri: 8:30am - 4:30pm",
  type: "cultural",
  location: "(40.75386839943908, -73.97851342945145)",
  x_coordinate: 990203,
  y_coordinate: 213932,
}
const facilityCultural = csvPoint.readFeature(cultural)

const financial = {
  id: 28,
  name: 'East West Bank',
  address1: "208 Canal Street",
  address2: "",
  city: "New York",
  zip: "10013",
  hours: "Mon-Fri: 8:30am - 4:30pm",
  type: "financial",
  location: "(40.71726637186103, -73.99924605626391)",
  x_coordinate: 984459,
  y_coordinate: 200596,
}
const facilityFinancial = csvPoint.readFeature(financial)


const stationFeature = new Feature({
  "name": "Astor Pl",
  "url": "http://web.mta.info/nyct/service/",
  "line": "4-6-6 Express",
  "notes": "4 nights, 6-all times, 6 Express-weekdays AM southbound, PM northbound"
})

const lineFeature = new Feature({
  "name":"G",
  "url":"http://web.mta.info/nyct/service/",
  "rt_symbol":"G",
})

nyc.mixin(decorations.facility, [{facilityStyle: style}])
nyc.mixin(facilityPermanent, [decorations.facility])
nyc.mixin(facilityCultural, [decorations.facility])
nyc.mixin(facilityFinancial, [decorations.facility])
nyc.mixin(stationFeature, [decorations.station])
nyc.mixin(lineFeature, [decorations.line])

module.exports = {facilityPermanent, facilityCultural, facilityFinancial, stationFeature, lineFeature}

