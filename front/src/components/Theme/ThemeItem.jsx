import React from 'react';
import { CiSquarePlus } from 'react-icons/ci';

const ThemeItem = ({ item, openModal }) => {
  return (
    <div className="border border-gray-300 rounded-md p-4">
      <h3 className="text-lg font-bold mb-2 flex justify-between">
        {item.facltNm}
        <button onClick={() => openModal(item)} className="ml-4">
          <CiSquarePlus />
        </button>
      </h3>
      <div className="flex justify-between">
        <img
          src={item.firstImageUrl}
          className="w-[40%] h-[50%] mt-2 mb-2 mr-2"
          alt={item.facltNm}
        />
        <div>
          <p className="mb-2">주소: {item.addr1}</p>
          <p className="mb-2">전화번호: {item.tel ? item.tel : '정보 없음'}</p>
          <p>#{item.themaEnvrnCl}</p>
        </div>
      </div>
    </div>
  );
};

export default ThemeItem;
