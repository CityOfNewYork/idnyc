import $ from 'jquery'
import nyc from 'nyc-lib/nyc'
import oodFeatures from './oodFeatures'

const decorations = {
  facility: {
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
  },
  station: {
    getName() {
      return this.get('name')
    },
    getTip() {
      return this.getName()
    },
    getLine() {
      return this.get('line')
    },
    getNote() {
      return `<div class="note">${this.get('notes')}</div>`
    },
    getUrl() {
      return this.get('url')
    },
    getSubwayIcon(line) {
      let lines = line.split('-')
      let lineHtml = ''
      
      lines.forEach(line => {
        let lineTruncate = line.indexOf('Express') > -1 ? line.replace('Express', '').trim() : line
        lineHtml += `<div class="subway-icon subway-${line.replace('Express', 'express')}"><div>${lineTruncate}</div></div>` 
      })
      return lineHtml
    },
    html() {
      return $('<div class="station"></div>')
        .append(`<h1 class="station-name">${this.getName()}</h1>`)
        .append(this.getSubwayIcon(this.getLine()))
        .append(`<h1 class="station-url">${this.getUrl()}</h1>`)
        .append(this.getNote()) 
    }
  },
  line: {
    getTip() {
      return this.getLine()
    },
    getLine() {
      return decorations.station.getSubwayIcon(this.get('name'))
    }
  }
}

export default decorations