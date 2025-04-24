import { Link } from "react-router-dom";
import analogImg from "../../assets/images/pexels-ferarcosn-190819.jpg";
import digitalImg from "../../assets/images/pexels-pixabay-277319.jpg";
import smartImg from "../../assets/images/pexels-thefstopper-1075189.jpg";

const collectionArray = [
  { id: 1, title: "Analog Watches", img: analogImg, link: "analog" },
  { id: 2, title: "Digital Watches", img: digitalImg, link: "digital" },
  { id: 3, title: "Smartwatches", img: smartImg, link: "smart" },
];

export default function Collection() {
  return (
    <div id="collection" className="bg-black/[.95] component-x-axis-padding text-4xl font-semibold py-7">
      <h1 className="text-white text-center">Our Collections</h1>
      <div className="grid grid-cols-3 justify-between gap-5 h-[500px] mt-10">
        {collectionArray.map((watch) => {
          return (
            <Link
              to={watch.link}
              key={watch.id}
              className="group flex flex-col justify-around text-white text-center bg-black rounded-md border-white/[.3] border-[1px] transition-transform duration-300 overflow-hidden hover:scale-[1.02] hover:border-[rgb(255,215,0,0.7)]">
              <img
                src={watch.img}
                className="rounded-md h-[100%] object-cover object-center aspect-[4/3] group-hover:scale-150 duration-300"
              />
              <div className="py-3">
                <h3 className="text-3xl">{watch.title}</h3>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
