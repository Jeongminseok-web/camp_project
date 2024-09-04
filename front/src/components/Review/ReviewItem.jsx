import React, { useState } from "react";

const ReviewItem = ({ reviews }) => {
  const [isReviewOpen, setisReviewOpen] = useState(false);
  const openReview = () => setisReviewOpen(true);
  const closeReview = () => setisReviewOpen(false);

  return (
    <div className="review-panel w-full h-auto flex flex-wrap gap-x-4 justify-normal">
      {reviews.length === 0 ? (
        <p className="mt-12">아직 작성된 리뷰가 없습니다.</p>
      ) : (
        reviews.map((review, index) => (
          <div
            key={index}
            className="w-[18%] h-full rounded mt-12"
            onClick={openReview}
          >
            {review.image && (
              <div className="">
                <img
                  src={review.image}
                  alt="리뷰 이미지"
                  className="w-full h-[400px] rounded"
                />
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewItem;
