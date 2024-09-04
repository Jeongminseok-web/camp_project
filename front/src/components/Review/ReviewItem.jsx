import React, { useState } from "react";

const ReviewItem = ({ reviews, task }) => {
  const { image, title, description, date, grade } = task;
  const [isReviewOpen, setisReviewOpen] = useState(false);
  const openReview = () => setisReviewOpen(true);
  const closeReview = () => setisReviewOpen(false);

  return (
    <div
      className="review-panel mt-2 w-[18%] h-[40vh] hover:text-slate-500"
      onClick={openReview}
    >
      <img src={image} alt="" className="w-full h-full" />
    </div>
  );
};

export default ReviewItem;
