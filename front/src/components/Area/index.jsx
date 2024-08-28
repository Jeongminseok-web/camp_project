import React, { useState } from 'react';
import Navbar from '../Navbar';
import LocalNav from './LocalNav';
import MapPenel from '../MapPenel';

const Index = () => {
  const [center, setCenter] = useState({ lat: 37.5665, lng: 126.978 });
  const [zoom, setZoom] = useState(10);

  const handleRegionChange = (lat, lng) => {
    setCenter({ lat, lng });
    setZoom(13);
  };
  return (
    <div className="page-section">
      <Navbar />
      <div className="w-[80%] h-full felx flex-col pl-2">
        <div className="pb-2">
          <LocalNav onRegionChange={handleRegionChange} />
        </div>
        <div className="w-full h-full">
          <div className="h-full w-[40%]">
            <MapPenel center={center} zoom={zoom} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
