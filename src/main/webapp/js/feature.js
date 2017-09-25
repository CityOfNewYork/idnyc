nyc.feature = {
  html: function(){
    return $('<div class="info"></div>')
      .append(this.distanceHtml())
      .append(this.nameHtml())
      .append(this.addressHtml())
      .append(this.mapHtml())
      .append(this.directionsHtml());
  },
  distanceHtml: function(){
    var distance = this.get('distance');
    if (!(distance === undefined)){
      var div = $('<div class="distance"></div>');
      return div.html('&bull; ' + (distance / 5280).toFixed(2) + ' mi &bull;');
    }
  },
  iconHtml: function(){
    var img = $('<img class="icon">');
    return img.attr('src', 'img/' + this.get('type') + '.png');
  },
  nameHtml: function(){
    var div = $('<div class="name"></div>');
    return div.html(this.get('name'));
  },
  addressHtml: function(){
    var div = $('<div class="address"></div>');
    return div.append('<div>' + this.get('address1') + '</div>')
      .append('<div>' + this.get('address2') + '</div>')
      .append('<div>' + this.get('city') + ', NY ' + this.get('zip') + '</div>');
  },
  hoursHtml: function(){
    var div = $('<div class="hours"></div>');
    return div.html(this.get('hours'));
  },
  mapHtml: function(){
    var a = $('<a class="map" data-role="button" onclick="nyc.app.zoomTo(event);">Map</a>');
    return a.data('feature', this);
  },
  directionsHtml: function(){
    var a = $('<a class="directions" data-role="button" onclick="nyc.app.directionsTo(event);">Directions</a>');
    return a.data('feature', this);
  },
  address: function(){
    return this.get('address1') + ', ' + this.get('city') + ' NY, ' + this.get('zip');
  }
};
