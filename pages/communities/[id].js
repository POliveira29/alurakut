import {useContext, useState, useEffect} from "react";
import {useRouter} from "next/router";
import {AlurakutMenu} from "../../src/lib/AlurakutCommons";
import MainGrid from "../../src/components/MainGrid";
import Box from "../../src/components/Box";
import LoginContext from "../../src/contexts/LoginContext";

export default function communityPage() {
  const githubUser = useContext(LoginContext)[0];
  const [comunidade, setComunidade] = useState([]);

  const router = useRouter();
  useEffect(function () {
    fetch("https://graphql.datocms.com/", {
      method: "POST",
      headers: {
        Authorization: "3f13d39984bc0daeee485665a2fdde",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `query MyQuery {
          community(filter: {id: {eq: ${router.query.id}}}){
            title,
            imageUrl,
          }
        }`,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setComunidade(res.data.community);
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
          <img src={comunidade.imageUrl} alt="Banner Comunidade" />
          <hr />
          <p>{comunidade.title}</p>
        </div>
        <Box></Box>
      </MainGrid>
    </>
  );
}
