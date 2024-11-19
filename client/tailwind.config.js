/** @type {import('tailwindcss').Config} */

import plugin from "tailwindcss/plugin";

function customClassName({ addComponents }) {
  const newComponents = {
    ".navbar-x-axis-padding": {
      "@apply pr-[100px] pl-[100px]": {},
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
