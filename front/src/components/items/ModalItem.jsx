import React, { useEffect, useState } from "react";
import { IoIosArrowDropleft } from "react-icons/io";
import { IoIosArrowDropright } from "react-icons/io";

const ModalItem = ({ selectedRegion, onClose }) => {
  const [data, setData] = useState([]);
  // const [selectedRegion, setSelectedRegion] = useState("강원");
  const [selectedCampings, setSelectedCampings] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 데이터 가져오는 함수
  const fetchData = () => {
    fetch(
      "http://apis.data.go.kr/B551011/GoCamping/basedList?numOfRows=4000&MobileOS=ETC&MobileApp=camp&serviceKey=jspS2aezFN%2BfwauFvRfn13nPPHKDJBYHfQ8UVy%2F9b1eGfiK86%2F0f3580%2BkQiP2hvdJ2mvljcvT0m1RZ5cqeoTg%3D%3D&_type=json"
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data.response.body.items.item);
        console.log("Full API response:", data);
        // console.log("Fetched Data", data.response.body.items.item);
      }) // 데이터를 가져와서 상태 업데이트
      .catch((error) => console.error("Error fetching data:", error));
  };

  // 컴포넌트가 마운트될 때 실행되는 부분
  useEffect(() => {
    fetchData(); // 데이터 가져오는 함수 호출
  }, []);

  // console.log(data);
  // const filteredData = data.filter(
  //   (item) => item.addr1 && item.addr1.includes(selectedRegion)
  // );
  // console.log(filteredData);
  useEffect(() => {
    if (data.length > 0 && selectedRegion) {
      const filteredData = data.filter(
        (item) => item.addr1 && item.addr1.includes(selectedRegion)
      );
      // console.log(filteredData);
      if (filteredData.length > 0) {
        const randomIndices = [];
        while (
          randomIndices.length < 5 &&
          randomIndices.length < filteredData.length
        ) {
          const randomIndex = Math.floor(Math.random() * filteredData.length);
          if (!randomIndices.includes(randomIndex)) {
            randomIndices.push(randomIndex);
          }
        }
        const campings = randomIndices.map((index) => filteredData[index]);
        setSelectedCampings(campings);
        setCurrentIndex(0);
      } else {
        setSelectedCampings([]);
        setCurrentIndex(0);
      }
    }
  }, [data, selectedRegion]);

  // console.log(selectedRegion);
  // console.log("Selected Campings:", selectedCampings);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? selectedCampings.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === selectedCampings.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentCamping = selectedCampings[currentIndex];

  return (
    <div
      // onClick={onClose}
      className="fixed w-full h-full left-0 top-0 bg-black bg-opacity-50 z-50"
    >
      <div className="w-full h-full flex justify-center items-center">
        <button onClick={handlePrevious}>
          <IoIosArrowDropleft className="text-6xl text-white" />
        </button>
        <div className="border border-neutral-600 bg-slate-300 w-1/2 h-[70vh] overflow-auto p-2">
          <div>
            {currentCamping ? (
              <div className="p-2">
                <div className="flex pb-2 mb-2 justify-between border-b border-neutral-400">
                  {currentCamping.firstImageUrl ? (
                    <img
                      src={currentCamping.firstImageUrl}
                      alt={currentCamping.facltNm}
                      className="w-1/2 h-auto"
                    />
                  ) : (
                    <img src="/camping.jpeg" alt="" className="w-1/2 h-auto" />
                  )}
                  <button
                    onClick={onClose}
                    className="p-2 bg-red-500 text-white w-20 h-10"
                  >
                    닫기
                  </button>
                </div>
                <h2 className="text-3xl my-3">{currentCamping.facltNm}</h2>
                <div className="flex flex-col gap-y-5">
                  {currentCamping.addr1 ? (
                    <p className="">오시는길 : {currentCamping.addr1}</p>
                  ) : (
                    ""
                  )}
                  {currentCamping.tel ? (
                    <p>전화번호 : {currentCamping.tel}</p>
                  ) : (
                    ""
                  )}
                  {currentCamping.sbrsCl ? (
                    <p>편의 시설 : {currentCamping.sbrsCl}</p>
                  ) : (
                    ""
                  )}
                  {currentCamping.featureNm ? (
                    <p>캠핑장 특징 : {currentCamping.featureNm}</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ) : (
              <p>캠핑장 로딩중입니다.</p>
            )}
          </div>
        </div>
        <button onClick={handleNext}>
          <IoIosArrowDropright className="text-6xl text-white" />
        </button>
      </div>
    </div>
  );
};

export default ModalItem;
