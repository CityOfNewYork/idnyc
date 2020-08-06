import $ from 'jquery'
import nyc from 'nyc-lib/nyc'

const decorations = {
    getName: function() {
        return this.get('name');
    },
    getAddress1: function() {
        return this.get('address1');
    },
    getAddress2: function() {
        return this.get('address2');
    },
    getCity: function() {
        return this.get('city');
    },
    getCityStateZip : function() {
        return this.getCity() + ', NY' + this.get('zip');
    },
    cssClass: function() {
        return this.get('type');
    },
    detailsHtml: function() {
        return $('<div>' + this.get('hours') + '</div>');
    }
}

export default decorations