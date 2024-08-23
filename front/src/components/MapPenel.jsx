import React, { useCallback, useEffect } from "react";
import { useRef } from "react";
import { data } from "../database/data";

const MapPenel = () => {
  const mapRef = useRef(null);

  const initMap = useCallback(() => {
    new window.google.maps.Map(mapRef.current, {
      center: { lat: 37.480751517671074, lng: 126.8805175744923 },
      zoom: 10,
    });
  }, [mapRef]);

  useEffect(() => {
    initMap();
  }, [initMap]);

  // const campsData = fetch(data);

  console.log(data);
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
