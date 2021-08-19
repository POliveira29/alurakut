import {useState, useEffect, useContext} from "react";
import {AlurakutMenu} from "../src/lib/AlurakutCommons";

import ProfileSidebar from "../src/components/ProfileSidebar";
import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import WrapperHeader from "../src/components/WrapperHeader";
import {ScrapList} from "../src/components/ScrapList";
import LoginContext from "../src/contexts/LoginContext";

export default function Scraps() {
  const githubUser = useContext(LoginContext)[0];
  const [recados, setRecados] = useState([]);

  const qtdRecados = recados
    .filter((qtd) => qtd.messageTo === githubUser)
    .map((qtd) => qtd.id);

  useEffect(function () {
    fetch("https://graphql.datocms.com/", {
      method: "POST",
      headers: {
        Authorization: "3f13d39984bc0daeee485665a2fdde",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `query {
              allScraps{
                id
                messageFrom
                messageTo
                scrap
              }
            }`,
      }),
    })
      .then((res) => res.json()) // Pega o retorno do response.JSON() e já retorna.
      .then((res) => {
        const datoScrap = res.data.allScraps;
        setRecados(datoScrap);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea">
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <Box>
          <WrapperHeader
            title="Minha página de recados"
            items={qtdRecados}
          ></WrapperHeader>
          <ScrapList>
            <ul className="list__items">
              {recados
                .filter((item) => item.messageTo === githubUser)
                .map((item) => {
                  return (
                    <li className="scrap__item" key={item.id}>
                      <a
                        href={`https://github.com/${item.messageFrom}`}
                        target="blank"
                      >
                        <img
                          className="scrap__avatar"
                          src={`https://github.com/${item.messageFrom}.png`}
                          alt="Avatar"
                        />
                      </a>
                      <div>
                        <span className="scrap__author">
                          {item.messageFrom}
                        </span>
                        <p className="scrap__text">{item.scrap}</p>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </ScrapList>
        </Box>
      </MainGrid>
    </>
  );
}
