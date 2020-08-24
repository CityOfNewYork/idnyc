import $ from 'jquery'
import nyc from 'nyc-lib/nyc'
import oodFeatures from './oodFeatures'

const decorations = {
    extendFeature() {
        oodFeatures.checkStatus(this);
       
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
        const html = $('<div>' + this.get('hours') + '</div>')

        const lnk = this.get('url')
        if (lnk) {
            html.append(`<a class="btn rad-all prep" href="${lnk}" target="_blank">Prepare for your visit</a>`)
        }
        return html
    },
    getStartDate: function() {
        return this.get('start_date')
    },
    getEndDate: function() {
        return this.get('end_date')
    }
}

export default decorations