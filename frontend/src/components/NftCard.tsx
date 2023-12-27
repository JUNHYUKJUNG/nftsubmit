import { FC, useState } from "react";
import { Link } from "react-router-dom";

export interface NftCardProps {
  image: string;
  name: string;
  tokenId: number;
}

const NftCard: FC<NftCardProps> = ({ image, name, tokenId }) => {
  const [isHover, setIsHover] = useState<boolean>(false);

  const onMouseEnter = () => {
    setIsHover(true);
  };

  const onMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <Link to={`/detail/${tokenId}`}>
      <li
        className="relative overflow-hidden rounded-3xl"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div
          className={`transition-transform duration-300 ${
            isHover ? "scale-110" : ""
          }`}
        >
          <img className="rounded-3xl" src={image} alt={name} />
        </div>
      </li>
      <div className="text-center text-4xl font-semibold mt-4 mb-4 hover:scale-110 duration-300 font-Gangwon">
        {name}
      </div>
    </Link>
  );
};

export default NftCard;
