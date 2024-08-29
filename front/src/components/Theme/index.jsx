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

      {/* Right Content Area */}
      <div className="w-[80%] flex flex-col">
        {/* ThemeNav on top */}
        <div className="w-full h-[20vh]">
          <ThemeNav onSelectTheme={handleThemeSelect} />
        </div>

        {/* ThemePanel below ThemeNav */}
        <div className="w-full">
          {selectedTheme && <ThemePanel selectedTheme={selectedTheme} />}
        </div>
      </div>
    </div>
  );
};

export default Index;
