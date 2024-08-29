import React from 'react';
import Navbar from '../Navbar';
import HotPanel from './HotPanel';

const Index = () => {
  return (
    <div className="w-[100%] h-[98vh] m-auto flex">
      <Navbar />
      <div>
        <HotPanel />
      </div>
    </div>
  );
};

export default Index;
