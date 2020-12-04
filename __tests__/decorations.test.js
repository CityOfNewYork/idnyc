import {facilityPermanent,facilityFinancial,facilityCultural,stationFeature,lineFeature} from './feature.mock'
import Feature from 'ol/Feature'
import decorations from '../src/js/decorations'
import oodFeatures from '../src/js/oodFeatures'

describe('facility', () => {
  describe('extendFeature', () => {
    const checkStatus = oodFeatures.checkStatus
    beforeEach(() => {
      oodFeatures.checkStatus = jest.fn()
    })
    afterEach(() => {
      oodFeatures.checkStatus = checkStatus
    })
    test('extendFeature', () => {
      facilityPermanent.extendFeature()
      expect(oodFeatures.checkStatus).toHaveBeenCalledTimes(1)
      expect(oodFeatures.checkStatus.mock.calls[0][0]).toBe(facilityPermanent)
      expect(facilityPermanent.get('search_label')).toBe(`<b><span class="srch-lbl-lg">King Manor</span></b><br>` +
      `<span class="srch-lbl-sm">150-03 Jamaica Ave</span>`)
      expect(facilityPermanent.get('search_name')).toBe(`King Manor, 150-03 Jamaica Ave, Queens, NY 11432`)
    })
  })

  test('getName', () => {
    expect(facilityPermanent.getName()).toBe('King Manor')
  })
  test('getAddress1', () => {
    expect(facilityPermanent.getAddress1()).toBe('150-03 Jamaica Ave')
  })
  test('getName', () => {
    expect(facilityPermanent.getAddress2()).toBe('')
  })
  test('getCity', () => {
    expect(facilityPermanent.getCity()).toBe('Queens')
  })
  test('getCityStateZip', () => {
    expect(facilityPermanent.getCityStateZip()).toBe('Queens, NY 11432')
  })
  test('cssClass', () => {
    expect(facilityPermanent.cssClass()).toBe('permanent')
  })
  test('detailsHtml - no fields', () => {
    expect(Object.assign(new Feature({}), decorations.facility).detailsHtml()).toBeUndefined()
  })
  test('detailsHtml - w/ fields', () => {
    expect(Object.assign(new Feature({'url': 'url', 'hours': 'hours', 'additional_info': 'Closed' }), decorations.facility).detailsHtml()).toEqual($('<div><div><strong>Hours: </strong><div class="hours notranslate">hours</div></div><div><strong>Additional Info: </strong><br>Closed</div><a class="btn rad-all prep" href="url" target="_blank">Prepare for your visit</a></div>'))
  })
  test('getStartDate', () => {
    expect(facilityPermanent.getStartDate()).toBe('2020-08-01')
  })
  test('getEndDate', () => {
    expect(facilityPermanent.getEndDate()).toBe('2020-09-03')
  })
})

describe('station', () => {
  test('getName', () => {
    expect.assertions(2)
    expect(stationFeature.getName()).toBe(`${stationFeature.get('name')}`)
    expect(stationFeature.getName()).not.toBeNull()
  })
  test('getTip', () => {
    expect.assertions(2)
    expect(stationFeature.getTip()).toBe(`${stationFeature.get('name')}`)
    expect(stationFeature.getTip()).not.toBeNull()
  })
  test('getLine', () => {
    expect.assertions(2)
    expect(stationFeature.getLine()).toBe(`${stationFeature.get('line')}`)
    expect(stationFeature.getLine()).not.toBeNull()
  })
  test('getUrl', () => {
    expect.assertions(2)
    expect(stationFeature.getUrl()).toBe(`${stationFeature.get('url')}`)
    expect(stationFeature.getUrl()).not.toBeNull()
  })
  test('getNote', () => {
    expect.assertions(2)
    expect(stationFeature.getNote()).toBe(`<div class="note">${stationFeature.get('notes')}</div>`)
    expect(stationFeature.getNote()).not.toBeNull()
  })
  test('getSubwayIcon', () => {
    let line = '7'
    expect(stationFeature.getSubwayIcon(line)).toBe(`<div class="subway-icon subway-7 notranslate"><div>7</div></div>`)
  })
  test('getSubwayIcon - express', () => {
    let line = '7 Express'
    expect(stationFeature.getSubwayIcon(line)).toBe(`<div class="subway-icon subway-7 express notranslate"><div>7</div></div>`)
  })
  test('getSubwayIcon - local/express', () => {
    let line = '7-7 Express'
    expect(stationFeature.getSubwayIcon(line)).toBe(`<div class="subway-icon subway-7 notranslate"><div>7</div></div><div class="subway-icon subway-7 express notranslate"><div>7</div></div>`)
  })
  describe('html', () => {
    const getSubwayIcon = stationFeature.getSubwayIcon
    const getLine = stationFeature.getLine
    const getNote = stationFeature.getNote
    const getUrl = stationFeature.getUrl
    const getName = stationFeature.getName

    beforeEach(() => {
      stationFeature.getSubwayIcon = jest.fn().mockImplementation(() => {
        return 'mockSubwayIcon'
      })
      stationFeature.getLine = jest.fn().mockImplementation(() => {
        return 'mockLine'
      })
      stationFeature.getNote = jest.fn().mockImplementation(() => {
        return 'mockNote'
      })
      stationFeature.getUrl = jest.fn().mockImplementation(() => {
        return 'mockUrl'
      })
      stationFeature.getName = jest.fn().mockImplementation(() => {
        return 'mockName'
      })
    })
    afterEach(() => {
      stationFeature.getSubwayIcon = getSubwayIcon
      stationFeature.getLine = getLine
      stationFeature.getNote = getNote
      stationFeature.getUrl = getUrl
      stationFeature.getName = getName
    })
    test('html', () => {
      expect(stationFeature.html()).toEqual($('<div class="station"><h1 class="station-name">mockName</h1>mockSubwayIcon<h1 class="station-url notranslate">mockUrl</h1>mockNote</div>'))
      expect(stationFeature.getSubwayIcon).toHaveBeenCalledTimes(1)
      expect(stationFeature.getLine).toHaveBeenCalledTimes(1)
      expect(stationFeature.getNote).toHaveBeenCalledTimes(1)
      expect(stationFeature.getUrl).toHaveBeenCalledTimes(1)
      expect(stationFeature.getName).toHaveBeenCalledTimes(1)
      expect(stationFeature.getSubwayIcon.mock.calls[0][0]).toBe('mockLine')
    })
  })
})

describe('line', () => {
  const getLine = lineFeature.getLine
  const getSubwayIcon = decorations.station.getSubwayIcon

  beforeEach(() => {
    lineFeature.getLine = jest.fn().mockImplementation(() => {
      return 'mockLine'
    })
    decorations.station.getSubwayIcon = jest.fn().mockImplementation(() => {
      return 'mockSubwayIcon'
    })
  })
  afterEach(() => {
    decorations.station.getSubwayIcon = getSubwayIcon
    lineFeature.getLine = getLine
  })
  test('getTip', () => {
    expect(lineFeature.getTip()).toBe('mockLine')
    expect(lineFeature.getLine).toHaveBeenCalledTimes(1)
  })
  test('getLine', () => {
    lineFeature.getLine = getLine
    
    expect(lineFeature.getLine()).toBe('mockSubwayIcon')
  
    expect(decorations.station.getSubwayIcon).toHaveBeenCalledTimes(1)
    
  })
})

