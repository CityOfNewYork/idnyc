import nycol from 'nyc-lib/nyc/ol'
import Style from 'ol/style/Style'
import Stroke from 'ol/style/Stroke'
import Circle from 'ol/style/Circle'
import Fill from 'ol/style/Fill'
import Icon from 'ol/style/Icon'
import lookup from './lookup'

const styles = {
  featureStyle: (feature, resolution) => {
    const type = feature.get('type').toLowerCase();
    const zoom = nycol.TILE_GRID.getZForResolution(resolution);

    let size = 12;
    if (zoom > 11) size = 16;
    if (zoom > 13) size = 24;
    if (zoom > 15) size = 32;
    if (zoom > 17) size = 40;
    return new Style({
      image: new Icon({
        src: 'img/' + type + '.svg',
        scale: size / 512,
        imgSize: [512, 512]
      })
    });
  },
  lineStyle: (feature, resolution) => {
    const zoom = nycol.TILE_GRID.getZForResolution(resolution)
    let geom = feature.getGeometry()
    let line = feature.get('name').split('-')[0]
    let width = [2, 2, 2, 3, 3, 5, 5, 8, 8, 12, 16, 18, 20, 22][zoom - 9] || 20

    const style = [new Style({
      stroke: new Stroke({
        color: lookup.color[line],
        width: width / 2
      }),
      fill: new Fill({
        color: 'rgba(0, 0, 0, 0)'
      })
    })]
    if(zoom > 10) return style
  },
  stationStyle: (feature, resolution) => {
    const zoom = nycol.TILE_GRID.getZForResolution(resolution)
    let radius = [2, 2, 4, 4, 4, 6, 8, 10, 12, 16, 24, 24][zoom - 4]

    const style = new Style({
      image: new Circle({
        radius: (radius / 4) || 6,
        stroke: new Stroke({
          color: '#000',
          width: radius > 2 ? 2 : 1
        }),
        fill: new Fill({
          color: 'rgba(255,255,255,0.9)'
        })
      })
    });
    if(zoom > 11) return style
  }
}



export default styles