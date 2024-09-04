import React, { useEffect, useState } from "react";
import ReviewItem from "./ReviewItem";
import ReviewModal from "./ReviewModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetTasksData } from "../../redux/slices/apiSlice";

const ReviewPanel = () => {
  const task = useSelector((state) => state.api.getTasksData);
  console.log(task);
  const authData = useSelector((state) => state.auth.authData);
  // console.log(authData);
  const dispatch = useDispatch();
  const userKey = useSelector((state) => authData?.sub);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]); // 리뷰 목록을 관리
  const [localTasks, setLocalTasks] = useState([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const addReview = (newReview) => {
    setReviews([...reviews, newReview]);
    closeModal();
  };

  useEffect(() => {
    if (userKey) {
      dispatch(fetchGetTasksData(userKey)).then((result) => {
        setLocalTasks(result.payload); // 이미 서버에서 정렬된 데이터를 받음
      });
      // 컴포넌트가 마운트될 때 캠핑장 데이터를 가져옵니다.
    }
  }, [dispatch, userKey]);

  return (
    <div className="w-full h-full">
      <div className="w-full h-full pt-10 flex flex-wrap gap-x-4">
        {localTasks.map((task) => (
          <ReviewItem key={task.id} reviews={reviews} task={task} />
        ))}
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
