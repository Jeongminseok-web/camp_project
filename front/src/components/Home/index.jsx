import React, { useState } from "react";
import Navbar from "../Navbar";
import Map from "../Map";
import ModalItem from "../items/ModalItem";
import { useDispatch, useSelector } from "react-redux";
import { closeModalItem } from "../../redux/slices/ModalItemSlice";
import KakaoMap from "../KakaoMap";

const Index = ({ onRegionClick }) => {
  const [isModalItemOpen, setIsModalItemOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(null);

  const handleRegionClick = (regionName) => {
    setSelectedRegion(regionName);
    setIsModalItemOpen(true);
  };

  const handleCloseModalItem = () => {
    setIsModalItemOpen(false);
    setSelectedRegion(null);
  };

  return (
    <div className="page-section">
      <Navbar />
      <div className="w-[80%] h-full flex flex-col justify-center items-center">
        <h2 className="text-3xl mb-5">원하시는 지역을 선택해 주세요</h2>
        {/* <Map /> */}
        <KakaoMap onRegionClick={handleRegionClick} />
      </div>
      {isModalItemOpen && (
        <ModalItem onClose={handleCloseModalItem} region={selectedRegion} />
      )}
      {/* <ModalItem /> */}
    </div>
  );
};

export default Index;
