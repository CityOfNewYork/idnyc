import FinderApp from 'nyc-lib/nyc/ol/FinderApp'
import App from '../src/js/App'

jest.mock('nyc-lib/nyc/ol/FinderApp')

const rearrangeLayers = App.prototype.rearrangeLayers
const addSubwayLayers = App.prototype.addSubwayLayers
beforeEach(() => {
    FinderApp.mockReset()
    App.prototype.rearrangeLayers = jest.fn()
    App.prototype.addSubwayLayers = jest.fn()
})
afterEach(() => {
    App.prototype.rearrangeLayers = rearrangeLayers
    App.prototype.addSubwayLayers = addSubwayLayers
})

test ('index creates App', () => {
    expect.assertions(3)
    require('../src/js/index')
    expect(FinderApp).toHaveBeenCalledTimes(1)
    expect(App.prototype.rearrangeLayers).toHaveBeenCalledTimes(1)
    expect(App.prototype.addSubwayLayers).toHaveBeenCalledTimes(1)
})
