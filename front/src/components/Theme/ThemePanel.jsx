import React, { useState, useEffect } from 'react';
import Modal from '../items/Modal';
import { CiSquarePlus } from 'react-icons/ci';

const ThemePanel = ({ selectedTheme }) => {
  const [themeData, setThemeData] = useState([]);
  const [showModal, setShowModal] = useState(false); // 모달 창 상태
  const [modalContent, setModalContent] = useState(null); // 모달에 표시할 내용

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
            (item) =>
              item.themaEnvrnCl &&
              item.themaEnvrnCl.includes(selectedTheme.label)
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

  const openModal = (item) => {
    setModalContent(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalContent(null);
  };

  return (
    <div className="theme-panel m-2">
      {themeData.length > 0 ? (
        <div className="grid grid-cols-3 gap-2">
          {themeData.map((item, index) => (
            <div key={index} className="border border-gray-300 rounded-md p-4">
              <h3 className="text-lg font-bold mb-2 flex justify-between">
                {item.facltNm}
                <button onClick={() => openModal(item)} className="ml-4">
                  <CiSquarePlus />
                </button>
              </h3>
              <img src={item.firstImageUrl} className="w-full h-auto mb-2" />
              <p className="mb-2">주소: {item.addr1}</p>
              <p className="mb-2">
                전화번호: {item.tel ? item.tel : '정보 없음'}
              </p>
              <p>#{item.themaEnvrnCl}</p>
              {/* <p>{item.intro}</p> */}
            </div>
          ))}
        </div>
      ) : (
        <p>로딩중..</p>
      )}

      {modalContent && (
        <Modal
          showModal={showModal}
          closeModal={closeModal}
          title={modalContent.facltNm}
        >
          <p className="mb-5">주소: {modalContent.addr1}</p>

          <p className="mb-5">
            전화번호: {modalContent.tel ? modalContent.tel : '정보 없음'}
          </p>

          <p className="mb-5">부대 시설: {modalContent.sbrsCl}</p>
          <p className="mb-5">주변 시설: {modalContent.posblFcltyCl}</p>
          <p>{modalContent.intro}</p>

          <p className="mt-10">
            홈페이지:{' '}
            {modalContent.resveUrl ? (
              <a
                href={modalContent.resveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline break-all"
              >
                {modalContent.resveUrl}
              </a>
            ) : (
              '정보 없음'
            )}
          </p>
        </Modal>
      )}
    </div>
  );
};

export default ThemePanel;
