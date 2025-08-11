const { plugin } = require("postcss");
const { default: daisyui } = require('daisyui');
const { default: themes } = require('daisyui/theme/object');

module.exports ={
    content: [
      "./src/**/*.{js,jsx,ts,tsx,html}",
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require('daisyui')
    ],
    daisyui:{
        themes: [ 'night' ]
    }
}