import React, { useState, useEffect } from 'react';

const ThemePanel = ({ selectedTheme }) => {
  const [themeData, setThemeData] = useState([]);

  useEffect(() => {
    const fetchThemeData = async () => {
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
          const items = data.response.body.items.item;

          // themaEnvrnCl 값과 selectedTheme.label이 일치하는 데이터 필터링
          const filteredData = items.filter(
            (item) => item.themaEnvrnCl === selectedTheme.label
          );

          setThemeData(filteredData);
        } else {
          console.error('API 응답 구조가 예상과 다릅니다.');
        }
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      }
    };

    if (selectedTheme) {
      fetchThemeData();
    }
  }, [selectedTheme]);

  return (
    <div className="theme-panel mt-4">
      {themeData.length > 0 ? (
        <div className="grid grid-cols-3 gap-4">
          {themeData.map((item, index) => (
            <div key={index} className="border border-gray-300 rounded-md p-4">
              <h3 className="text-lg font-bold">{item.facltNm}</h3>
              <img src={item.firstImageUrl} className="w-full h-auto" />
              <p>{item.addr1}</p>
              <p>{item.tel}</p>
              {/* <p>{item.intro}</p> */}
            </div>
          ))}
        </div>
      ) : (
        <p>로딩중..</p>
      )}
    </div>
  );
};

export default ThemePanel;
