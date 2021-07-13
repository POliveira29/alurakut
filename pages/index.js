import {AlurakutMenu, OrkutNostalgicIconSet} from "../src/lib/AlurakutCommons";

import Box from "../src/components/Box";
import MainGrid from "../src/components/MainGrid";
import {ProfileRelationsBoxWrapper} from "../src/components/ProfileRelations";

function ProfileSidebar(props) {
  return (
    <Box>
      <img
        src={`http://github.com/${props.githubUser}.png`}
        alt="Foto Usuário"
      />
    </Box>
  );
}

export default function Home() {
  const githubUser = "POliveira29";
  const pessoasFavoritas = [
    "rafaballerini",
    "peas",
    "omariosouto",
    "felipefialho",
  ];
  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea">
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div>
          <Box>
            <h1 className="title">Bem vindo(a)</h1>
            <OrkutNostalgicIconSet></OrkutNostalgicIconSet>
          </Box>
          <Box>Ações</Box>
        </div>
        <div>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da Comunidade ({pessoasFavoritas.length})
            </h2>

            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li>
                    <a href={`/users/${itemAtual}`} key={itemAtual}>
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
        </div>
      </MainGrid>
    </>
  );
}
