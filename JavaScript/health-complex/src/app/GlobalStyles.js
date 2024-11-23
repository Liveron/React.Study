import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {
    --color-red-1: #C63636;
    --color-red-2: #922E2E;

    --color-yellow-1: #F4C85D;

    --color-white-1: #FFFFFF;
    --color-white-2: #fcf3ca;

    --color-grey-1: #474A51;
}

*,
*::before,
*::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}

html {
    font-size: 62.5%;
}

body {
    min-height: 100dvh;
    font-family: "UssrStencil";
}

#root {
    position: relative;
}

svg {
    display: block;
}

ul, li {
    display: block;
}

a {
    text-decoration: none;
    color: inherit;
}

button {
    border: none;
    font-family: inherit;
    font-size: inherit;
}

@font-face {
    font-family: "UssrStencil";
    src: url("/src/shared/ui/fonts/USSR_STENCIL.otf");
}

@font-face {
    font-family: "PobedaRegular";
    src: url("/src/shared/ui/fonts/pobeda-regular.ttf");
}

`;

export default GlobalStyles;
