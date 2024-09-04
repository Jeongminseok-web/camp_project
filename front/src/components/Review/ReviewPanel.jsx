import React, { useState } from "react";
import ReviewItem from "./ReviewItem";
import ReviewModal from "./ReviewModal";

const ReviewPanel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]); // 리뷰 목록을 관리

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const addReview = (newReview) => {
    setReviews([...reviews, newReview]);
    closeModal();
  };

  return (
    <div className="w-full h-full">
      <div className="w-full h-full">
        <ReviewItem reviews={reviews} />
      </div>
      <div>
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

export default ReviewPanel;
