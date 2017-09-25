nyc.idNycStyle = function(feature, resolution){
  var type = feature.get('type');
  var zoom = nyc.ol.TILE_GRID.getZForResolution(resolution);
  nyc.idNycStyle.cache[type] = nyc.idNycStyle.cache[type] || {};
  if (!nyc.idNycStyle.cache[type][zoom]){
    var size = 16;
    if (zoom > 11) size = 24;
    if (zoom > 14) size = 32;
    nyc.idNycStyle.cache[type][zoom] = new ol.style.Style({
      image: new ol.style.Icon({
        src: 'img/' + type + '.png',
        scale: size / 232
      })
    });
  }
  return nyc.idNycStyle.cache[type][zoom];
};

nyc.idNycStyle.cache = {};
