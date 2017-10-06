$(document).ready(function(){

  var map = new nyc.ol.Basemap({target: $('#map').get(0)});

  var subwayStyle = new ta.Style(ta.lookup);
  var subwayContent = new nyc.Content(ta.messages);

  var subwayLineSrc = new nyc.ol.source.Decorating(
    {url: 'data/subway-line.json', format: new ol.format.TopoJSON()},
    [subwayContent, ta.lookup]
  );
  var subwayLineLyr = new ol.layer.Vector({
    source: subwayLineSrc,
    style: $.proxy(subwayStyle.line, subwayStyle),
    maxResolution: nyc.ol.TILE_GRID.getResolution(10),
    opacity: 0.6
  });

  var subwayStationSrc = new nyc.ol.source.Decorating(
    {loader: new nyc.ol.source.CsvPointFeatureLoader({
      url: 'data/subway-station.csv',
      projection: 'EPSG:2263',
      xCol: 'X',
      yCol: 'Y'
    })},
    [subwayContent, ta.lookup, ta.fieldAccess, ta.htmlRenderer],
    {projection: 'EPSG:3857'}
  );
  var subwayStationLyr = new ol.layer.Vector({
    source: subwayStationSrc,
    style: $.proxy(subwayStyle.station, subwayStyle),
    maxResolution: nyc.ol.TILE_GRID.getResolution(10)
  });
  map.addLayer(subwayLineLyr);
  map.addLayer(subwayStationLyr);
  new nyc.ol.FeatureTip(map, [{
    layer: subwayStationLyr,
    labelFunction: function(){
	    return {text: this.get('NAME')};
    }
  }]);

  var finderSource = new nyc.ol.source.FilteringAndSorting({
    loader: new nyc.ol.source.CsvPointFeatureLoader({
      url: 'https://data.cityofnewyork.us/api/views/5pbr-mxtd/rows.csv?accessType=DOWNLOAD',
      projection: 'EPSG:4326',
      geomParser: new nyc.ol.source.socrata.PointParser('Location 1')
    }),
  }, [finderDecorations], {
      nativeProjection: 'EPSG:4326',
      projection: 'EPSG:3857'
  });
  var finderLyr = new ol.layer.Vector({
    source: finderSource,
    style: finderStyle
  });
  map.addLayer(finderLyr);
  new nyc.ol.FeatureTip(map, [{
    layer: finderLyr,
    labelFunction: function(){
	    return {text: this.getName()};
    }
  }]);

  /* See README.md for getting your GeoClient App Id and App Key */
  var geocoder = new nyc.Geoclient(
    'https://maps.nyc.gov/geoclient/v1/search.json?app_key=74DF5DB1D7320A9A2&app_id=nyc-lib-example'
  );

  var locationMgr = new nyc.LocationMgr({
    controls: new nyc.ol.control.ZoomSearch(map),
    locate: new nyc.ol.Locate(geocoder),
    locator: new nyc.ol.Locator({map: map})
  });

  new nyc.FinderApp({
    map: map,
    finderSource: finderSource,
    locationMgr: locationMgr,
    filterControls: filterControls,
    directionsUrl: 'https://maps.googleapis.com/maps/api/js?sensor=false&libraries=visualization'
  });

});
