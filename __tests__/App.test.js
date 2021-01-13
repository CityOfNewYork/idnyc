import App from '../src/js/App'
import config from '../src/js/config'
import decorations from '../src/js/decorations'
import styles from '../src/js/style'
import FinderApp from 'nyc-lib/nyc/ol/FinderApp'
import CsvPoint from 'nyc-lib/nyc/ol/format/CsvPoint'
import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import TopoJSON from 'ol/format/TopoJSON'
import Decorate from 'nyc-lib/nyc/ol/format/Decorate'
import FeatureTip from 'nyc-lib/nyc/ol/FeatureTip'
import MapMgr from 'nyc-lib/nyc/ol/MapMgr'
import oodFeatures from '../src/js/oodFeatures'
import { Feature } from 'ol'
import Point from 'ol/geom/Point'

jest.mock('nyc-lib/nyc/ol/FinderApp')
jest.mock('nyc-lib/nyc/ol/format/CsvPoint')
jest.mock('ol/source/Vector')
jest.mock('ol/layer/Vector')
jest.mock('nyc-lib/nyc/ol/FeatureTip')


const rearrangeLayers = App.prototype.rearrangeLayers
const addSubwayLayers = App.prototype.addSubwayLayers
const readFeature = CsvPoint.prototype.readFeature

const setZ = jest.fn()
const addLayer = jest.fn()

const mockMap = {
  getBaseLayers: jest.fn().mockImplementation(() => {
    return {
      labels: {
        base: {
          setZIndex: setZ
        }
      }
    }
  }),
  addLayer: addLayer
}

const mockPopup = {
  addLayer: addLayer
}


beforeEach(() => {
  $.resetMocks()
  FinderApp.mockClear()
  CsvPoint.mockClear()
  App.prototype.rearrangeLayers = jest.fn()
  App.prototype.addSubwayLayers = jest.fn()
  CsvPoint.prototype.readFeature = jest.fn()
})
afterEach(() => {
  App.prototype.rearrangeLayers = rearrangeLayers
  App.prototype.addSubwayLayers = addSubwayLayers
  CsvPoint.prototype.readFeature = readFeature
})

test ('constructor', () => {
  expect.assertions(17)
  const app = new App()

  expect(FinderApp).toHaveBeenCalledTimes(1)
  expect(FinderApp.mock.calls[0][0].title).toEqual('Locations Finder')
  expect(FinderApp.mock.calls[0][0].facilityTabTitle).toEqual('Locations')
  expect(FinderApp.mock.calls[0][0].geoclientUrl).toEqual(config.GEOCLIENT_URL)
  expect(FinderApp.mock.calls[0][0].facilityUrl).toEqual(config.FACILITY_CSV_URL)
  expect(FinderApp.mock.calls[0][0].facilityStyle).toEqual(styles.featureStyle)
  expect(FinderApp.mock.calls[0][0].decorations).toEqual(decorations.facility)
  expect(FinderApp.mock.calls[0][0].splashOptions).toEqual({message: config.SPLASH_MESSAGE})
  expect(FinderApp.mock.calls[0][0].facilitySearch).toEqual({ displayField: 'search_label', nameField: 'search_name' })
  expect(FinderApp.mock.calls[0][0].directionsUrl).toEqual(config.DIRECTIONS_URL)
  expect(FinderApp.mock.calls[0][0].filterChoiceOptions).toEqual(
  [
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
  ])
  
  expect(FinderApp.mock.calls[0][0].facilityFormat instanceof CsvPoint).toBe(true)
  expect(CsvPoint.mock.calls[0][0].x).toEqual('x_coordinate')
  expect(CsvPoint.mock.calls[0][0].y).toEqual('y_coordinate')
  expect(CsvPoint.mock.calls[0][0].dataProjection).toEqual('EPSG:2263')

  expect(App.prototype.rearrangeLayers).toHaveBeenCalledTimes(1)
  expect(App.prototype.addSubwayLayers).toHaveBeenCalledTimes(1)
})

