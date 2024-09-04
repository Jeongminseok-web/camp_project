import React, { useState } from 'react';

const ReviewModal = ({ closeModal, addReview }) => {
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState(0);
  const [date, setDate] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // 이미지 미리보기
    }
  };

  const handleSubmit = () => {
    if (title && rating) {
      addReview({ title, rating, date, content, image }); // 이미지 추가
      closeModal();
    } else {
      alert('제목과 별점은 필수 항목입니다.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">리뷰 작성</h2>

        <label className="block mb-2">
          방문한 캠핑장 이름 (필수):
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded mt-1"
          />
        </label>

        <label className="block mb-2">
          별점 (필수):
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                style={{
                  cursor: 'pointer',
                  color: star <= rating ? 'gold' : 'gray',
                }}
                className="text-2xl"
              >
                ★
              </span>
            ))}
          </div>
        </label>

        <label className="block mb-2">
          날짜:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border rounded mt-1"
          />
        </label>

        <label className="block mb-4">
          후기:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded mt-1"
            rows="4"
          />
        </label>

        <label className="block mb-4">
          사진 추가:
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded mt-1"
          />
          {image && (
            <div className="mt-4">
              <img
                src={image}
                alt="미리보기"
                className="w-full h-auto rounded"
              />
            </div>
          )}
        </label>

        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-cyan-500 text-white px-4 py-2 rounded mr-2"
          >
            리뷰 등록
          </button>
          <button
            onClick={closeModal}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
