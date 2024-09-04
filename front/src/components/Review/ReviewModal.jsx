import React, { useState } from 'react';
import { useSelector } from 'react-redux'; // useSelector를 Redux에서 가져옴

const ReviewModal = ({ closeModal, addReview }) => {
  const [title, setTitle] = useState('');
  const [grade, setGrade] = useState(0);
  const [date, setDate] = useState('');
  const [description, setDescription] = useState(''); // content -> description으로 변경
  const [image, setImage] = useState(null);

  // Redux에서 googleId를 가져옴 (사용자 로그인 정보)
  const googleId = useSelector((state) => state.auth.authData?.sub);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // 이미지 미리보기
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title && grade && googleId) {
      // googleId가 있는지 체크
      const newReview = {
        title,
        grade: grade || 0,
        date,
        description: description || '', // 기본값으로 빈 문자열 설정
        image,
        userId: googleId, // 구글 ID를 userId로 전송
      };

      console.log('Sending Data:', newReview);

      // API 호출로 백엔드에 데이터 전송
      try {
        const response = await fetch('http://localhost:8000/post_tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newReview),
        });

        const result = await response.json();
        if (response.ok) {
          console.log('Review successfully submitted:', result);
          addReview(newReview); // 리뷰를 로컬 상태에 추가 (옵션)
          closeModal();
        } else {
          console.error('Failed to submit review:', result.error);
        }
      } catch (error) {
        console.error('Error while submitting review:', error);
      }
    } else {
      alert('제목과 별점, 구글 ID는 필수 항목입니다.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-auto">
        <h2 className="text-2xl font-semibold mb-4">리뷰 작성</h2>
        <form onSubmit={handleSubmit}>
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
                  onClick={() => setGrade(star)}
                  style={{
                    cursor: 'pointer',
                    color: star <= grade ? 'gold' : 'gray',
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
              value={description} // content -> description
              onChange={(e) => setDescription(e.target.value)} // content -> description
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
              type="submit"
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
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
