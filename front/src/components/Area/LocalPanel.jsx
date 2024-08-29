import React, { useState, useEffect } from 'react';

const LocalPanel = ({ selectedRegion }) => {
  const [campingData, setCampingData] = useState([]);

  const fetchCampingData = async () => {
    const url = `http://apis.data.go.kr/B551011/GoCamping/basedList?numOfRows=4000&MobileOS=ETC&MobileApp=camp&serviceKey=jspS2aezFN%2BfwauFvRfn13nPPHKDJBYHfQ8UVy%2F9b1eGfiK86%2F0f3580%2BkQiP2hvdJ2mvljcvT0m1RZ5cqeoTg%3D%3D&_type=json`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (
        data.response &&
        data.response.body &&
        data.response.body.items &&
        data.response.body.items.item
      ) {
        setCampingData(data.response.body.items.item);
      } else {
        console.error('API 응답 구조가 예상과 다릅니다.');
      }
    } catch (error) {
      console.error('캠핑장 데이터를 불러오는 중 오류 발생:', error);
    }
  };

  const filteredCampingData = selectedRegion.시군구명
    ? campingData.filter(
        (camping) =>
          camping.doNm === selectedRegion.doNm &&
          camping.sigunguNm === selectedRegion.시군구명
      )
    : [];

  useEffect(() => {
    fetchCampingData();
  }, []);

  useEffect(() => {
    console.log('선택된 지역:', selectedRegion);
    console.log('필터링된 데이터:', filteredCampingData);
  }, [selectedRegion, campingData]);

  return (
    <div className="camping-grid">
      {filteredCampingData.length > 0 ? (
        <div className="grid grid-cols-3 gap-4">
          {filteredCampingData.map((camping, index) => (
            <div
              key={index}
              className="bg-white border border-gray-300 rounded-md p-4"
            >
              <h3 className="text-lg font-bold mb-2">{camping.facltNm}</h3>
              <img src={camping.firstImageUrl} className="w-full h-auto" />
              <p className="mt-2">주소: {camping.addr1}</p>
              <p className="mt-2">전화번호: {camping.tel}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>캠핑장의 위치를 보고싶은 지역을 선택해 주세요.</p>
      )}
    </div>
  );
};

export default LocalPanel;
