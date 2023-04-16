/** @type {import('tailwindcss').Config} */
export default {
    mode: 'jit',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        fontFamily: {
            "sans-serif": "Montserrat",
            "open": "Open Sans"
        },
        colors: {
            "black": {
                DEFAULT: "#222222",
                light: "#343434"
            },
            "red": "#FF5151",
            "gray": {
                DEFAULT: "#8C888A",
                light: "#EEEEEE",
                
                dark: "#8C888A"
            },
            "blue": {
                DEFAULT: "#1840A7",
                outline: "rgb(24 52 167 / 0.3)",
                light: "#EAF0FF",
                accent: "#336BEA",
                accentgradient: "linear-gradient(92.52deg, #4F9EFD 0%, #1635D6 100%);"
            },
            "white": "#FFF",
            "sky": "#EAF0FF",
            "green": "#279825"
        }
    },
    safelist: [
        {
            pattern: /border-(red|gray)/
        },
        {
            pattern: /bg-(black|white|blue|red)/
        }
    ],
    plugins: [],
}