describe('rearrangeLayers', () => {
  const mockLayer = {
    setZIndex: setZ
  }

  test('rearrangeLayers', () => {
    expect.assertions(3)

    const app = new App()
    app.layer = mockLayer
    app.map = mockMap

    app.rearrangeLayers = rearrangeLayers
    app.rearrangeLayers()

    expect(setZ).toHaveBeenCalledTimes(2)
    expect(setZ.mock.calls[0][0]).toBe(4)
    expect(setZ.mock.calls[1][0]).toBe(3)
  })
})

describe('ready', () => {
  const getOodList = oodFeatures.getOodList
  const feature1 = new Feature({})
  const feature2 = new Feature({})
  beforeEach(() => {
    oodFeatures.getOodList = jest.fn().mockImplementation(() => {
      return [feature1, feature2]
    })
  })
  afterEach(() => {
    oodFeatures.getOodList = getOodList
  })
  test('ready', () => {
    expect.assertions(6)
    
    const app = new App()
    app.source = {
      removeFeature: jest.fn(),
      getFeatures: jest.fn().mockImplementation(() => {
        return 'mock-features'
      })
    }
    app.ready()
    expect(oodFeatures.getOodList).toHaveBeenCalledTimes(1)
    expect(app.source.removeFeature).toHaveBeenCalledTimes(2)
    expect(app.source.removeFeature.mock.calls[0][0]).toBe(feature1)
    expect(app.source.removeFeature.mock.calls[1][0]).toBe(feature2)
    expect(FinderApp.prototype.ready).toHaveBeenCalledTimes(1)
    expect(FinderApp.prototype.ready.mock.calls[0][0]).toBe('mock-features')
  })
})

describe('makeLayer', () => {
  const createTip = App.prototype.createTip
  beforeEach(() => {
    App.prototype.createTip = jest.fn()
  })
  afterEach(() => {
    App.prototype.createTip = createTip
  })
  test('makeLayer', () => {
    expect.assertions(10)

    let decoration = {}, url = '', zIndex = 0, style = {}
    const app = new App()

    app.makeLayer(decoration, url, zIndex, style)
    expect(VectorSource).toHaveBeenCalledTimes(1)
    expect(VectorSource.mock.calls[0][0].url).toBe(url)
    expect(VectorSource.mock.calls[0][0].format instanceof Decorate).toBe(true)
    expect(VectorSource.mock.calls[0][0].format.parentFormat instanceof TopoJSON).toBe(true)
    expect(VectorSource.mock.calls[0][0].format.decorations).toBe(decoration)

    expect(VectorLayer).toHaveBeenCalledTimes(1)
    expect(VectorLayer.mock.calls[0][0].style).toBe(style)
    expect(VectorLayer.mock.calls[0][0].zIndex).toBe(zIndex)

    expect(app.createTip).toHaveBeenCalledTimes(1)
    expect(app.createTip.mock.calls[0][0] instanceof VectorLayer).toBe(true)
  })

})

describe('addSubwayLayers', () => {
  const makeLayer = App.prototype.makeLayer
  const mockSource = jest.fn() 
  const mockStyle = jest.fn() 
  
  const mockLayer = {
    source: mockSource,
    style: mockStyle,
    setZIndex: setZ
  }
  beforeEach(() => {
    App.prototype.makeLayer = jest.fn()
  })
  afterEach(() => {
    App.prototype.makeLayer = makeLayer
  })
  test('addSubwayLayers', () => {
    expect.assertions(10)

    const app = new App()

    app.map = mockMap
    app.layer = mockLayer
    app.popup = mockPopup

    app.addSubwayLayers.mockClear()
    app.addSubwayLayers = addSubwayLayers

    app.addSubwayLayers()
    expect(app.makeLayer).toHaveBeenCalledTimes(2)
    expect(app.makeLayer.mock.calls[0][0]).toEqual([decorations.line])
    expect(app.makeLayer.mock.calls[0][1]).toBe('data/subway-line.topojson')
    expect(app.makeLayer.mock.calls[0][2]).toBe(1)
    expect(app.makeLayer.mock.calls[0][3]).toBe(styles.lineStyle)

    expect(app.makeLayer.mock.calls[1][0]).toEqual([decorations.station])
    expect(app.makeLayer.mock.calls[1][1]).toBe('data/subway-station.topojson')
    expect(app.makeLayer.mock.calls[1][2]).toBe(2)
    expect(app.makeLayer.mock.calls[1][3]).toBe(styles.stationStyle)

    expect(addLayer).toHaveBeenCalledTimes(3)
  })
})

