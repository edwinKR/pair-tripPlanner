console.log('Hello from JavaScript');

const mapboxgl = require('mapbox-gl');
const buildMarker = require('./marker');

mapboxgl.accessToken =
  'pk.eyJ1IjoidG9wc2FtZ2FrIiwiYSI6ImNqbWk2YmdsejAxcnAzcHBtaXFmMXA2Z3gifQ.EKmijO8Qlt0bctI6-jXuAw';

const fullstackCoords = [-74.009, 40.705]; // FullStack NY coordinates;  alternatively, use [-87.6354, 41.8885] for Chicago

const map = new mapboxgl.Map({
  style: 'mapbox://styles/mapbox/light-v9', // mapbox has lots of different map styles available.
  center: fullstackCoords,
  zoom: 15.5, // starting zoom
  pitch: 45,
  bearing: -17.6,
  container: 'map'
});

map.on('load', function () {
  // Insert the layer beneath any symbol layer.
  var layers = map.getStyle().layers;

  var labelLayerId;
  for (var i = 0; i < layers.length; i++) {
    if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
      labelLayerId = layers[i].id;
      break;
    }
  }

  map.addLayer({
    'id': '3d-buildings',
    'source': 'composite',
    'source-layer': 'building',
    'filter': ['==', 'extrude', 'true'],
    'type': 'fill-extrusion',
    'minzoom': 15,
    'paint': {
      'fill-extrusion-color': '#aaa',

      // use an 'interpolate' expression to add a smooth transition effect to the
      // buildings as the user zooms in
      'fill-extrusion-height': [
        "interpolate", ["linear"], ["zoom"],
        15, 0,
        15.05, ["get", "height"]
      ],
      'fill-extrusion-base': [
        "interpolate", ["linear"], ["zoom"],
        15, 0,
        15.05, ["get", "min_height"]
      ],
      'fill-extrusion-opacity': .6
    }
  }, labelLayerId);
});

console.log('This is the marker DOM ELEMENT: ', buildMarker);
const marker = buildMarker('activities', fullstackCoords);
marker.addTo(map);

// new mapboxgl.Marker(buildMarker).setLngLat([-74.009, 40.705]).addTo(map);
