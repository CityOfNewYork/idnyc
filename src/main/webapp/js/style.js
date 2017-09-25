nyc.style = function(feature, resolution){
  var type = feature.get('type');
  var zoom = nyc.ol.TILE_GRID.getZForResolution(resolution);
  nyc.style.cache[type] = nyc.style.cache[type] || {};
  if (!nyc.style.cache[type][zoom]){
    var size = 16;
    if (zoom > 11) size = 24;
    if (zoom > 14) size = 32;
    nyc.style.cache[type][zoom] = new ol.style.Style({
      image: new ol.style.Icon({
        src: 'img/' + type + '.png',
        scale: size / 232
      })
    });
  }
  return nyc.style.cache[type][zoom];
};

nyc.style.cache = {};
