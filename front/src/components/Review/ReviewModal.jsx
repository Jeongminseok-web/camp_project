import React from "react";
import { useSelector } from "react-redux";

const ReviewModal = () => {
  const { modalItemType } = useSelector((state) => state.modalItem);
  return <div></div>;
};

export default ReviewModal;
