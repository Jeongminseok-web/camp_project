// index.jsx
import React from 'react';
import Navbar from '../Navbar';
import HotPanel from './HotPanel';

const Index = () => {
  return (
    <div className="w-[100%] h-[98vh] flex">
      <Navbar />
      <div className="w-full">
        <HotPanel />
      </div>
    </div>
  );
};

export default Index;
