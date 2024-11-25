/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import Button from "../../components/Button/Button";

function ImageSlider() {
  const imageList = [
    { src: "./src/assets/images/pexels-pixabay-277319.jpg", alt: "Round Skeleton Watch" },
    { src: "./src/assets/images/pexels-thefstopper-1075189.jpg", alt: "Black Coloured Chronograph Watch" },
    { src: "./src/assets/images/pexels-ferarcosn-190819.jpg", alt: "Silver And Black Round Watch" },
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
      {/* <ImageSlider /> */}
      {/*1st Photo by Pixabay: https://www.pexels.com/photo/round-skeleton-watch-277319/ */}
      {/*2nd Photo by Fstopper: https://www.pexels.com/photo/round-black-current-chronograph-watch-with-link-bracelet-1075189/ */}
      {/*3rd Photo by Fernando Arcos:
      https://www.pexels.com/photo/silver-linked-bracelet-silver-and-black-round-chronograph-watch-190819/ */}
      <div className="relative flex items-end pb-9 min-h-dvh bg-black z-10 backgroundImageStyle">
        <div className="flex flex-col justify-between text-white px-[50px] min-h-[350px]">
          <div className="flex flex-col gap-7 max-w-[500px]">
            <h1 className="uppercase text-6xl font-bold tracking-wide">Buy watches online</h1>
            <p className="text-white text-lg max-w-[400px]">
              Discover the best collection of watches, perfect for every occasion. Stylish, durable, and affordable.
            </p>
          </div>
          <Button textValue={"Shop Now"} className="rounded-sm hover:font-bold" />
        </div>
      </div>
    </div>
  );
}
