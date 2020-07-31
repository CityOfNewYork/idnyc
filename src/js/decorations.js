import $ from 'jquery'
import nyc from 'nyc-lib/nyc'

const decorations = {
    getName() {
        return this.get('name')
    },
    getAddress1() {
        return this.get('address1')
    },
    getCityStateZip() {
        return this.get('city') + ', NY ' + this.get('zip')
    }
}

export default decorations