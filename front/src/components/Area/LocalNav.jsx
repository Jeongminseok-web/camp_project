import React, { useState } from "react";
import { regionData } from "../../utils/localData";

const LocalNav = () => {
  const [selectedDistricts, setSelectedDistricts] = useState({});

  const handleDistrictChange = (regionCode, e) => {
    setSelectedDistricts({
      ...selectedDistricts,
      [regionCode]: e.target.value,
    });
  };

  return (
    <div className="">
      <div
        className="flex text-md text-center gap-3 
      border border-neutral-700 px-2 py-3 overflow-auto"
      >
        {Object.keys(regionData).map((regionCode) => (
          <div
            key={regionCode}
            className="border border-neutral-700 rounded-sm"
          >
            <select
              id={`dropdown-${regionCode}`}
              value={selectedDistricts[regionCode] || ""}
              onChange={(e) => handleDistrictChange(regionCode, e)}
              className="text-center w-25"
            >
              <option value="">{`${regionData[regionCode].name}`}</option>
              {regionData[regionCode].districts.map((district) => (
                <option
                  key={district.시군구_코드_법정동기준}
                  value={district.시군구_코드_법정동기준}
                >
                  {district.시군구명}
                </option>
              ))}
            </select>

            {/* {selectedDistricts[regionCode] && (
              <div>
                <p>
                  {
                    regionData[regionCode].districts.find(
                      (district) =>
                        district.시군구_코드_법정동기준.toString() ===
                        selectedDistricts[regionCode]
                    ).시군구명
                  }
                </p>
              </div>
            )} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocalNav;
