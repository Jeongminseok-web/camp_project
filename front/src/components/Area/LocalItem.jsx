// LocalItem.jsx
import React from 'react';
import { CiSquarePlus } from 'react-icons/ci';

const LocalItem = ({ camping, openModal }) => {
  return (
    <div className="bg-white border border-gray-300 rounded-md p-4">
      <h3 className="text-lg font-bold mb-2 flex justify-between">
        {camping.facltNm}
        <button onClick={() => openModal(camping)} className="ml-4">
          <CiSquarePlus />
        </button>
      </h3>
      <img
        src={camping.firstImageUrl}
        className="w-full h-auto"
        alt={camping.facltNm}
      />
      <p className="mt-2">주소: {camping.addr1}</p>
      <p className="mt-2">전화번호: {camping.tel}</p>
    </div>
  );
};

export default LocalItem;
