var GEOCLIENT_URL = 'https://maps.nyc.gov/geoclient/v1/search.json?app_key=74DF5DB1D7320A9A2&app_id=nyc-lib-example';
var  GOOGLE_URL = 'https://maps.googleapis.com/maps/api/js?sensor=false&libraries=visualization';
var IDNYC_URL = 'https://data.cityofnewyork.us/api/views/5pbr-mxtd/rows.csv?accessType=DOWNLOAD';

$(document).ready(function(){
  var map = new nyc.ol.Basemap({target: $('#map').get(0)});

  var source = new nyc.ol.source.FilteringAndSorting({
    loader: new nyc.ol.source.CsvPointFeatureLoader({
      url: IDNYC_URL,
      projection: 'EPSG:4326',
      geomParser: new nyc.ol.source.socrata.PointParser('Location 1')
    }),
  }, [nyc.feature],{
      nativeProjection: 'EPSG:4326',
      projection: 'EPSG:3857'
  });

  map.addLayer(new ol.layer.Vector({
    source: source,
    style: nyc.style
  }));

  var geocoder = new nyc.Geoclient(GEOCLIENT_URL);
  var locationMgr = new nyc.LocationMgr({
    controls: new nyc.ol.control.ZoomSearch(map),
    locate: new nyc.ol.Locate(geocoder),
    locator: new nyc.ol.Locator({map: map})
  });

  var typeFilter = new nyc.Check({
    target: '#type',
    title: 'Location type',
    expanded: true,
    choices: [{
      name: 'permanent',
      value: 'permanent',
      label: '<img src="img/permanent.png" alt="ID NYC (permanent)">ID NYC (permanent)',
      checked: true
    }, {
      name: 'temporary',
      value: 'temporary',
      label: '<img src="img/permanent.png" alt="ID NYC (permanent)">ID NYC (temporary)',
      checked: true
    }, {
      name: 'cultural',
      value: 'cultural',
      label: '<img src="img/cultural.png" alt="Cultural Institution">Cultural Institution',
      checked: true
    }, {
      name: 'financial',
      value: 'financial',
      label: '<img src="img/financial.png" alt="Financial Institution">Financial Institution',
      checked: true
    }]
  });

  source.on(nyc.ol.source.Decorating.LoaderEventType.FEATURESLOADED , function(){
    new nyc.App(map, source, locationMgr, typeFilter, new nyc.Directions('#dir-map', '#directions', GOOGLE_URL));
  });

  new nyc.Share('#map');
});
