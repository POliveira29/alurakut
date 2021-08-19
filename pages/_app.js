import {createGlobalStyle, ThemeProvider} from "styled-components";
import {AlurakutStyles} from "../src/lib/AlurakutCommons";
import {useState} from "react";
import LoginContext from "../src/contexts/LoginContext";

const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: sans-serif;
    background: #F1F9FE;
  }
  main{
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  img{
    display: block;
    max-width: 100%;
    height: auto;
  }
  a{
    text-decoration: none;
  }
  ${AlurakutStyles}
`;

const theme = {
  colors: {
    primary: "#0070f3",
  },
};

export default function App({Component, pageProps}) {
  const loginHook = useState("");
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <LoginContext.Provider value={loginHook}>
          <Component {...pageProps} />
        </LoginContext.Provider>
      </ThemeProvider>
    </>
  );
}
