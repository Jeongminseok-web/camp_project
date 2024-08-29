import React, { useState, useEffect } from 'react';

import { FaCrown } from 'react-icons/fa6';
import { CiSquarePlus } from 'react-icons/ci';
import Modal from '../items/Modal';

const HotPanel = () => {
  const [hotData, setHotData] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // 모달 창 상태
  const [modalContent, setModalContent] = useState(null); // 모달에 표시할 내용

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

  const openModal = (item) => {
    setModalContent(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalContent(null);
  };

  return (
    <div className="hot-panel mt-2 ml-4 mr-4">
      <FaCrown />
      {error ? (
        <p>{error}</p>
      ) : hotData.length > 0 ? (
        <div className="w-full grid grid-cols-3 gap-2">
          {hotData.map((item, index) => (
            <div
              key={item.contentId}
              className="border border-gray-300 rounded-md p-4"
            >
              <h3 className="text-lg font-bold flex justify-between">
                {index + 1}위: {item.facltNm}
                <button onClick={() => openModal(item)} className="ml-4">
                  <CiSquarePlus />
                </button>
              </h3>
              <div className="flex items-center">
                <img
                  src={item.firstImageUrl}
                  className="w-[20%] h[10%] mt-5"
                ></img>
                <div className="ml-5">
                  <p>주소: {item.addr1}</p>
                  <p>전화번호: {item.tel}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>로딩중...</p>
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

          <p className="mb-5">
            부대 시설: {modalContent.sbrsCl ? modalContent.sbrsCl : '정보 없음'}
          </p>
          <p className="mb-5">
            주변 시설:{' '}
            {modalContent.posblFcltyCl
              ? modalContent.posblFcltyCl
              : '정보 없음'}
          </p>
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

export default HotPanel;
