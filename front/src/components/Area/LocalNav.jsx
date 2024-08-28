import React, { useState } from 'react';
import { regionData } from '../../utils/localData';

const LocalNav = ({ onRegionChange }) => {
  const [selectedDistricts, setSelectedDistricts] = useState({});

  const handleDistrictChange = (regionCode, e) => {
    const selectedDistrict = regionData[regionCode].districts.find(
      (district) =>
        district.시군구_코드_법정동기준.toString() === e.target.value
    );

    setSelectedDistricts({
      ...selectedDistricts,
      [regionCode]: e.target.value,
    });

    if (selectedDistrict) {
      onRegionChange(selectedDistrict.lat, selectedDistrict.lng);
    }
  };

  return (
    <div className="">
      <div className="test flex text-md text-center gap-3 px-2 py-3 overflow-x-auto">
        {Object.keys(regionData).map((regionCode) => (
          <div key={regionCode}>
            <select
              id={`dropdown-${regionCode}`}
              value={selectedDistricts[regionCode] || ''}
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocalNav;
