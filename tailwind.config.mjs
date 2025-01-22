/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        "custom-gradient": `linear-gradient(#ecf2f6, #ecf2f6) padding-box, 
                            linear-gradient(0deg, rgb(236, 242, 246), rgba(179, 174, 227, 0.4427), rgb(230, 227, 255)) border-box`,
      },
    },
  },
  plugins: [],
};
