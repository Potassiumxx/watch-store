/** @type {import('tailwindcss').Config} */

import plugin from "tailwindcss/plugin";

function customClassName({ addComponents }) {
  const newComponents = {
    ".component-x-axis-padding": {
      "@apply pr-[50px] pl-[50px]": {},
    },
    ".navbar-link-style": {
      "@apply text-center border-white uppercase font-semibold tracking-wider": {},
    },
    ".navbar-link-style:hover": {
      "@apply underline underline-offset-8": {},
    },
    ".navbar-link-padding": {
      "@apply px-[50px] py-[10px]": {},
    },
    ".backgroundImageStyle::before": {
      content: "''",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: "url(./src/assets/images/pexels-thefstopper-1075189.jpg)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      minHeight: "100%",
      zIndex: -1,
      opacity: ".5",
    },
    ".formButtonStyle": {
      "@apply w-full py-2 bg-[#1bddf3] text-black rounded border-none hover:bg-opacity-80 hover:text-black": {},
    },
    ".defaultButtonStyle": {
      "@apply w-[150px] text-white border-2 border-white rounded-sm hover:font-bold hover:bg-white hover:text-black": {},
    },
  };
  addComponents(newComponents);
}

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [plugin(customClassName)],
};