test('createTip', () => {
  expect.assertions(5)

  const mockLayer = 'mockLayer'
  const app = new App()
  app.map = mockMap

  app.createTip(mockLayer)

  expect(FeatureTip).toHaveBeenCalledTimes(1)
  expect(FeatureTip.mock.calls[0][0].map).toBe(mockMap)
  expect(FeatureTip.mock.calls[0][0].tips.length).toBe(1)
  expect(FeatureTip.mock.calls[0][0].tips[0].layer).toBe(mockLayer)
  expect(FeatureTip.mock.calls[0][0].tips[0].label).toBe(MapMgr.tipFunction)

})

describe('located', () => {
  const zoomToExtent = App.prototype.zoomToExtent

beforeEach(() => {
  App.prototype.zoomToExtent = jest.fn()
})

afterEach(() => {
  App.prototype.zoomToExtent = zoomToExtent
})

  test('located', () => {
    expect.assertions(6)


    const app = new App()
    const location = {
      coordinate: 'mock-coordinate'
    }

    app.located(location)

    expect(FinderApp).toHaveBeenCalledTimes(1)
    expect(FinderApp.mock.instances[0].located).toHaveBeenCalledTimes(1)
    expect(FinderApp.mock.instances[0].located.mock.calls[0][0]).toBe(location)

    expect(App.prototype.zoomToExtent).toHaveBeenCalledTimes(1)
    expect(App.prototype.zoomToExtent.mock.calls[0][0]).toBe(location.coordinate)
    expect(App.prototype.zoomToExtent.mock.calls[0][1]).toBe(config.FACILITY_LIMIT)

  })
})

describe('zoomToExtent', () => {
  const mockSource = {
    nearest: jest.fn().mockImplementation((coord, limit) => {
      return [new Feature({geometry: new Point([100, 200])}), new Feature({geometry: new Point([100, 100])}), new Feature({geometry: new Point([200, 200])}), new Feature({geometry: new Point([300, 0])})]
    })
  }
  const mockMap = {
    getSize: jest.fn().mockImplementation(() => {
      return 'mock-size'
    })
  }
  const mockView = {
    fit: jest.fn()
  }

  test('zoomToExtent', () => {
    expect.assertions(8)

    const app = new App()
    app.source = mockSource
    app.map = mockMap
    app.view = mockView

    app.zoomToExtent([100, 150], config.FACILITY_LIMIT)

    expect(mockSource.nearest).toHaveBeenCalledTimes(1)
    expect(mockSource.nearest.mock.calls[0][0]).toEqual([100, 150])
    expect(mockSource.nearest.mock.calls[0][1]).toBe(config.FACILITY_LIMIT)

    expect(mockMap.getSize).toHaveBeenCalledTimes(1)
    expect(mockView.fit).toHaveBeenCalledTimes(1)

    expect(mockView.fit.mock.calls[0][0]).toEqual([100 - 750, 0 - 750, 300 + 750, 200 + 750])
    expect(mockView.fit.mock.calls[0][1].size).toBe('mock-size')
    expect(mockView.fit.mock.calls[0][1].duration).toBe(500)

  })
})