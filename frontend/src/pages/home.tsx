import { FC, useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { NftMetadata, OutletContext } from "../types";
import axios from "axios";
import NftCard from "../components/NftCard";
import PopupCenter from "../components/PopupCenter";

const GET_AMOUNT = 6;

const Home: FC = () => {
  const [searchTokenId, setSearchTokenId] = useState<number>(0);
  const [totalNFT, setTotalNFT] = useState<number>(0);
  const [metadataArray, setMetadataArray] = useState<NftMetadata[]>([]);

  const { mintNftContract } = useOutletContext<OutletContext>();

  const detectRef = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver>();

  const observe = () => {
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && metadataArray.length !== 0) {
        getNFTs();
      }
    });

    if (!detectRef.current) return;

    observer.current.observe(detectRef.current);
  };

  const getTotalSupply = async () => {
    try {
      if (!mintNftContract) return;

      const totalSupply = await mintNftContract.methods.totalSupply().call();

      setSearchTokenId(Number(totalSupply));
      setTotalNFT(Number(totalSupply));
    } catch (error) {
      console.error(error);
    }
  };

  const getNFTs = async () => {
    try {
      if (!mintNftContract || searchTokenId <= 0) return;

      let temp: NftMetadata[] = [];

      for (let i = 0; i < GET_AMOUNT; i++) {
        if (searchTokenId - i > 0) {
          const metadataURI: string = await mintNftContract.methods
            // @ts-expect-error
            .tokenURI(searchTokenId - i)
            .call();

          const response = await axios.get(metadataURI);

          temp.push({ ...response.data, tokenId: searchTokenId - i });
        }
      }

      setSearchTokenId(searchTokenId - GET_AMOUNT);
      setMetadataArray([...metadataArray, ...temp]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTotalSupply();
  }, [mintNftContract]);

  useEffect(() => {
    if (totalNFT === 0) return;

    getNFTs();
  }, [totalNFT]);

  useEffect(() => {
    observe();

    return () => observer.current?.disconnect();
  }, [metadataArray]);

  return (
    <>
      <PopupCenter />
      <div className="text-center font-ChristmasBold text-9xl mt-[50px] mb-10">
        Happy Holidays 🎄
      </div>
      <div className="grow">
        <ul className="p-8 grid grid-cols-3 gap-8">
          {metadataArray?.map((v, i) => (
            <NftCard
              key={i}
              image={v.image}
              name={v.name}
              tokenId={v.tokenId!}
            />
          ))}
        </ul>
      </div>
      {Array.from({ length: 300 }).map((_, i) => (
        <div
          key={i}
          className={`snow layer${(i % 3) + 1} ${i % 2 === 0 ? "a" : ""}`}
          style={{
            left: `${Math.random() * 100}vw`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${Math.random() * 3 + 2}s`,
          }}
        />
      ))}
      <div ref={detectRef} className="text-white py-4">
        🎄
      </div>
    </>
  );
};

export default Home;
