import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import {
  fetchDeleteItemData,
  fetchPostItemData,
} from "../../redux/slices/apiSlice";

const Item = ({ area, onRemove }) => {
  const { id, image, isadd, location, name } = area;
  const [isAdd, setIsAdd] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.authData);

  // useEffect(() => {
  //   if (area) {
  //     setIsAdd(area.isadd || false);
  //   }
  // }, [area]);

  const changeAdd = async () => {
    if (!area) {
      console.error("캠핑장 정보가 없습니다.");
      toast.error("캠핑장 정보가 없습니다.");
      return;
    }
    console.log("currentCamping:", area.name); // 현재 캠핑장 정보 확인
    console.log("currentCamping.id:", area.id); // ID 확인

    if (isAdd) {
      // 채워진 하트 클릭 시 캠핑장 삭제
      const confirm = window.confirm("캠핑장을 삭제하시겠습니까?");
      if (!confirm) return;

      try {
        console.log("캠핑장 삭제 시도");
        await dispatch(fetchDeleteItemData(area.name)).unwrap();
        // await dispatch(fetchGetItemsData()).unwrap();
        toast.success("캠핑장이 삭제되었습니다.");
        setIsAdd(false);

        onRemove(area.name);
      } catch (error) {
        toast.error("캠핑장 삭제에 실패했습니다.");
        console.error(error);
      }
    } else {
      // 빈 하트 클릭 시 캠핑장 추가
      const updateAddData = {
        name: area.name,
        location: area.location,
        image: area.image || "No Image",
        isadd: true,
        googleId: user?.sub,
      };

      try {
        console.log("캠핑장 추가 시도");
        console.log(updateAddData);
        await dispatch(fetchPostItemData(updateAddData)).unwrap();
        toast.success("캠핑장을 추가하였습니다.");
        setIsAdd(true);
      } catch (error) {
        toast.error("캠핑장 추가에 실패했습니다.");
        console.error("Error updating data:", error);
      }
    }
  };
  return (
    <div className="w-[32%] h-[40vh] border border-gray-600 rounded-md relative">
      <img src={image} alt="" />
      <h2>{name}</h2>
      <p>{location}</p>
      <button className="absolute bottom-1 right-1 text-xl" onClick={changeAdd}>
        {isAdd ? <FaHeart /> : <FaRegHeart />}
      </button>
    </div>
  );
};

export default Item;
