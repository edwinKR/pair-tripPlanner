// const markerDomElement = document.createElement('div');
// markerDomElement.style.width = '32px';
// markerDomElement.style.height = '39px';
// markerDomElement.style.backgroundImage = 'url(http://i.imgur.com/WbMOfMl.png)';

const { Marker } = require('mapbox-gl');

const iconURLs = {
  hotels: 'http://i.imgur.com/D9574Cu.png',
  restaurants: 'http://i.imgur.com/cqR6pUI.png',
  activities: 'http://i.imgur.com/WbMOfMl.png'
};

const buildMarker = function(type, coords) {
  if (!iconURLs.hasOwnProperty(type)) {
    type = 'activities';
  }

  const markerDomElement = document.createElement('div');
  markerDomElement.style.width = '32px';
  markerDomElement.style.height = '39px';
  markerDomElement.style.backgroundImage = `url(${iconURLs[type]})`;

  //Choosing the right icon for each type
  // if (type === 'activity') {
  //   markerDomElement.style.backgroundImage = `url(${iconURLs.activities})`;
  // } else if (type === 'hotel') {
  //   markerDomElement.style.backgroundImage = `url(${iconURLs.hotels})`;
  // } else if (type === 'restaurants') {
  //   markerDomElement.style.backgroundImage = `url(${iconURLs.restaurants})`;
  // }

  return new Marker(markerDomElement).setLngLat(coords);
};

module.exports = buildMarker;
