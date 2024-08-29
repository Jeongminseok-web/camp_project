import React, { useState, useEffect } from 'react';

import { FaCrown } from 'react-icons/fa6';

const HotPanel = () => {
  const [hotData, setHotData] = useState([]);
  const [error, setError] = useState(null);

  // contentId 순서대로 정렬하고자 하는 contentId 목록
  const contentIdOrder = [
    1776, 6975, 2703, 2422, 8014, 6808, 2999, 2217, 2672, 7767, 6959, 3139,
    1601, 3394, 7079, 7589, 306, 7315, 2439, 3320,
  ];

  useEffect(() => {
    const fetchHotData = async () => {
      const url = `http://apis.data.go.kr/B551011/GoCamping/basedList?numOfRows=4000&MobileOS=ETC&MobileApp=camp&serviceKey=jspS2aezFN%2BfwauFvRfn13nPPHKDJBYHfQ8UVy%2F9b1eGfiK86%2F0f3580%2BkQiP2hvdJ2mvljcvT0m1RZ5cqeoTg%3D%3D&_type=json`;
      try {
        const response = await fetch(url);
        const data = await response.json();

        // API 응답 구조 확인
        console.log('API 응답 데이터:', data);

        if (
          data.response &&
          data.response.body &&
          data.response.body.items &&
          data.response.body.items.item
        ) {
          const items = data.response.body.items.item;

          // contentIdOrder에 맞춰 데이터 필터링 및 정렬
          const filteredAndSortedData = contentIdOrder
            .map((contentId) =>
              items.find((item) => parseInt(item.contentId) === contentId)
            )
            .filter(Boolean); // 유효한 데이터만 필터링

          console.log('필터링 및 정렬된 데이터:', filteredAndSortedData);

          setHotData(filteredAndSortedData);
        } else {
          console.error('API 응답 구조가 예상과 다릅니다.');
          setError('API 응답 구조가 예상과 다릅니다.');
        }
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
        setError('데이터를 가져오는 중 오류 발생');
      }
    };

    fetchHotData();
  }, []);

  return (
    <div className="hot-panel mt-2 ml-4">
      <FaCrown />
      {error ? (
        <p>{error}</p>
      ) : hotData.length > 0 ? (
        <div className="grid grid-rows-7 grid-cols-3 gap-4">
          {hotData.map((item, index) => (
            <div
              key={item.contentId}
              className="border border-gray-300 rounded-md p-4"
            >
              <h3 className="text-lg font-bold">
                {index + 1}위: {item.facltNm}
              </h3>
              <p>{item.addr1}</p>
              <p>{item.tel}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>로딩중...</p>
      )}
    </div>
  );
};

export default HotPanel;
