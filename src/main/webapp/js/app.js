nyc.App = function(map, source, locationMgr, typeFilter, directions){
  this.map = map;
  this.view = map.getView();
  this.source = source;
  this.directions = directions;
  this.pager = new nyc.ListPager();
  this.popup = new nyc.ol.Popup(map);
  this.listLocations();
  $('#locations-tab-btn a').trigger('click');
  $('#btn-more a').click($.proxy(this.listNextPage, this));
  map.on('click', this.mapClick, this);
  locationMgr.on(nyc.Locate.EventType.GEOCODE, $.proxy(this.located, this));
	locationMgr.on(nyc.Locate.EventType.GEOLOCATION, $.proxy(this.located, this));
  typeFilter.on('change', this.filter, this);
  this.typeFilter = typeFilter;
  $('#tabs a').click($.proxy(this.tabs, this));
  nyc.app = this;
};

nyc.App.prototype = {
  map: null,
  view: null,
  source: null,
  location: null,
  lastDir: null,
  typeFilter: null,
  filter: function(){
		var me = this, values = [];
    $.each(me.typeFilter.val(), function(){
      values.push(this.value);
    });
		//provide time for checkbox display to update
		setTimeout(function(){
			me.source.filter([{property: 'type', values: values}]);
			me.listLocations();
		}, 100);
	},
  origin: function(){
		var location = this.location || {};
		if (location.type == 'geolocation'){
			var coordinates = proj4('EPSG:3857', 'EPSG:4326', location.coordinates);
			return [coordinates[1], coordinates[0]];
		}
		return location.name || '';
	},
  located: function(location){
    this.location = location;
    this.listLocations();
  },
  zoomTo: function(event){
    var me = this, feature = $(event.target).data('feature');
    me.view.animate({
      zoom: 15,
      center: feature.getGeometry().getCoordinates()
    });
    me.map.once('moveend', function(){
      me.showPopup(feature);
    });
  },
  directionsTo: function(event){
    var me = this,
      feature = $(event.target).data('feature'),
      to = feature.address(),
      name = feature.get('name'),
      from = me.origin();
    $('body').pagecontainer('change', $('#dir-page'), {transition: 'slideup'});
    if (me.lastDir != from + '|' + to){
      var args = {from: unescape(from), to: unescape(to), facility: unescape(name)};
      me.lastDir = from + '|' + to;
      me.directions.directions(args);
    }
  },
  mapClick: function(event){
    var feature;
    this.map.forEachFeatureAtPixel(event.pixel, function(feat){
      feature = feat;
    });
    if (feature){
      this.showPopup(feature);

    }
  },
  showPopup: function(feature){
      this.popup.show({
        html: feature.html(),
        coordinates: feature.getGeometry().getCoordinates()
      });
  },
  listLocations: function(){
    var features = this.source.sort(this.location);
    $('#location-list').empty();
    this.popup.hide();
		this.pager.reset(features);
		$('#location-list').empty();
		this.listNextPage();
  },
  listNextPage: function(){
		var container = $('#location-list');
		$.each(this.pager.next(), function(i, feature){
			var div = feature.html('inf-list');
			if (i % 2 == 0) $(div).addClass('even-row');
			$('#location-list').append(div).trigger('create');
		});
		$('#btn-more')[$('div.inf-list').length == this.source.getFeatures().length ? 'fadeOut' : 'fadeIn']();
	},
  resize: function(){
		if ($('#panel').width() != $(window).width() && $('#map-tab-btn').hasClass('ui-tabs-active')){
			$('#location-tab-btn a').trigger('click');
		}
		if($(window).height() < $(window).width() && $('body').pagecontainer('getActivePage').attr('id') == 'dir-page'){
			$('#dir-toggle a:last-of-type:not(.ui-btn-active)').trigger('click');
		}
	},
  /**
	 * @private
	 * @method
	 * @param {JQuery.Event} event
	 */
	tabs: function(event){
		var target = $(event.currentTarget);
		$('#panel').css(
			'z-index',
			target.attr('href') == '#map-tab' ? 999 : 1000
		);
	}
};
