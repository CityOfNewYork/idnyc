import FinderApp from 'nyc-lib/nyc/ol/FinderApp'
import CsvPoint from 'nyc-lib/nyc/ol/format/CsvPoint'
import config from './config'
import decorations from './decorations'
import oodFeatures from './oodFeatures'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import style from './style'

const format = new CsvPoint({});
format.readFeature = source => {
    const feature = new Feature(source)
    try {
        let coords = source['Location 1']

        if (!coords)
            console.info("coords not defined")
        coords = coords.substr(1, coords.length - 2).split(',')
        coords = [1 * coords[1], 1 * coords[0]]
        var geom = new Point(proj4('EPSG:4326', 'EPSG:3857', coords))
        feature.setGeometry(geom)
    } catch (badGeom) {
        //console.error(badGeom, source)
    }
    return feature
};

class App extends FinderApp {
    constructor() {   
        super({
            title: 'Locations Finder',
            facilityTabTitle: 'Locations',
            geoclientUrl: config.GEOCLIENT_URL,
            facilityUrl: config.FACILITY_CSV_URL,
            facilityStyle: style.featureStyle,
            facilityFormat: format,
            decorations: decorations,
            splashOptions: App.getSplashOptions(),
            facilitySearch: { displayField: 'search_label', nameField: 'search_name' },
            directionsUrl: config.DIRECTIONS_URL,
            filterChoiceOptions: [
                {
                    title: 'Location Type',
                    choices: [
                        {
                            name: 'type',
                            values: ['permanent'],
                            label: 'ID NYC (permanent)',
                            checked: true
                        }, 
                        {
                            name: 'type',
                            values: ['cultural'],
                            label: 'Cultural Institution',
                            checked: true
                        },
                        {
                            name: 'type',
                            values: ['financial'],
                            label: 'Financial Institution',
                            checked: true
                        }
                    ]
                }
            ]
        })
    } 
    ready(features) {
        const oodList = oodFeatures.getOodList()
        oodList.forEach(feature => {
          this.source.removeFeature(feature)
        })
        super.ready(this.source.getFeatures())
    }
}  

App.getSplashOptions = () => {
	return {
		message: config.SPLASH_MESSAGE,
		buttonText: ['Screen reader instructions', 'View map']
	}
}
export default App