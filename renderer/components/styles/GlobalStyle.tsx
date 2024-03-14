import { createGlobalStyle, DefaultTheme } from "styled-components";
import { normalize } from "styled-normalize";

const GlobalStyle = createGlobalStyle<{ theme: DefaultTheme }>`
  ${normalize}


  
  *, ::before, ::after {
    border-width: 0;
    border-style: solid;
    border-color: theme('borderColor.DEFAULT', currentColor);
  }

  blockquote, dl, dd, h1, h2, h3,
  h4, h5, h6, hr, figure, p, pre {
    margin: 0;
  }
  

  h1, h2, h3, h4, h5, h6 {
    font-size: inherit;
    font-weight: inherit;
  }

  img, svg, video, canvas, audio, 
  iframe, embed, object {
    display: block;
  }

  body {
    font-family: 'IBM Plex Mono', monospace;
    font-weight: 500;
    background-color: ${({ theme }) => theme.colors?.body};
    color: ${({ theme }) => theme.colors?.text[100]};
    min-height: 100vh;

  }

  /*
 body {
  border: 10px solid #bfbfbf;
  border-radius: 10vh;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
  transform: perspective(1000px) rotateX(3deg)
  }
  */

  /* ===== Custom Scroll Bar ===== */
  /* width */
  ::-webkit-scrollbar {
    width: 15px;
  }
  /* Track */
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors?.body};
  }
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors?.scrollHandle};
  }
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors?.scrollHandleHover};
  }

  input[type=text] {
    background-color: ${({ theme }) => theme.colors?.body};
    color: ${({ theme }) => theme.colors?.text[100]};
    caret-color: ${({ theme }) => theme.colors?.primary};
  }
  input[type=text]:focus-visible {
    outline: none;
  }

  .sr-only {
    position: absolute;
    left: -10000px;
    top: auto;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }
`;

export default GlobalStyle;
