import React from 'react';
import { CiSquarePlus } from 'react-icons/ci';

const ThemeItem = ({ item, openModal }) => {
  const defaultImage = process.env.PUBLIC_URL + '/campimg.png';
  return (
    <div className="border border-gray-300 rounded-md p-4">
      <h3 className="text-lg font-bold mb-2 flex justify-between">
        {item.facltNm}
        <button onClick={() => openModal(item)} className="ml-4 text-cyan-600">
          <CiSquarePlus />
        </button>
      </h3>
      <div className="flex">
        <img
          src={item.firstImageUrl ? item.firstImageUrl : defaultImage}
          className="w-[40%] h-[50%] mt-2 mb-2 mr-2 border-none rounded-lg"
          alt={item.facltNm}
        />
        <div className="mt-2">
          <p className="mb-2">주소: {item.addr1}</p>
          <p className="mb-2">전화번호: {item.tel ? item.tel : '정보 없음'}</p>
          <p className="inline-block bg-cyan-200">#{item.themaEnvrnCl}</p>
        </div>
      </div>
    </div>
  );
};

export default ThemeItem;
