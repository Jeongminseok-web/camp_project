<<<<<<< HEAD
import React from 'react';

const ReviewPanel = ({ reviews }) => {
  return (
    <div className="review-panel">
      {reviews.length === 0 ? (
        <p className="mt-12">아직 작성된 리뷰가 없습니다.</p>
      ) : (
        reviews.map((review, index) => (
          <div key={index} className="p-4 border rounded mb-4">
            <h3 className="text-xl font-bold">{review.title}</h3>
            <p>별점: {'★'.repeat(review.rating)}</p>
            <p>날짜: {review.date}</p>
            <p>{review.content}</p>
          </div>
        ))
      )}
=======
import React from "react";
import ReviewModal from "./ReviewModal";

const ReviewPanel = () => {
  return (
    <div>
      <ReviewModal />
>>>>>>> dbdb4e212f8cc31053d66345e24ce15942ec346e
    </div>
  );
};

export default ReviewPanel;
