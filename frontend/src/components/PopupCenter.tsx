import { useEffect, useState } from "react";
import ad2 from "../images/ad2.png";
import { IoCloseSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const PopupCenter: React.FC = () => {
  const [isClose, setIsClose] = useState(false);

  const onClickClose = () => {
    setIsClose(true);

    localStorage.setItem("topBannerClose2", "true");
  };

  useEffect(() => {
    if (localStorage.getItem("topBannerClose2") === "true") {
      setIsClose(true);
    }
  }, []);

  return (
    <div
      className={`${
        isClose && "hidden"
      } fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50`}
    >
      <div className="container flex justify-between">
        <div className="flex items-center">
          <Link to="/sale">
            <img
              src={ad2}
              alt="center_banner"
              className="rounded-xl"
              style={{ width: "650px", height: "650px" }}
            />
          </Link>
        </div>
        <button className="w-4 h-4" onClick={onClickClose}>
          <IoCloseSharp className="hover:scale-125 duration-300 text-3xl" />
        </button>
      </div>
    </div>
  );
};

export default PopupCenter;
