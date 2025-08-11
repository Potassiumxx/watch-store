import * as React from "react";
import Button from "../../components/ui/Button/Button";
import { FaCamera } from "react-icons/fa";
import Collection from "../../components/ui/Collection/Collection";
import { Link, useLocation } from "react-router-dom";
import AboutUs from "../../components/ui/AboutUs/AboutUs";
import { useUIStore } from "../../store/uiStore";

// function ImageSlider() {
//   const imageList = [
//     { src: "./src/assets/images/pexels-pixabay-277319.jpg", alt: "Round Skeleton Watch" },
//     { src: "./src/assets/images/pexels-thefstopper-1075189.jpg", alt: "Black Coloured Chronograph Watch" },
//     { src: "./src/assets/images/pexels-ferarcosn-190819.jpg", alt: "Silver And Black Round Watch" },
//   ];

//   const [currentIndex, setCurrentIndex] = React.useState(0);

//   React.useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex(() => (currentIndex + 1) % imageList.length);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [currentIndex]);

//   return imageList.map((img, index) => (
//     <img
//       key={index}
//       src={img.src}
//       alt={img.alt}
//       className={`absolute top-0 left-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${
//         index === currentIndex ? "opacity-100" : "opacity-0"
//       }`}
//     />
//   ));
// }

export default function Home() {
  const location = useLocation();

  const navbarHeight = useUIStore((state) => state.navbarHeight);

  React.useEffect(() => {
    // Check the state's values passed from Navbar
    if (location.state?.scrollTo === "about-us") {
      const collectionSection = document.getElementById("about-us");
      if (collectionSection) {
        setTimeout(() => {
          collectionSection.scrollIntoView({ behavior: "smooth" });
        }, 50); // Slight delay ensures the DOM is ready
      }

      // Clear the state to avoid repeating scroll if navigating back
      window.history.replaceState({}, document.title);
    }
  }, [location]);
  return (
    <>
      {/* <ImageSlider /> */}
      {/*1st Photo by Pixabay: https://www.pexels.com/photo/round-skeleton-watch-277319/ */}
      {/*2nd Photo by Fstopper: https://www.pexels.com/photo/round-black-current-chronograph-watch-with-link-bracelet-1075189/ */}
      {/*3rd Photo by Fernando Arcos:
      https://www.pexels.com/photo/silver-linked-bracelet-silver-and-black-round-chronograph-watch-190819/ */}
      <div className={`flex pb-3 bg-black overflow-hidden`} style={{ minHeight: `calc(65dvh - ${navbarHeight}px)` }}>
        <div className="flex flex-col text-white w-full h-[65dvh] md:h-[85dvh] xl:justify-between">
          <div className="relative w-full self-center flex flex-col justify-center h-[60%] md:h-[70%]">
            <span className="absolute w-[50%] h-[2px] bg-gray-600 bg-gradient-to-r from-gray-700 via-white to-gray-700 animate-glowline top-[20%] md:top-[25%] lg:top-[20%]" />
            <div className="flex flex-col text-center self-center max-w-[700px] gap-7">
              <h1 className="text-2xl md:text-4xl xl:text-6xl uppercase font-bold tracking-wide">Get watches online</h1>
              <p className="text-white md:text-lg md:text-center font-semibold">
                Discover the best collection of watches, perfect for every occasion. Stylish, durable, and affordable.
              </p>
            </div>
            <span className="absolute w-[50%] h-[2px] bg-gray-600 bottom-[25%] bg-gradient-to-l from-gray-700 via-white to-gray-700 animate-glowline-reverse right-0 lg:bottom-[20%]" />
          </div>
          <div className="flex flex-col items-center pb-10">
            <Link to={"/products"} className="text-[20px] underline md:hover:underline underline-offset-8 xl:text-2xl"> View Products </Link>
          </div>
          {/*<div className="absolute bottom-4 right-4 bg-white text-black rounded-sm hover:bg-[#3f3f3f] hover:text-white transition-all duration-150">
            <a
              href="https://www.pexels.com/photo/round-black-current-chronograph-watch-with-link-bracelet-1075189/"
              target="_blank"
              className="inline-block font-bold text-[13px] p-[4px_6px] leading-[1]">
              <span className="inline-block p-[2px_3px] align-middle">
                <FaCamera size={14} />
              </span>
              <span className="inline-block p-[2px_3px] align-middle">Fstoppper</span>
            </a>
          </div>*/}
        </div>
      </div>
      <section>
        {/*<Collection />*/}
        <AboutUs />
      </section>
    </>
  );
}
