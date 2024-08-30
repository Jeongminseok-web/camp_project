// HotItem.jsx
import React from 'react';
import { CiSquarePlus } from 'react-icons/ci';

const HotItem = ({ item, index, indexOfFirstItem, openModal }) => {
  return (
    <div className="border rounded-md shadow-md p-3 mt-3">
      <h3 className="text-lg font-bold flex justify-between">
        {indexOfFirstItem + index + 1}위 {item.facltNm}
        <button onClick={() => openModal(item)} className="ml-4">
          <CiSquarePlus />
        </button>
      </h3>
      <div className="flex items-center">
        <img
          src={item.firstImageUrl}
          className="w-[10%] h[10%] mt-3"
          alt={item.facltNm}
        />
        <div className="ml-5 mt-3">
          <p>주소: {item.addr1}</p>
          <p>전화번호: {item.tel}</p>
        </div>
      </div>
    </div>
  );
};

export default HotItem;
