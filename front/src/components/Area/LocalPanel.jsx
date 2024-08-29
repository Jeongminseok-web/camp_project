import React, { useState, useEffect } from 'react';
import Modal from '../items/Modal';
import { CiSquarePlus } from 'react-icons/ci';
import { FaRegHeart } from 'react-icons/fa';

const LocalPanel = ({ selectedRegion }) => {
  const [campingData, setCampingData] = useState([]);
  const [showModal, setShowModal] = useState(false); // 모달 창 상태
  const [modalContent, setModalContent] = useState(null); // 모달에 표시할 내용

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

  const openModal = (item) => {
    setModalContent(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalContent(null);
  };

  return (
    <div className="camping-grid">
      {filteredCampingData.length > 0 ? (
        <div className="grid grid-cols-3 gap-2 m-3">
          {filteredCampingData.map((camping, index) => (
            <div
              key={index}
              className="bg-white border border-gray-300 rounded-md p-4"
            >
              <h3 className="text-lg font-bold mb-2 flex justify-between">
                {camping.facltNm}
                <button onClick={() => openModal(camping)} className="ml-4">
                  <CiSquarePlus />
                </button>
              </h3>
              <img src={camping.firstImageUrl} className="w-full h-auto" />
              <p className="mt-2">주소: {camping.addr1}</p>
              <p className="mt-2">전화번호: {camping.tel}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>캠핑장의 위치를 보고싶은 지역을 선택해 주세요.</p>
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

export default LocalPanel;
