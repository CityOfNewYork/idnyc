import FinderApp from 'nyc-lib/nyc/ol/FinderApp'
import CsvPoint from 'nyc-lib/nyc/ol/format/CsvPoint'
import config from './config'
import decorations from './decorations'
import oodFeatures from './oodFeatures'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import styles from './style'
import TopoJSON from 'ol/format/TopoJSON'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import FeatureTip from 'nyc-lib/nyc/ol/FeatureTip'
import Popup from 'nyc-lib/nyc/ol/MultiFeaturePopup'
import MapMgr from 'nyc-lib/nyc/ol/MapMgr'
import Decorate from 'nyc-lib/nyc/ol/format/Decorate'
import {extend as extentExtend} from 'ol/extent'


class App extends FinderApp {
  constructor() {   
    super({
      title: 'Locations Finder',
      facilityTabTitle: 'Locations',
      geoclientUrl: config.GEOCLIENT_URL,
      facilityUrl: config.FACILITY_CSV_URL,
      facilityStyle: styles.featureStyle,
      facilityFormat: new CsvPoint({
        x: 'x_coordinate',
        y: 'y_coordinate',
        dataProjection: 'EPSG:2263'
      }),
      decorations: decorations.facility,
      splashOptions: {message: config.SPLASH_MESSAGE},
      facilitySearch: { displayField: 'search_label', nameField: 'search_name' },
      directionsUrl: config.DIRECTIONS_URL,
      filterChoiceOptions: [
        {
          title: 'Location Type',
          choices: [
            {
              name: 'type',
              values: ['permanent'],
              label: 'IDNYC (permanent)',
              checked: true
            }, 
            {
              name: 'type',
              values: ['temporary'],
              label: 'IDNYC (temporary)',
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
    this.rearrangeLayers()
    this.addSubwayLayers()
    $('#banner').on('click', () => {
      document.location = './'
    })
  } 
  rearrangeLayers() {
    this.map.getBaseLayers().labels.base.setZIndex(4)
    this.layer.setZIndex(3)
  }
  ready(features) {
    const oodList = oodFeatures.getOodList()
    oodList.forEach(feature => {
      this.source.removeFeature(feature)
    })
    super.ready(this.source.getFeatures())
  }
  makeLayer(decoration, url, zIndex, style) {
    let source = new VectorSource({
      url: url,
      format: new Decorate({
        parentFormat: new TopoJSON(),
        decorations: decoration
      })
    })
    let layer = new VectorLayer({
      source: source,
      style: style,
      zIndex: zIndex
    })
    this.createTip(layer)
    return layer
  }
  addSubwayLayers() {
    let lineLayer = this.makeLayer([decorations.line],'data/subway-line.topojson', 1, styles.lineStyle)
    let stationLayer = this.makeLayer([decorations.station],'data/subway-station.topojson', 2, styles.stationStyle)

    this.map.addLayer(lineLayer)
    this.map.addLayer(stationLayer)
    this.popup.addLayer(stationLayer)
  }
  createTip(layer) {
    let tip = new FeatureTip({
      map: this.map,
      tips: [{
        layer: layer,
        label: MapMgr.tipFunction
      }]
    })
  }
  located(location) {
    super.located(location)
    this.zoomToExtent(location.coordinate, config.FACILITY_LIMIT)
  }
  zoomToExtent(coord, limit){
    let extent = new Point(coord).getExtent()
    const features = this.source.nearest(coord, limit)
    features.forEach(f => {
      extent = extentExtend(extent, f.getGeometry().getExtent())
    })
    extent = [extent[0] - 750, extent[1] - 750, extent[2] + 750, extent[3] + 750]
    this.view.fit(extent, {size: this.map.getSize(), duration: 500})
  }
}  

export default App