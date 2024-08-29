import React, { useState } from 'react';
import Navbar from '../Navbar';
import LocalNav from './LocalNav';
import MapPenel from '../MapPenel';
import LocalPanel from './LocalPanel';

const Index = () => {
  const [center, setCenter] = useState({ lat: 37.5665, lng: 126.978 });
  const [zoom, setZoom] = useState(10);
  const [selectedRegion, setSelectedRegion] = useState({
    lat: 37.5665,
    lng: 126.978,
    doNm: '',
    시군구명: '', // 시군구명 필드 추가
  });

  const handleRegionChange = (lat, lng, doNm, sigunguNm) => {
    setCenter({ lat, lng });
    setZoom(13);
    setSelectedRegion({
      lat,
      lng,
      doNm,
      시군구명: sigunguNm, // 선택된 시군구명을 설정
    });
  };

  return (
    <div className="w-[100%] h-[98vh] m-auto flex">
      <Navbar />
      <div className="w-[80%] h-full flex flex-col pl-2">
        <div className="pb-2">
          <LocalNav onRegionChange={handleRegionChange} />
        </div>
        <div className="w-full h-full flex">
          <div className="h-full w-[40%]">
            <MapPenel center={center} zoom={zoom} />
          </div>
          <div className="w-[50%] p-4">
            <LocalPanel selectedRegion={selectedRegion} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
