import { useSDK } from "@metamask/sdk-react";
import { Dispatch, FC, SetStateAction } from "react";
import { Link } from "react-router-dom";
import Metamask from "../images/Metamask.png";
import Popup from "./Popup";

interface HeaderProps {
  account: string;
  setAccount: Dispatch<SetStateAction<string>>;
}

const Header: FC<HeaderProps> = ({ account, setAccount }) => {
  const { sdk } = useSDK();

  const onClickMetaMask = async () => {
    try {
      const accounts: any = await sdk?.connect();

      setAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="z-30">
        <Popup />
      </div>
      <header className="bg-gray-200 p-2 flex justify-between sticky top-0 z-10 text-4xl font-KCC">
        <div className="flex gap-4">
          <div className="hover:scale-125 duration-300">
            <Link to="/">Home</Link>
          </div>
          <div className="hover:scale-125 duration-300">
            <Link to="/my">My</Link>
          </div>
          <div className="hover:scale-125 duration-300">
            <Link to="/sale">Sale</Link>
          </div>
        </div>
        <div>
          {account ? (
            <div className="hover:scale-110 duration-300">
              <span>
                {account.substring(0, 7)}...
                {account.substring(account.length - 5)}
              </span>
              <button className="ml-2" onClick={() => setAccount("")}>
                Logout
              </button>
            </div>
          ) : (
            <button onClick={onClickMetaMask}>
              <div className="flex hover:scale-110 duration-300">
                <img src={Metamask} alt="Metamask" style={{ width: "30px" }} />
                &nbsp;MetaMask Login
              </div>
            </button>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
