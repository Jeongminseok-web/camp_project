import Navbar from "../Navbar";
import ItemPanel from "./ItemPanel";

const index = ({}) => {
  return (
    <div className="page-section">
      <Navbar />
      <div className="w-[80%] h-full p-2">
        <ItemPanel />
      </div>
    </div>
  );
};

export default index;
