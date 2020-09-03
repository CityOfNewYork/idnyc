import {App} from '../src/js/App'
import index from '../src/js/index'

test ('index creates App', () => {
    expect(window.finderApp instanceof App).toBe(true)
})