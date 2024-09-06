import { Link } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { LiaShoppingCartSolid } from "react-icons/lia";
import { FaRegUser } from "react-icons/fa6";
import * as React from "react";

export default function Navbar() {
  const [openSearchBar, setOpenSearchBar] = React.useState<boolean>(false);
  const [isSearchBarVisible, setIsSearchBarVisible] = React.useState<boolean>(false);
  const searchBarRef = React.useRef<HTMLInputElement | null>(null);
  const searchIconRef = React.useRef<HTMLButtonElement | null>(null);

  function handleOpenSearchBar() {
    setOpenSearchBar(true);
    setTimeout(() => {
      setIsSearchBarVisible(true);
      searchBarRef.current?.focus();
    }, 0);
  }

  function handleCloseSearchBar(event: MouseEvent) {
    if (
      searchBarRef.current !== null &&
      !searchIconRef.current?.contains(event.target as Node) &&
      !searchBarRef.current?.contains(event.target as Node) &&
      searchBarRef.current.value.trim().length === 0
    ) {
      setIsSearchBarVisible(false);
      setTimeout(() => {
        setOpenSearchBar(false);
      }, 300);
    }
  }

  React.useEffect(() => {
    console.log("run");
    document.addEventListener("click", handleCloseSearchBar);
    return () => {
      document.removeEventListener("click", handleCloseSearchBar);
      console.log("stop");
    };
  }, [openSearchBar]);

  return (
    <div className="flex flex-col justify-between items-center">
      <div className="relative flex justify-between w-full py-2 pl-[100px] pr-[100px] bg-[#0E0E0E] text-white items-center">
        <div>
          <span className="text-[10px] italic capitalize text-[#898989]">Buy best watches with free shipping & returns</span>
        </div>
        {openSearchBar && (
          <input
            ref={searchBarRef}
            className={`${
              isSearchBarVisible ? "w-[45%]" : "w-0 px-0"
            } h-6 text-black px-2 outline-1 transition-all duration-300 absolute right-[320px]`}
            placeholder="Search"
          />
        )}
        <div className="flex items-center w-[200px] justify-between">
          <button ref={searchIconRef} onClick={handleOpenSearchBar} className="hover:cursor-pointer" aria-label="Search">
            <IoSearchOutline size={25} />
          </button>
          <button className="flex items-center hover:cursor-pointer" aria-label="Cart">
            <LiaShoppingCartSolid size={32} />
            <span className="flex items-center text-[12px] font-bold px-[5px] py-[1px] rounded-[50%] bg-[#f28c26]">999</span>
          </button>
          <button className="hover:cursor-pointer" aria-label="User">
            <FaRegUser size={22} />
          </button>
        </div>
      </div>
      <div>
        <Link to={"/"}>
          <img alt="logo" />
        </Link>
      </div>
      <div className="flex gap-2 bg-black text-white rounded-[25px] min-h-[3.2rem] items-center">
        <span className="navbar-link-style border-r-2">
          <Link to={"/"} className="navbar-link-padding">
            Home
          </Link>
        </span>
        <span className="navbar-link-style border-r-2">
          <Link to={"products"} className="navbar-link-padding">
            Collection
          </Link>
        </span>
        <span className="navbar-link-style">
          <Link to={"about"} className=" navbar-link-padding">
            About Us
          </Link>
        </span>
      </div>
      <div className="flex w-28 items-center justify-center gap-4">
        <span>Search</span>
        <span>Cart</span>
      </div>
    </div>
  );
}
