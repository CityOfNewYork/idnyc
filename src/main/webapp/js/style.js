var finderStyle = function(feature, resolution){
  var type = feature.get('type').toLowerCase();
  var zoom = nyc.ol.TILE_GRID.getZForResolution(resolution);
  finderStyle.cache[type] = finderStyle.cache[type] || {};
  if (!finderStyle.cache[type][zoom]){
    var size = 12;
    if (zoom > 11) size = 16;
    if (zoom > 13) size = 24;
    if (zoom > 15) size = 32;
    if (zoom > 17) size = 40;
    finderStyle.cache[type][zoom] = new ol.style.Style({
      image: new ol.style.Icon({
        src: 'img/' + type + '.svg',
        scale: size / 512
      })
    });
  }
  return finderStyle.cache[type][zoom];
};

finderStyle.cache = {};
