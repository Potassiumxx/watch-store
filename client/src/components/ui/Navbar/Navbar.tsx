import { Link } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { LiaShoppingCartSolid } from "react-icons/lia";
import { FaRegUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import UserMenu from "../UserMenu/UserMenu";
import { useAuthStore } from "../../../store/authStore";
import { useUIStore } from "../../../store/uiStore";
import { useUserStore } from "../../../store/userStore";

export default function Navbar() {
  const [openSearchBar, setOpenSearchBar] = React.useState<boolean>(false);
  const [isSearchBarVisible, setIsSearchBarVisible] = React.useState<boolean>(false);
  const [isNavbarBackgroundVisible, setIsNavbarBackgroundVisible] = React.useState<boolean>(false);

  const searchBarRef = React.useRef<HTMLInputElement | null>(null);
  const searchIconRef = React.useRef<HTMLButtonElement | null>(null);
  const bottomNavbarRef = React.useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();

  const isUserSignedIn = useAuthStore((state) => state.isUserSignedIn);

  const globalUsername = useUserStore((state) => state.globalUsername);

  const showUserMenu = useUIStore((state) => state.showUserMenu);
  const setShowUserMenu = useUIStore((state) => state.setShowUserMenu);

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

  function scrollToTop() {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }

  function updateNavbarBackgroundOnScroll() {
    const currentScrollPosition = window.scrollY;
    if (currentScrollPosition > 0 && bottomNavbarRef.current) {
      setIsNavbarBackgroundVisible(true);
    } else if (currentScrollPosition === 0 && bottomNavbarRef.current) {
      setIsNavbarBackgroundVisible(false);
    }
  }

  // Go to collection section in home page
  function handleGoToCollection() {
    if (location.pathname === "/") {
      const collectionSection = document.getElementById("collection");
      if (collectionSection) collectionSection.scrollIntoView({ behavior: "smooth" });
    } else {
      // Pass the "state" to the "/" location when navigating. The state is stored in memory by React Router. It can only be read by Home.tsx.
      navigate("/", { state: { scrollTo: "collection" } });
    }
  }

  function getFirstAlphabetLetter(string: string): string {
    const match = string.match(/[a-zA-Z]/);
    return match ? match[0].toUpperCase() : "?";
  }

  React.useEffect(() => {
    document.addEventListener("click", handleCloseSearchBar);
    return () => {
      document.removeEventListener("click", handleCloseSearchBar);
    };
  }, [openSearchBar]);

  React.useEffect(() => {
    window.addEventListener("scroll", updateNavbarBackgroundOnScroll);

    return () => window.removeEventListener("scroll", updateNavbarBackgroundOnScroll);
  });

  return (
    <div className="fixed top-0 flex flex-col justify-between items-center z-20 w-full" data-testid="navbar">
      {showUserMenu && <UserMenu />}
      <div className="flex justify-between w-full py-2 bg-[#1a1a1a] text-white items-center px-[50px]">
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
          {isUserSignedIn ? (
            <button className="bg-white text-black rounded-full w-[30px] h-[30px] text-center font-bold text-[19px] hover:bg-gray-500 hover:text-white duration-150">
              {getFirstAlphabetLetter(globalUsername)}
            </button>
          ) : (
            <button className="hover:cursor-pointer" aria-label="User" onClick={() => setShowUserMenu(true)}>
              <FaRegUser size={22} />
            </button>
          )}
        </div>
      </div>
      <div
        className={`component-x-axis-padding flex w-full py-5 items-center text-white duration-300 ${
          isNavbarBackgroundVisible ? "bg-black/[.5] backdrop-blur-md" : "bg-transparent backdrop-blur-md"
        }`}
        data-testid="bottom-navbar"
        ref={bottomNavbarRef}>
        <button onClick={scrollToTop} className="flex items-center gap-2 hover:scale-110 duration-300">
          <span className="bg-[#1bddf3] w-5 h-5 block"></span>
          <span className="font-bold text-2xl tracking-wider text-white">WS</span>
        </button>
        <div className="flex w-full justify-center">
          <div className="flex gap-[8rem]">
            <Link to={"/"} className="navbar-link-style">
              Home
            </Link>
            <button className="navbar-link-style" onClick={handleGoToCollection}>
              Collection
            </button>
            <Link to={"about"} className="navbar-link-style">
              About Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
