var finderStyle = function(feature, resolution){
  var type = feature.get('type').toLowerCase();
  var zoom = nyc.ol.TILE_GRID.getZForResolution(resolution);
  finderStyle.cache[type] = finderStyle.cache[type] || {};
  if (!finderStyle.cache[type][zoom]){
    var size = 16;
    if (zoom > 11) size = 32;
    if (zoom > 14) size = 64;
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
