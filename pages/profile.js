import {useContext, useState, useEffect} from "react";
import {AlurakutMenu} from "../src/lib/AlurakutCommons";
import ProfileSidebar from "../src/components/ProfileSidebar";
import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import LoginContext from "../src/contexts/LoginContext";

export default function personFav() {
  const githubUser = useContext(LoginContext)[0];
  const [profile, setProfile] = useState([]);
  useEffect(function () {
    // Pegar o array de dados do Github
    fetch(`https://api.github.com/users/${githubUser}`)
      .then(function (res) {
        return res.json();
      })
      .then(function (resJson) {
        setProfile(resJson);
      });
  }, []);

  // const MAX_ITEMS = 6;
  // const MAX_LEFT = (MAX_ITEMS - 1) / 2;

  // const Pagination = ({limit, total, offset}) => {
  //   const current = offset ? offset / limit + 1 : 1;
  //   const pages = Math.ceil(total / limit);
  //   const first = Math.max(current - MAX_LEFT, 1);

  //   return (
  //     <ul>
  //       {Array.from({length: MAX_ITEMS}).map((_, index) => index + first)}
  //     </ul>
  //   );
  // };

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea">
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <Box>
          <h2 className="smallTitle">Meu Perfil</h2>
          <ul className="profile__info">
            <li className="info-item">
              <span>Nome:</span>
              <span>{profile.name}</span>
            </li>
            <li className="info-item">
              <span>cidade natal:</span>
              <span>{profile.location}</span>
            </li>
            <li className="info-item">
              <span>quem sou eu:</span>
              <span>{profile.bio}</span>
            </li>
          </ul>
          {/* <Pagination /> */}
        </Box>
      </MainGrid>
    </>
  );
}
