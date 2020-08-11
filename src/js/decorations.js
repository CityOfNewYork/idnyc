import $ from 'jquery'
import nyc from 'nyc-lib/nyc'

const decorations = {
    extendFeature() {
        this.set(
            'search_label',
            `<b><span class="srch-lbl-lg">${this.getName()}</span></b><br>` +
            `<span class="srch-lbl-sm">${this.getAddress1()}</span>`
          )
        this.set('search_name', `${this.getName()}, ${this.getAddress1()}, ${this.getCityStateZip()}`)
    },
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