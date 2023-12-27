import { useEffect, useState } from "react";
import ad1 from "../images/ad1.png";
import { IoCloseSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const Popup: React.FC = () => {
  const [isClose, setIsClose] = useState(false);

  const onClickClose = () => {
    setIsClose(true);

    localStorage.setItem("topBannerClose1", "true");
  };

  useEffect(() => {
    if (localStorage.getItem("topBannerClose1") === "true") {
      setIsClose(true);
    }
  }, []);

  return (
    <div className={`h-[306px] ${isClose && "hidden"}`}>
      <div className="container flex justify-between">
        <Link to="/sale">
          <div className="flex items-center">
            <img src={ad1} alt="top_banner" className="rounded-b-2xl" />
          </div>
        </Link>
        <button className="w-10 h-10" onClick={onClickClose}>
          <IoCloseSharp className="hover:scale-125 duration-300 text-3xl" />
        </button>
      </div>
    </div>
  );
};

export default Popup;
