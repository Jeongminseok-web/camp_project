import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import ModalItem from '../items/ModalItem';
import { useDispatch, useSelector } from 'react-redux';
import { closeModalItem } from '../../redux/slices/ModalItemSlice';
import KakaoMap from '../KakaoMap';

const Index = () => {
  // const [data, setData] = useState(null);

  // // 컴포넌트가 마운트될 때 실행되는 부분
  // useEffect(() => {
  //   fetchData(); // 데이터 가져오는 함수 호출
  // }, []);

  // const fetchData = () => {
  //   fetch(
  //     "https://apis.data.go.kr/B551011/GoCamping/basedList?numOfRows=4000&MobileOS=ETC&MobileApp=camp&serviceKey=jspS2aezFN%2BfwauFvRfn13nPPHKDJBYHfQ8UVy%2F9b1eGfiK86%2F0f3580%2BkQiP2hvdJ2mvljcvT0m1RZ5cqeoTg%3D%3D&_type=json"
  //   )
  //     .then((response) => response.json())
  //     .then((data) => setData(data.response.body.items.item)) // 데이터를 가져와서 상태 업데이트
  //     .catch((error) => console.error("Error fetching data:", error));
  // };
  // console.log(data);
  const [isModalItemOpen, setIsModalItemOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(null);

  const handleRegionClick = (regionName) => {
    console.log('Region name in handleRegionClick:', regionName);
    setSelectedRegion(regionName);
    setIsModalItemOpen(true);
  };

  const handleCloseModalItem = () => {
    setIsModalItemOpen(false);
    setSelectedRegion(null);
  };

  return (
    <div className="w-[100%] h-[98vh] m-auto flex">
      <Navbar />
      <div className="w-[80%] h-full flex flex-col justify-center items-center">
        <h2 className="text-3xl mb-5">원하시는 지역을 선택해 주세요</h2>
        {/* <Map /> */}
        <KakaoMap onRegionClick={handleRegionClick} />
      </div>
      {isModalItemOpen && (
        <ModalItem
          onClose={handleCloseModalItem}
          selectedRegion={selectedRegion}
        />
      )}
      {/* <ModalItem /> */}
    </div>
  );
};

export default Index;
