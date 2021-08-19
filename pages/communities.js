import {useState, useEffect, useContext} from "react";
import {useRouter} from "next/router";
import Link from "next/link";
import {AlurakutMenu} from "../src/lib/AlurakutCommons";
import MainGrid from "../src/components/MainGrid";
import ProfileSidebar from "../src/components/ProfileSidebar";
import Box from "../src/components/Box";
import WrapperHeader from "../src/components/WrapperHeader";
import {WrapperList} from "../src/components/WrapperList";
import LoginContext from "../src/contexts/LoginContext";

export default function Friends() {
  const githubUser = useContext(LoginContext)[0];
  const [comunidades, setComunidades] = useState([]);
  let {query} = useRouter();

  const qtdComunity = comunidades
    .filter((qtd) => qtd.creatorSlug === githubUser)
    .map((qtd) => qtd.id);

  // Buscar comunidades cadastradas no Dato CMS
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
          allCommunities{
            id
            title
            imageUrl
            creatorSlug
          }
        }`,
      }),
    })
      .then((res) => res.json()) // Pega o retorno do response.JSON() e já retorna.
      .then((res) => {
        const datoComunidades = res.data.allCommunities;
        setComunidades(datoComunidades);
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
            title="Minhas comunidades"
            items={qtdComunity}
          ></WrapperHeader>
          <WrapperList>
            <ul className="list__items">
              {comunidades
                .filter((itemAtual) => itemAtual.creatorSlug === githubUser)
                .map((itemAtual) => {
                  query = itemAtual.id;
                  return (
                    <li key={itemAtual.id}>
                      <Link href={`/communities/${itemAtual.id}`}>
                        <img
                          className="list__image"
                          src={itemAtual.imageUrl}
                          alt={itemAtual.title}
                        />
                      </Link>
                      <span>{itemAtual.title}</span>
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
