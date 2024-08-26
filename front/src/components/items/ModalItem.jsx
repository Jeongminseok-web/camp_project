import React from "react";

const ModalItem = ({ onClose }) => {
  //   if (!region) return null;

  return (
    <div
      onClick={onClose}
      className="fixed w-full h-full left-0 top-0 bg-black bg-opacity-50 z-50"
    >
      <div className="fixed w-full h-full left-[25%] top-20">
        <div
          className="border border-neutral-600 bg-slate-300 w-1/5 h-[20vh]
      "
        >
          <h2>asdasd</h2>
          <p>캠핑장 위치</p>
          <p>주변시설</p>
          <button>자세히 보기</button>
        </div>
      </div>
      <div className="fixed w-full h-full left-[21%] top-[40%] bg-opacity-50">
        <div
          className="border border-neutral-600 bg-slate-300 w-1/4 h-[25vh]
      "
        >
          <h2>캠핑장</h2>
          <p>캠핑장 위치</p>
          <p>주변시설</p>
          <button>자세히 보기</button>
        </div>
      </div>
      <div className="fixed w-full h-full left-[23%] top-[70%] bg-opacity-50">
        <div
          className="border border-neutral-600 bg-slate-300 w-1/5 h-[20vh]
      "
        >
          <h2>캠핑장</h2>
          <p>캠핑장 위치</p>
          <p>주변시설</p>
          <button>자세히 보기</button>
        </div>
      </div>
      <div className="fixed w-full h-full left-[70%] top-[65%] bg-opacity-50">
        <div
          className="border border-neutral-600 bg-slate-300 w-1/5 h-[20vh]
      "
        >
          <h2>캠핑장</h2>
          <p>캠핑장 위치</p>
          <p>주변시설</p>
          <button>자세히 보기</button>
        </div>
      </div>
      <div className="fixed w-full h-full left-[75%] top-[25%] bg-opacity-50">
        <div
          className="border border-neutral-600 bg-slate-300 w-1/5 h-[20vh]
      "
        >
          <h2>캠핑장</h2>
          <p>캠핑장 위치</p>
          <p>주변시설</p>
          <button>자세히 보기</button>
        </div>
      </div>
    </div>
  );
};

export default ModalItem;
