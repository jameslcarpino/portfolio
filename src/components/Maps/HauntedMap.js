import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

mapboxgl.accessToken =
  "pk.eyJ1IjoiamFtZXNjYXJwaW5vIiwiYSI6ImNrbGhqdDN5YjExaXQycGxkYmZycW45MjAifQ.-DW0dNm97Pwn1XUlEKjWBA";

export default function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-105.211);
  const [lat, setLat] = useState(35.788);
  const [zoom, setZoom] = useState(1.48);
  // At low zooms, complete a revolution every two minutes.

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/jamescarpino/cl9n4uxrw000g14o7l65d21sm",
      center: [lng, lat],
      zoom: zoom,
    });
    
  
    const secondsPerRevolution = 120;
    // Above zoom level 5, do not rotate.
    const maxSpinZoom = 2;
    // Rotate at intermediate speeds between zoom levels 3 and 5.
    const slowSpinZoom = 3;

    let userInteracting = false;
    let spinEnabled = true;
    
      function spinGlobe() {
        const zoom = map.current.getZoom();
        if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
          let distancePerSecond = 360 / secondsPerRevolution;
          if (zoom > slowSpinZoom) {
            // Slow spinning at higher zooms
            const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
            distancePerSecond *= zoomDif;
          }
          const center = map.current.getCenter();
          center.lng -= distancePerSecond;
          // Smoothly animate the map over one second.
          // When this animation is complete, it calls a 'moveend' event.
          map.current.easeTo({ center, duration: 1000, easing: (n) => n });
        }
        
      }
    spinGlobe()
  
      // Pause spinning on interaction
      map.current.on("mousedown", () => {
        userInteracting = true;
      });

      // Restart spinning the globe when interaction is complete
      map.current.on("mouseup", () => {
        userInteracting = false;
        //spinGlobe();
      });

      // These events account for cases where the mouse has moved
      // off the map, so 'mouseup' will not be fired.
      map.current.on("dragend", () => {
        userInteracting = false;
        spinGlobe();
      });
      map.current.on("pitchend", () => {
        userInteracting = false;
        spinGlobe();
      });
      map.current.on("rotateend", () => {
        userInteracting = false;
        spinGlobe();
      });

      // When animation is complete, start spinning if there is no ongoing interaction
      map.current.on("moveend", () => {
        spinGlobe();
      });
    
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.addControl(
      new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: map.current,
      marker: false
      })
      );
    map.current.addControl(
      new mapboxgl.GeolocateControl({
      positionOptions: {
      enableHighAccuracy: true
      },
      // When active the map will receive updates to the device's location as it changes.
      trackUserLocation: true,
      // Draw an arrow next to the location dot to indicate which direction the device is heading.
      showAccuracyCircle: false,
      showUserLocation: false,
      fitBoundsOptions: {maxZoom:12}
      })
    )

     map.current.on('click', 'haunted-places', (e)=>{
        map.current.getCanvas().style.cursor = 'pointer';
        console.log("e", e.features)
        //console.log(map.current.queryRenderedFeatures())
            // Copy coordinates array.
            //const coordinates = e.features[0].geometry.location.slice();
            const coords = e.lngLat
            const city = e.features[0].properties.city
            //const description = e.features[0].properties.description;
             
            // // Ensure that if the map is zoomed out such that multiple
            // // copies of the feature are visible, the popup appears
            // // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coords[0]) > 180) {
            coords[0] += e.lngLat.lng > coords[0] ? 360 : -360;
            }
             
            new mapboxgl.Popup({
                closeButton: false
            })
            .setLngLat(coords)
            .setHTML(city)
            .addTo(map.current);
            });
        
// map.current.on('click', (e)=>{
// console.log(e)
})


  
  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
