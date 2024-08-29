import React, { useState } from 'react';
import Navbar from '../Navbar';
import ThemeNav from './ThemeNav';
import ThemePanel from './ThemePanel';

const Index = () => {
  const [selectedTheme, setSelectedTheme] = useState(null);

  const handleThemeSelect = (theme) => {
    setSelectedTheme(theme);
  };

  return (
    <div className="w-[100%] h-[98vh] m-auto flex">
      <Navbar />
      <div className="w-[100%] h-[20vh]">
        <ThemeNav onSelectTheme={handleThemeSelect} />
      </div>
      <div className="mt-4">
        {selectedTheme && <ThemePanel selectedTheme={selectedTheme} />}
      </div>
    </div>
  );
};

export default Index;
