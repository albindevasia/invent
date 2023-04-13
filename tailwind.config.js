/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}"
  ],
  theme: {
    extend: {
      backgroundImage:{
        "register": "url('/assets/reg.jpeg')",
        "registerFn":"url('/assets/der.webp')",
        "login":"url('/assets/gt.jpeg')",
        "products":"url('/assets/si.webp')",
        "clients":"url('/assets/fur.jpeg')",
        "mart":"url('/assets/indiaMart.jpeg')",
        "mart1":"url('/assets/mart1.jpeg')",
        "mart2":"url('/assets/mart2.jpeg')",
        "quicksale":"url('/assets/fear.jpeg')",
        "saletable" :"url('/assets/dam.avif')"
      }
    },
  },
  plugins: [
    
  ],
}
