/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,jsx}","./components/**/*.{html,js,jsx}"],
    theme: {
      screens:{
        'md1':{'max':'500px'}
      },
      extend: {
        fontFamily:{
          'gun': ['gunplay']
        }
      },
    },
    plugins: [],
  }

  //md1:h-[100%] md1:max-h-[700px] h-[500px]
