import {useState, useEffect, useContext} from "react";
import {AlurakutMenu} from "../src/lib/AlurakutCommons";
import ProfileSidebar from "../src/components/ProfileSidebar";
import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import WrapperHeader from "../src/components/WrapperHeader";
import {WrapperList} from "../src/components/WrapperList";
import LoginContext from "../src/contexts/LoginContext";

export default function Friends() {
  const githubUser = useContext(LoginContext)[0];
  const [seguidores, setSeguidores] = useState([]);
  let {query} = useRouter();
  useEffect(function () {
    // Pegar o array de dados do Github
    fetch(`https://api.github.com/users/${githubUser}/followers`)
      .then(function (res) {
        return res.json();
      })
      .then(function (resJson) {
        setSeguidores(resJson);
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
          <WrapperHeader title="Meus Amigos" items={seguidores}></WrapperHeader>
          <WrapperList>
            <ul className="list__items">
              {seguidores.map((itemAtual) => {
                query = itemAtual.id;
                return (
                  <li key={itemAtual.id}>
                    <a
                      href={`https://github.com/${itemAtual.login}`}
                      target="_blank"
                    >
                      <img
                        className="list__image"
                        src={`${itemAtual.avatar_url}`}
                        alt="Foto Usuário"
                      />
                    </a>
                    <div>
                      <span>{itemAtual.login}</span>
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
