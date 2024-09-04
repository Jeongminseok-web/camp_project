import React, { useState } from 'react';
import { IoMdCloseCircle } from 'react-icons/io';

const ReviewItem = ({ task }) => {
  const { image, title, description, date, grade } = task;
  const [isReviewOpen, setisReviewOpen] = useState(false);

  const defaultImage = process.env.PUBLIC_URL + '/campimg.png';

  // 모달 열기/닫기 함수
  const openReview = () => setisReviewOpen(true);
  const closeReview = () => setisReviewOpen(false);

  return (
    <>
      {/* 이미지 버튼 */}
      <div
        className="review-panel relative mt-2 w-[18%] h-[40vh] hover:text-slate-500 border-none rounded-sm overflow-hidden cursor-pointer"
        onClick={openReview}
      >
        {/* 이미지 */}
        <img
          src={image || defaultImage}
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = defaultImage; // 이미지 로드 오류 시 기본 이미지로 변경
          }}
        />

        {/* Hover 시 보여줄 오버레이 */}
        <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 hover:opacity-100 flex justify-center items-center text-white transition-opacity duration-300">
          <div className="text-center">
            <h3 className="text-lg font-bold mb-2">{title}</h3>
            <p>⭐ {grade}/5</p>
          </div>
        </div>
      </div>

      {/* 모달 */}
      {isReviewOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative bg-white p-6 rounded-lg w-auto max-w-[90vw] max-h-[90vh] overflow-y-auto">
            {/* 닫기 버튼 */}
            <button
              onClick={closeReview}
              className="absolute top-2 right-2 text-2xl"
            >
              <IoMdCloseCircle />
            </button>

            {/* 모달 내용 */}
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <p className="mb-2">⭐ {grade}/5</p>
            <p className="mb-2">방문한 날짜: {date}</p>
            <p className="mb-4">후기: {description}</p>

            {image && (
              <div className="mb-4 flex justify-center">
                <img
                  src={image || defaultImage}
                  alt={title}
                  className="w-auto h-auto object-contain rounded-lg"
                  onError={(e) => {
                    e.target.src = defaultImage; // 이미지 로드 오류 시 기본 이미지로 변경
                  }}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewItem;
