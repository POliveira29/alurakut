import {useContext, useState, useEffect} from "react";
import {AlurakutMenu} from "../../src/lib/AlurakutCommons";
import MainGrid from "../../src/components/MainGrid";
import Box from "../../src/components/Box";
import LoginContext from "../../src/contexts/LoginContext";

export default function communityPage() {
  const githubUser = useContext(LoginContext)[0];
  const [comunidades, setComunidades] = useState([]);
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
      .then((res) => res.json())
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
          <img src={``} alt="Banner Comunidade" />
          <hr />
          <p>
            <a className="boxLink" href={``}>
              {}
            </a>
          </p>
        </div>
        <Box></Box>
      </MainGrid>
    </>
  );
}
