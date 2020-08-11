import App from '../src/js/App'
import FinderApp from 'nyc-lib/nyc/ol/FinderApp'

jest.mock('nyc-lib/nyc/ol/FinderApp')

test ('consturctor', () => {
    const app = new App()
    expect(FinderApp).toHaveBeenCalledTimes(1)
})