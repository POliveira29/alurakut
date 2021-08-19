import {useState, useEffect, useContext} from "react";
import {AlurakutMenu} from "../src/lib/AlurakutCommons";

import ProfileSidebar from "../src/components/ProfileSidebar";
import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import WrapperHeader from "../src/components/WrapperHeader";
import {WrapperList} from "../src/components/WrapperList";
import LoginContext from "../src/contexts/LoginContext";

export default function Testimony() {
  const githubUser = useContext(LoginContext)[0];
  const [depoimentos, setDepoimentos] = useState([]);
  // let {query} = useRouter();

  const qtdDepoimentos = depoimentos
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
          allTestimonies{
            id
            messageTo
            testimony
            messageFrom
          }
        }`,
      }),
    })
      .then((res) => res.json()) // Pega o retorno do response.JSON() e já retorna.
      .then((res) => {
        const datoDepoimentos = res.data.allTestimonies;
        setDepoimentos(datoDepoimentos);
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
            title="Meus depoimentos"
            items={qtdDepoimentos}
          ></WrapperHeader>
          <WrapperList>
            <ul className="list__items">
              {depoimentos
                .filter((item) => item.messageTo === githubUser)
                .map((depoimento) => {
                  return (
                    <li key={depoimento.id}>
                      <a
                        href={`https://github.com/${depoimento.messageFrom}`}
                        target="blank"
                      >
                        <img
                          src={`https://github.com/${depoimento.messageFrom}.png`}
                          alt="Avatar"
                        />
                      </a>
                      <div style={{display: "flex", alignItems: "baseline"}}>
                        <span>{depoimento.messageFrom}:</span>
                        <p>{depoimento.testimony}</p>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </WrapperList>
        </Box>
      </MainGrid>
    </>
  );
}
