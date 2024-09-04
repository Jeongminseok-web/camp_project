import React, { useState } from 'react';
import ReviewPanel from './ReviewPanel';
import ReviewModal from './ReviewModal'; // 리뷰 작성 모달 컴포넌트
import Navbar from '../Navbar';

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]); // 리뷰 목록을 관리

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const addReview = (newReview) => {
    setReviews([...reviews, newReview]);
    closeModal();
  };

  return (
    <div className="w-[100%] h-[98vh] m-auto flex">
      <Navbar />
      <div className="w-[100%] h-full p-2 overflow-auto">
        <ReviewPanel reviews={reviews} />
        <button
          onClick={openModal}
          className="fixed bottom-10 right-10 bg-cyan-500 text-white text-2xl rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
        >
          +
        </button>
      </div>
      {isModalOpen && (
        <ReviewModal closeModal={closeModal} addReview={addReview} />
      )}
    </div>
  );
};

export default Index;
