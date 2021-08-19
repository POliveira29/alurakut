import {useState, useEffect, useCallback, useContext} from "react";

import {useDropzone} from "react-dropzone";
import {CircularProgress} from "@material-ui/core";
import {BsUpload} from "react-icons/bs";
import {Image} from "cloudinary-react";
import axios from "axios";

//Components
import {AlurakutMenu, OrkutNostalgicIconSet} from "../src/lib/AlurakutCommons";
import {DropZone} from "../src/components/DropZone/styles";
import MainGrid from "../src/components/MainGrid";
import ProfileSidebar from "../src/components/ProfileSidebar";
import Box from "../src/components/Box";
import BoxRelations from "../src/components/BoxRelations";
import CommunityRelations from "../src/components/CommunityRelations";
import WidgetScrap from "../src/components/WidgetScrap";
import {ScrapList} from "../src/components/ScrapList";
import WidgetTestimony from "../src/components/WidgetTestimony";
import LoginContext from "../src/contexts/LoginContext";

export default function Home(props) {
  // const githubUser = props.githubUser;
  const githubUser = useContext(LoginContext)[0];

  const [seguidores, setSeguidores] = useState([]);
  const [advice, setAdvice] = useState("");
  const [comunidades, setComunidades] = useState([]);
  const [recados, setRecados] = useState([]);
  const [uploadFiles, setUploadFiles] = useState([]);
  const [images, setImages] = useState("");
  const [progress, setProgress] = useState(0);

  //Tradução conselho do dia
  // const axios = require("axios").default;
  // const {v4: uuidv4} = require("uuid");

  // var subscriptionKey = "f6f0f5b4-2c31-4489-9277-9eb4876c7565";
  // var endpoint = "https://api.cognitive.microsofttranslator.com";

  // // Add your location, also known as region. The default is global.
  // // This is required if using a Cognitive Services resource.
  // var location = "southcentralus";

  // axios({
  //   baseURL: endpoint,
  //   url: "/translate",
  //   method: "post",
  //   headers: {
  //     "Ocp-Apim-Subscription-Key": subscriptionKey,
  //     "Ocp-Apim-Subscription-Region": location,
  //     "Content-type": "application/json",
  //     "X-ClientTraceId": uuidv4().toString(),
  //   },
  //   params: {
  //     "api-version": "3.0",
  //     from: "en",
  //     to: ["de", "it"],
  //   },
  //   data: [
  //     {
  //       text: advice,
  //     },
  //   ],
  //   responseType: "json",
  // }).then(function (response) {
  //   console.log(JSON.stringify(response.data, null, 4));
  // });

  //Fetch API Github e Dato CMS
  useEffect(function () {
    // Pegar o array de dados do Github
    fetch(`https://api.github.com/users/${githubUser}/followers`)
      .then(function (res) {
        return res.json();
      })
      .then(function (resJson) {
        setSeguidores(resJson);
      });

    fetch(`https://api.adviceslip.com/advice`)
      .then(function (res) {
        return res.json();
      })
      .then(function (resJson) {
        setAdvice(resJson.slip.advice);
      });

    // API GraphQL
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

  // DropZone para imagens da comunidade
  function MyDropzone() {
    function sizeValidator(file) {
      const size = file.bytes;
      if (size > 10485760) {
        return {
          code: "size-to-larger",
          message: `Maximum image size must be 10mb`,
        };
      }
      return null;
    }

    const onDrop = useCallback((acceptedFiles) => {
      const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
      acceptedFiles.forEach(async (acceptedFile) => {
        const formData = new FormData();
        formData.append("file", acceptedFile);
        formData.append(
          "upload_preset",
          process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
        );
        await axios
          .post(url, formData, {
            onUploadProgress: (event) => {
              let loading = Math.round((event.loaded * 100) / event.total);
              setProgress(loading);
            },
          })
          .then((response) => {
            const data = response.data;
            setUploadFiles(() => [data]);
            setImages(data.url);
          })
          .catch((err) => {
            console.error(
              `${err}. Houve um problema ao realizar o upload da imagem no servidor`
            );
          });
      });
    }, []);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
      onDrop,
      accepts: "image/*",
      multiple: false,
      validator: sizeValidator,
    });

    return (
      <>
        <DropZone>
          <div
            {...getRootProps()}
            className={isDragActive ? "zone active" : "zone"}
          >
            <BsUpload /> Arraste a imagem da sua comunidade aqui <br /> Tamanho
            máximo permitido 10MB
          </div>
          <input {...getInputProps()} name="image" />
          <ul>
            {uploadFiles.map((file) => (
              <li key={file.public_id}>
                <Image
                  cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
                  publicId={file.public_id}
                  width="50"
                  height="50"
                  crop="fill"
                />
                <div>
                  <span className="name-image">{`${file.original_filename}.${file.format}`}</span>
                  <span>{`${file.bytes} bytes`}</span>
                </div>
                <CircularProgress variant="determinate" value={progress} />
              </li>
            ))}
          </ul>
        </DropZone>
      </>
    );
  }

  const screen = {
    community: "COMMUNITY",
    scrap: "SCRAP",
    testimonial: "TESTIMONIAL",
  };
  const [widget, setWidget] = useState("");
  const [active, setActive] = useState(0);
  function handleClick(index) {
    setActive(index);
  }

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea">
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div>
          <Box>
            <h1 className="title">Bem vindo(a), {githubUser}</h1>
            <span style={{fontWeight: "bold"}}>Conselho do dia: </span>
            {advice}
            <OrkutNostalgicIconSet
              scraps={
                recados.filter((item) => item.messageTo === githubUser).length
              }
            ></OrkutNostalgicIconSet>
          </Box>
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <div className="actionButtons">
              <button
                className={active === 1 ? "active" : ""}
                onClick={() => {
                  handleClick(1);
                  setWidget(screen.community);
                }}
                type="button"
              >
                Criar Comunidade
              </button>
              <button
                className={active === 2 ? "active" : ""}
                onClick={() => {
                  handleClick(2);
                  setWidget(screen.scrap);
                }}
                type="button"
              >
                Deixar um scrap
              </button>
              <button
                className={active === 3 ? "active" : ""}
                onClick={() => {
                  handleClick(3);
                  setWidget(screen.testimonial);
                }}
                type="button"
              >
                Escrever Depoimento
              </button>
            </div>
            {widget === "COMMUNITY" && (
              <form
                id="community"
                onSubmit={function handleCriarComunidade(e) {
                  e.preventDefault();
                  const dadosForm = new FormData(e.target);
                  const comunidade = {
                    title: dadosForm.get("title"),
                    imageUrl: images,
                    creatorSlug: githubUser,
                  };

                  fetch("/api/comunidades", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(comunidade),
                  }).then(async (res) => {
                    const dados = await res.json();
                    const novaComunidade = dados.criarRegistro;
                    const comunidadesAtualizadas = [
                      ...comunidades,
                      novaComunidade,
                    ];
                    setComunidades(comunidadesAtualizadas);
                    document.getElementById("community").reset();
                    setUploadFiles([]);
                  });
                }}
              >
                <div>
                  <input
                    type="text"
                    name="title"
                    required
                    aria-label="Qual vai ser o nome da sua comunidade?"
                    placeholder="Qual vai ser o nome da sua comunidade?"
                  />
                </div>
                <div>
                  <MyDropzone></MyDropzone>
                  <button disabled={images.length === 0 ? true : false}>
                    Criar comunidade
                  </button>
                </div>
              </form>
            )}
            {widget === "SCRAP" && <WidgetScrap></WidgetScrap>}
            {widget === "TESTIMONIAL" && <WidgetTestimony></WidgetTestimony>}
          </Box>
          <ScrapList>
            <h3 className="scrap__header">Seus scraps</h3>
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
        </div>
        <div>
          <BoxRelations title="Meus Seguidores" items={seguidores} />
          <CommunityRelations title="Minhas Comunidades" items={comunidades} />
        </div>
      </MainGrid>
    </>
  );
}
