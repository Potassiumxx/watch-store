/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";

function ImageSlider() {
  const imageList = [
    { src: "./src/assets/images/pexels-pixabay-277319.jpg", alt: "Round Skeleton Watch" },
    { src: "./src/assets/images/pexels-thefstopper-1075189.jpg", alt: "Black Coloured Chronograph Watch" },
  ];

  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(() => (currentIndex + 1) % imageList.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return imageList.map((img, index) => (
    <img
      key={index}
      src={img.src}
      alt={img.alt}
      className={`absolute top-0 left-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${
        index === currentIndex ? "opacity-100" : "opacity-0"
      }`}
    />
  ));
}

export default function Home() {
  React.useEffect(() => {}, []);
  return (
    <div className="h-screen">
      <ImageSlider />
      {/*1st Photo by Pixabay: https://www.pexels.com/photo/round-skeleton-watch-277319/ */}
      {/* Photo by Fstopper: https://www.pexels.com/photo/round-black-current-chronograph-watch-with-link-bracelet-1075189/ */}
      <div className="absolute z-10 w-[300px] h-[150px] bg-white bottom-5 right-2 rounded-lg"></div>
    </div>
  );
}
