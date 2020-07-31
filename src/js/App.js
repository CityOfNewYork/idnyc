import FinderApp from 'nyc-lib/nyc/ol/FinderApp'
import CsvPoint from 'nyc-lib/nyc/ol/format/CsvPoint'
import config from './config'
import decorations from './decorations'
import Feature from 'ol/Feature'

class App extends FinderApp {
    constructor() {   
        super({
            title: 'IDNYC Locations Finder',
            facilityTabTitle: 'IDNYC',
            geoclientUrl: config.GEOCLIENT_URL,
            facilityUrl: config.FACILITY_CSV_URL,
            facilityFormat: format,
            decorations: decorations,
            directionsUrl: config.DIRECTIONS_URL
        })
    }    
}

const format = new CsvPoint({});
format.readFeature = source => {
    const feature = Feature(source)
    try {
        let coords = source['Location 1']
        coords = coords.substr(1, coords.length - 2).split(',')
        coords = [1 * coords[1], 1 * coords[0]]
        var geom = new Point(proj4('EPSG:4326', 'EPSG:3857', coords))
        feature.setGeometry(geom)
    } catch (badGeom) {
        console.error(badGeom)
    }
    return feature
};
export default App