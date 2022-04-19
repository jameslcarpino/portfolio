// <!DOCTYPE html>
// <html>
//   <head>
//     <meta charset='utf-8' />
//     <title>AT Shelters</title>
//     <meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no' />
//     <script src='https://api.tiles.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.js'></script>
//     <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.css' rel='stylesheet' />
//     <style>
//       body {
//         margin: 0;
//         padding: 0;
//       }

//       #map {
//         position: absolute;
//         top: 0;
//         bottom: 0;
//         width: 100%;
//       }
//     </style>
//     <fieldset>
//       <label>Choose a color</label>
//       <div id="swatches"></div>
//       </fieldset>
//   </head>
//   <body>
//     <div id='map'></div>
//     <script>
//     mapboxgl.accessToken = 'pk.eyJ1IjoiamFtZXNjYXJwaW5vIiwiYSI6ImNrbGxrYnc4djAwM3Myd21mNjFhbnlrbnEifQ.zVxpx9kfI2CxiOr7JbCllQ'; // replace this with your access token
//     var map = new mapboxgl.Map({
//       container: 'map',
//       style: 'mapbox://styles/jamescarpino/ckllk9eyi1uz117pdhqnxz4k3', // at 3d style url
//       center: [ -80.664, 36.301 ],
//       zoom: 6.25,
//       pitch: 49,


//     });
//     map.on('click', function(e) {
//   var features = map.queryRenderedFeatures(e.point, {
//     layers: ['at-shelters-3sjt7j'] // replace this with the name of the layer
//   });

//   if (!features.length) {
//     return;
//   }

//   var feature = features[0];

//   var popup = new mapboxgl.Popup({ offset: [0, -15] })
//     .setLngLat(feature.geometry.coordinates)
//     .setHTML('<h3>' + feature.properties.NAME + '</h3><p>' + 'Year Constructed: ' + feature.properties.YEAR_BUILT + '</p>'+ '<p>' + 'Elevation: ' + feature.properties.Elev_feet + 'ft' + '</p>')
//     .addTo(map);

// });
// var swatches = document.getElementById('swatches');
// var shelter_layer = document.getElementById('at-shelters-3sjt7j');
// var colors = [
// '#ffffcc',
// '#a1dab4',
// '#41b6c4',
// '#2c7fb8',
// '#253494',
// '#fed976',
// '#feb24c',
// '#fd8d3c',
// '#f03b20',
// '#bd0026'
// ];




// map.on('click','at-shelters-3sjt7j', function(e) {
//   map.flyTo({
//     center: e.lngLat,
//     zoom: 10
//   })
// })
//     </script>
//   </body>
// </html>