import CsvPoint from 'nyc-lib/nyc/ol/format/CsvPoint'
import style from '../src/js/style'
import decorations from '../src/js/decorations'
import nyc from 'nyc-lib/nyc'

const format = new CsvPoint({})

const permanent = {
    ID: 62,
    name: "King Manor",
    address1: "150-03 Jamaica Ave",
    address2: "",
    city: "Queens",
    zip: "11432",
    hours: "10am - 5pm",
    type: "permanent",
    'Location 1': "(40.702446, -73.803428)" 
}
const facilityPermanent = format.readFeature(permanet)

const cultural = {
    ID: 46,
    name: "PNC Bank",
    address1: "340 Madison Avenue",
    address2: "(1st floor)",
    city: "New York",
    zip: "10017",
    hours: "Mon-Fri: 8:30am - 4:30pm",
    type: "cultural",
    'Location 1': "(40.75386839943908, -73.97851342945145)" 
}
const facilityCultural = format.readFeature(cultural)

const financial = {
    ID: 28,
    name: 'East West Bank',
    address1: "208 Canal Street",
    address2: "",
    city: "New York",
    zip: "10013",
    hours: "Mon-Fri: 8:30am - 4:30pm",
    type: "financial",
    'Location 1': "(40.71726637186103, -73.99924605626391)" 
}
const facilityFinancial = format.readFeature(financial)

nyc.mixin(decorations, [{facilityStyle: style}])
nyc.mixin(permanent, decorations)
nyc.mixin(cultural, decorations)
nyx.miin(financial, decorations)

module.exports = {permanent, cultural, financial}

