import nycol from 'nyc-lib/nyc/ol'
import Style from 'ol/style/Style'
import Stroke from 'ol/style/Stroke'
import Circle from 'ol/style/Circle'
import Fill from 'ol/style/Fill'
import Icon from 'ol/style/Icon'
import lookup from './lookup'

const ICONS = {
  financial: 'bank-15.svg',
  permanent: 'building-15.svg',
  temporary: 'campsite-15.svg',
  cultural: 'stadium-15.svg'
}
const COLORS = {
  cultural: '#00008B',
  financial: '#006400',
  temporary: '#4A235A',
  permanent: '#df4b2a'
}

const styles = {
  featureStyle: (feature, resolution) => {
    const type = feature.get('type').toLowerCase()
    const zoom = nycol.TILE_GRID.getZForResolution(resolution)

    let size = 12
    if (zoom > 11) size = 16
    if (zoom > 13) size = 24
    if (zoom > 15) size = 32
    if (zoom > 17) size = 40

    let denominator = 15
    if (type === 'financial') {
      denominator = 17
    }
    if (type === 'temporary') {
      denominator = 18
    }
    return [
      new Style({
        image: new Circle({
          radius: size / 1.8,
          fill: new Fill({
            color: 'rgba(255,255,255,.7)'
          }),
          stroke: new Stroke({
            width: 1,
            color: COLORS[type]
          })
        })
      }),
      new Style({
      image: new Icon({
        src: 'img/' + ICONS[type],
        scale: size / denominator,
        imgSize: [15, 15]
      })
    })]
  },
  lineStyle: (feature, resolution) => {
    const zoom = nycol.TILE_GRID.getZForResolution(resolution)
    let line = feature.get('name').split('-')[0]
    let width = [2, 3, 3, 5, 5, 8, 8, 12, 16, 18, 20, 22][zoom - 11] || 20

    const style = new Style({
      stroke: new Stroke({
        color: lookup.color[line] || '#000',
        width: width / 2
      }),
      fill: new Fill({
        color: 'rgba(0, 0, 0, 0)'
      })
    })
    if(zoom > 10) return style
  },
  stationStyle: (feature, resolution) => {
    const zoom = nycol.TILE_GRID.getZForResolution(resolution)
    let radius = [10, 12, 16, 24, 24, 28, 28][zoom - 11] || 28

    const style = new Style({
      image: new Circle({
        radius: (radius / 4),
        stroke: new Stroke({
          color: '#000',
          width: 2
        }),
        fill: new Fill({
          color: 'rgba(255,255,255,0.9)'
        })
      })
    })
    if(zoom > 12) return style
  }
}



export default styles