import {createGlobalStyle, ThemeProvider} from "styled-components";
import Head from "next/head";
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
      <Head>
        <meta charset="UTF-8" />
        <meta http-equiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Alurakut</title>
        <meta
          name="description"
          content="Alurakut. Conecte-se aos seus amigos e familiares usando recados e mensagens instantâneas.Conheça novas pessoas através de amigos de seus amigos e comunidades.Compartilhe seus vídeos, fotos e paixões em um só lugar"
        />
        <meta name="robots" content="index" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://alurakut-two-mu.vercel.app/" />
        <meta property="og:title" content="Alurakut" />
        <meta property="og:image" content="https://exemplo.com/imagem.jpg" />
        <meta
          property="og:description"
          content="Alurakut. Conecte-se aos seus amigos e familiares usando recados e mensagens instantâneas.Conheça novas pessoas através de amigos de seus amigos e comunidades.Compartilhe seus vídeos, fotos e paixões em um só lugar"
        />
        <meta property="og:site_name" content="Alurakut" />
        <meta property="og:locale" content="pt_BR" />
        <link
          rel="icon"
          type="image/png"
          href="https://imgur.com/5nSf09F.png"
        />
        <link rel="apple-touch-icon" href="https://imgur.com/3gesuGv.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <LoginContext.Provider value={loginHook}>
          <Component {...pageProps} />
        </LoginContext.Provider>
      </ThemeProvider>
    </>
  );
}
