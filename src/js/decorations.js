import $ from 'jquery'
import nyc from 'nyc-lib/nyc'
import oodFeatures from './oodFeatures'

const decorations = {
  facility: {
    extendFeature() {
      oodFeatures.checkStatus(this)
      
      this.set(
        'search_label',
        `<b><span class="srch-lbl-lg">${this.getName()}</span></b><br>` +
        `<span class="srch-lbl-sm">${this.getAddress1()}</span>`
      )
      this.set('search_name', `${this.getName()}, ${this.getAddress1()}, ${this.getCityStateZip()}`)
    },
    getName() {
      return this.get('name')
    },
    getAddress1() {
      return this.get('address1')
    },
    getAddress2() {
      return this.get('address2')
    },
    getCity() {
      return this.get('city')
    },
    getCityStateZip() {
      return this.getCity() + ', NY ' + this.get('zip')
    },
    cssClass() {
      return this.get('type')
    },
    detailsHtml: function() {
      const html = $('<div></div>')

      const lnk = this.get('url')
      const info = this.get('additional_info')
      const hours = this.get('hours')

      if (hours) {
        html.append(`<div><strong>Hours: </strong><div class="hours notranslate">${hours}</div></div>`)
      }
      if (info) {
        html.append(`<div><strong>Additional Info: </strong><br>${info}</div>`)
      }
      if (lnk) {
        html.append(`<a class="btn rad-all prep" href="${lnk}" target="_blank">Prepare for your visit</a>`)
      }

      if (html.children().length > 0) return html
    },
    getStartDate() {
      return this.get('start_date')
    },
    getEndDate() {
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
        lineHtml += `<div class="subway-icon subway-${line.replace('Express', 'express')} notranslate"><div>${lineTruncate}</div></div>` 
      })
      return lineHtml
    },
    html() {
      return $('<div class="station"></div>')
        .append(`<h1 class="station-name">${this.getName()}</h1>`)
        .append(this.getSubwayIcon(this.getLine()))
        .append(`<h1 class="station-url notranslate">${this.getUrl()}</h1>`)
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