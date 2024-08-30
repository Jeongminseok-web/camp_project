<<<<<<< Updated upstream
// HotPanel.jsx
import React, { useState, useEffect } from 'react';
import { FaCrown } from 'react-icons/fa6';
import Modal from '../items/Modal';
import HotItem from './HotItem';
import { DotLoader } from 'react-spinners';
=======
import React, { useState, useEffect } from "react";

import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { FaCrown } from "react-icons/fa6";
import { CiSquarePlus } from "react-icons/ci";
import Modal from "../items/Modal";
import {
  fetchDeleteItemData,
  fetchGetItemsData,
  fetchPostItemData,
} from "../../redux/slices/apiSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
>>>>>>> Stashed changes

const HotPanel = ({ onRemove }) => {
  const [hotData, setHotData] = useState([]);
  const [error, setError] = useState(null);
<<<<<<< Updated upstream
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const itemsPerPage = 4; // 페이지당 표시할 항목 수
=======
  const [showModal, setShowModal] = useState(false); // 모달 창 상태
  const [modalContent, setModalContent] = useState(null); // 모달에 표시할 내용
  const [isAddMap, setIsAddMap] = useState({});
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.authData);
  const googleId = user?.sub;
>>>>>>> Stashed changes

  const contentIdOrder = [
    1776, 6975, 2703, 2422, 8014, 6808, 2999, 2217, 2672, 7767, 6959, 3139,
    1601, 3394, 7079, 7589, 306, 7315, 2439, 3320,
  ];

  // 컴포넌트가 처음 렌더링될 때 로컬 저장소에서 캠핑장 상태 불러오기
  useEffect(() => {
    const savedIsAddMap = JSON.parse(localStorage.getItem("isAddMap")) || {};
    setIsAddMap(savedIsAddMap);
  }, []);

  useEffect(() => {
    // 로그아웃하거나 googleId가 없을 때 isAddMap 초기화
    if (!googleId) {
      setIsAddMap({});
      localStorage.removeItem("isAddMap");
    } else {
      // googleId가 존재할 때 데이터베이스에서 데이터 가져와서 상태 업데이트
      dispatch(fetchGetItemsData(googleId)).then((result) => {
        const visitedCampgrounds = result.payload;
        const updatedIsAddMap = {};
        hotData.forEach((item) => {
          if (
            visitedCampgrounds.some(
              (campground) => campground.name === item.facltNm
            )
          ) {
            updatedIsAddMap[item.facltNm] = true;
          } else {
            updatedIsAddMap[item.facltNm] = false;
          }
        });
        setIsAddMap(updatedIsAddMap);
        localStorage.setItem("isAddMap", JSON.stringify(updatedIsAddMap));
      });
    }
  }, [dispatch, googleId, hotData]);

  useEffect(() => {
    const fetchHotData = async () => {
      const url = `http://apis.data.go.kr/B551011/GoCamping/basedList?numOfRows=4000&MobileOS=ETC&MobileApp=camp&serviceKey=jspS2aezFN%2BfwauFvRfn13nPPHKDJBYHfQ8UVy%2F9b1eGfiK86%2F0f3580%2BkQiP2hvdJ2mvljcvT0m1RZ5cqeoTg%3D%3D&_type=json`;
      try {
        const response = await fetch(url);
        const data = await response.json();

<<<<<<< Updated upstream
=======
        // API 응답 구조 확인
        // console.log("API 응답 데이터:", data);

>>>>>>> Stashed changes
        if (
          data.response &&
          data.response.body &&
          data.response.body.items &&
          data.response.body.items.item
        ) {
          const items = data.response.body.items.item;

          const filteredAndSortedData = contentIdOrder
            .map((contentId) =>
              items.find((item) => parseInt(item.contentId) === contentId)
            )
<<<<<<< Updated upstream
            .filter(Boolean);

          setHotData(filteredAndSortedData);
        } else {
          setError('API 응답 구조가 예상과 다릅니다.');
        }
      } catch (error) {
        setError('데이터를 가져오는 중 오류 발생');
=======
            .filter(Boolean); // 유효한 데이터만 필터링

          console.log("필터링 및 정렬된 데이터:", filteredAndSortedData);

          setHotData(filteredAndSortedData);
        } else {
          console.error("API 응답 구조가 예상과 다릅니다.");
          setError("API 응답 구조가 예상과 다릅니다.");
        }
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
        setError("데이터를 가져오는 중 오류 발생");
>>>>>>> Stashed changes
      }
    };

    fetchHotData();
  }, []);

  const changeAdd = async (selectedItem) => {
    if (!googleId) {
      toast.error("로그인이 필요한 서비스입니다.");
      return;
    }

    if (!selectedItem) {
      console.error("캠핑장 정보가 없습니다.");
      toast.error("캠핑장 정보가 없습니다.");
      return;
    }
    console.log("currentCamping:", selectedItem.facltNm); // 현재 캠핑장 정보 확인
    console.log("currentCamping.id:", selectedItem.id); // ID 확인

    const isCurrentlyAdded = isAddMap[selectedItem.facltNm];

    if (isCurrentlyAdded) {
      // 채워진 하트 클릭 시 캠핑장 삭제
      const confirm = window.confirm("캠핑장을 삭제하시겠습니까?");
      if (!confirm) return;

      try {
        console.log("캠핑장 삭제 시도");
        await dispatch(fetchDeleteItemData(selectedItem.facltNm)).unwrap();
        // await dispatch(fetchGetItemsData()).unwrap();
        toast.success("캠핑장이 삭제되었습니다.");
        setIsAddMap((prevState) => {
          const updatedState = { ...prevState, [selectedItem.facltNm]: false };
          localStorage.setItem("isAddMap", JSON.stringify(updatedState));
          return updatedState;
        });
      } catch (error) {
        toast.error("캠핑장 삭제에 실패했습니다.");
        console.error(error);
      }
    } else {
      // 빈 하트 클릭 시 캠핑장 추가
      const updateAddData = {
        name: selectedItem.facltNm,
        location: selectedItem.addr1,
        image: selectedItem.firstImageUrl || "No Image",
        isadd: true,
        googleId: user?.sub,
      };

      try {
        console.log("캠핑장 추가 시도");
        console.log(updateAddData);
        await dispatch(fetchPostItemData(updateAddData)).unwrap();
        toast.success("캠핑장을 추가하였습니다.");
        setIsAddMap((prevState) => {
          const updatedState = { ...prevState, [selectedItem.facltNm]: true };
          localStorage.setItem("isAddMap", JSON.stringify(updatedState));
          return updatedState;
        });
      } catch (error) {
        toast.error("캠핑장 추가에 실패했습니다.");
        console.error("Error updating data:", error);
      }
    }
  };

  const openModal = (item) => {
    setModalContent(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalContent(null);
  };

  // 현재 페이지에 해당하는 데이터를 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = hotData.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 번호 배열 생성
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(hotData.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
<<<<<<< Updated upstream
    <div className="hot-panel mt-12 ml-4 mr-4">
      <div className="flex justify-center">
        <FaCrown className="w-5 mt-4 mr-3" />
        <p className="text-lg font-bold mt-3">전국 캠핑장 순위</p>
      </div>

=======
    <div className="hot-panel mt-2 ml-4 mr-4 relative">
      <FaCrown />
>>>>>>> Stashed changes
      {error ? (
        <p>{error}</p>
      ) : hotData.length > 0 ? (
        <div className="gap-2">
          {currentItems.map((item, index) => (
            <HotItem
              key={item.contentId}
<<<<<<< Updated upstream
              item={item}
              index={index}
              indexOfFirstItem={indexOfFirstItem}
              openModal={openModal}
            />
=======
              className="border border-gray-300 rounded-md p-4 relative"
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
              <button
                className="absolute bottom-1 right-1 text-xl"
                onClick={() => changeAdd(item)}
              >
                {isAddMap[item.facltNm] ? <FaHeart /> : <FaRegHeart />}
              </button>
            </div>
>>>>>>> Stashed changes
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center mt-10">
          <DotLoader color="#c9c9c9" loading size={30} />
        </div>
      )}

      {modalContent && (
        <Modal
          showModal={showModal}
          closeModal={closeModal}
          title={modalContent.facltNm}
        >
          <p className="mb-5">주소: {modalContent.addr1}</p>

          <p className="mb-5">
            전화번호: {modalContent.tel ? modalContent.tel : "정보 없음"}
          </p>

          <p className="mb-5">
            부대 시설: {modalContent.sbrsCl ? modalContent.sbrsCl : "정보 없음"}
          </p>
          <p className="mb-5">
            주변 시설:{" "}
            {modalContent.posblFcltyCl
              ? modalContent.posblFcltyCl
              : "정보 없음"}
          </p>
          <p>{modalContent.intro}</p>

          <p className="mt-10">
            홈페이지:{" "}
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
              "정보 없음"
            )}
          </p>
        </Modal>
      )}
      <nav
        aria-label="Page navigation example"
        className="mt-4 flex justify-center"
      >
        <ul className="flex items-center -space-x-px h-10 text-base">
          {pageNumbers.map((number) => (
            <li key={number}>
              <a
                onClick={() => setCurrentPage(number)}
                className={`flex items-center justify-center px-4 h-10 leading-tight border rounded-md ml-2 ${
                  number === currentPage
                    ? 'text-blue-600 border border-blue-300 bg-blue-50'
                    : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
                }`}
                href="#"
              >
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default HotPanel;
