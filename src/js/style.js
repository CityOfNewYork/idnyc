import nyc0l from 'nyc-lib/nyc/ol'
import Style from 'ol/style/Style'
import Icon from 'ol/style/Icon'

const facilityStyle = {
    featureStyle: (feature, resolution) => {
        var type = feature.get('type').toLowerCase();
        var zoom = nyc0l.TILE_GRID.getZForResolution(resolution);
        //var zoom = 15;
        var size = 12;
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
      }
}

export default facilityStyle