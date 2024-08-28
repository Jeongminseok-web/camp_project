import React, { useCallback, useEffect, useRef } from 'react';
// import { data } from "../database/data";

const MapPenel = ({ center, zoom }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  const initMap = useCallback(() => {
    mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
      center,
      zoom,
    });
  }, [center, zoom]);

  useEffect(() => {
    if (!mapInstanceRef.current) {
      initMap();
    } else {
      mapInstanceRef.current.setCenter(center);
      mapInstanceRef.current.setZoom(zoom);
    }
  }, [center, zoom, initMap]);

  // const campsData = fetch(data);

  // console.log(data);
  // const campsData = data({});

  // const markerRef = useRef([]);

  // data.forEach(({ CMPSI_SCTIN_NM, CMPSI_LTTD_VAL, CMPSI_LNGTD_VAL }) => {
  //   const campMarker = new window.google.maps.Marker({
  //     position: { CMPSI_LTTD_VAL, CMPSI_LNGTD_VAL },
  //     icon: {
  //       url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
  //       labelOrigin: new window.google.maps.Point(15, 10),
  //     },
  //   });
  //   const infoWindow = new window.google.maps.InfoWindow({
  //     content: `<strong>${CMPSI_SCTIN_NM}</strong> (Camp)`,
  //   });

  //   campMarker.addListener("click", () => {
  //     infoWindow.open(campMarker);
  //   });
  // });

  return <div className="map w-[80%] h-full" ref={mapRef}></div>;
};

export default MapPenel;
