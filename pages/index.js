import {useState, useEffect} from "react";
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet,
} from "../src/lib/AlurakutCommons";
import nookies from "nookies";
import jwt from "jsonwebtoken";

import BoxRelations from "../src/components/BoxRelations";
import Box from "../src/components/Box";
import MainGrid from "../src/components/MainGrid";
import InputFile from "../src/components/UploadFile";
import {ProfileRelationsBoxWrapper} from "../src/components/ProfileRelations";

function ProfileSidebar(props) {
  return (
    <Box as="aside">
      <img
        src={`http://github.com/${props.githubUser}.png`}
        alt="Foto Usuário"
      />
      <hr />
      <p>
        <a className="boxLink" href={`http://github.com/${props.githubUser}`}>
          @{props.githubUser}
        </a>
      </p>
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

export default function Home(props) {
  const githubUser = props.githubUser;
  const pessoasFavoritas = [
    "rafaballerini",
    "peas",
    "omariosouto",
    "felipefialho",
    "LauraBeatris",
    "lukemorales",
  ];

  const [seguidores, setSeguidores] = useState([]);
  const [comunidades, setComunidades] = useState([]);
  //const [selectedFile, setSelectedFile] = useState();
  useEffect(function () {
    // Pegar o array de dados do Github
    fetch(`https://api.github.com/users/${githubUser}/followers`)
      .then(function (res) {
        return res.json();
      })
      .then(function (resJson) {
        setSeguidores(resJson);
      });

    const token = "3f13d39984bc0daeee485665a2fdde";
    // API GraphQL
    fetch("https://graphql.datocms.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        query: `query {
          allCommunities{
            title
            id
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

  // Cria uma nova cominidade
  function handleCriarComunidade(e) {
    e.preventDefault();
    const dadosForm = new FormData(e.target);
    const comunidade = {
      title: dadosForm.get("title"),
      imageUrl: dadosForm.get("image"),
      creatorSlug: githubUser,
    };

    fetch("/api/comunidades", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: JSON.stringify(comunidade),
      }),
    }).then(async (res) => {
      const dados = await res.json();
      const novaComunidade = dados.criarRegistro;
      const comunidadesAtualizadas = [...comunidades, novaComunidade];
      setComunidades(comunidadesAtualizadas);
    });
  }

  // Upload da imagem de capa da comunidade
  function handleFileSelected() {}

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea">
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div>
          <Box>
            <h1 className="title">Bem vindo(a)</h1>
            <OrkutNostalgicIconSet></OrkutNostalgicIconSet>
          </Box>
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={handleCriarComunidade}>
              <div>
                <input
                  type="text"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  placeholder="Qual vai ser o nome da sua comunidade?"
                />
              </div>
              <div>
                {/* <InputFile>
                  <label htmlFor="uploadimage">
                    Carregue uma imagem para usarmos de capa
                  </label>
                  <div>
                    <input
                      type="file"
                      name="uploadimage"
                      id="uploadImage"
                      onChange={handleFileSelected}
                    />
                  </div>
                </InputFile> */}
                <input
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                  placeholder="Coloque uma URL para usarmos de capa"
                />
                <button>Criar comunidade</button>
              </div>
            </form>
          </Box>
        </div>
        <div>
          <BoxRelations title="Meus Seguidores" items={seguidores} />
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da Comunidade ({pessoasFavoritas.length})
            </h2>
            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`/users/${itemAtual}`}>
                      <img
                        src={`http://github.com/${itemAtual}.png`}
                        alt="Foto Usuário"
                      />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Minhas Comunidades ({comunidades.length})
            </h2>
            <ul>
              {comunidades.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/communities/${itemAtual.id}`}>
                      <img src={itemAtual.imageUrl} alt={itemAtual.title} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const token = cookies.USER_TOKEN;
  fetch("https://alurakut.vercel.app/api/auth", {
    headers: {
      Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJnaXRodWJVc2VyIjoib21hcmlvc291dGEiLCJyb2xlcyI6WyJ1c2VyIl0sImlhdCI6MTYyNjczNDgzNiwiZXhwIjoxNjI3MzM5NjM2fQ.yIi6FpaalH-yD4yBorl3c7PpbmSya7KdoEYmL0tshN0",
    },
  })
    .then((resposta) => resposta.json())
    .then((resultado) => {
      console.log(resultado);
    });

  // const {isAuthenticated} = await fetch(
  //   "https://alurakut.vercel.app/api/auth",
  //   {
  //     headers: {
  //       Authorization: token,
  //     },
  //   }
  // ).then((resposta) => resposta.json());
  // console.log(isAuthenticated);
  // if (!isAuthenticated) {
  //   return {
  //     redirect: {
  //       destination: "/login",
  //       permanent: false,
  //     },
  //   };
  // }

  // Destruction
  const {githubUser} = jwt.decode(token);
  return {
    props: {
      githubUser,
    }, // will be passed to the page component as props
  };
}
