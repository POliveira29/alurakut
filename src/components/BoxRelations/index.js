import {useContext} from "react";
import {ProfileRelationsBoxWrapper} from "../ProfileRelations";
import LoginContext from "../../contexts/LoginContext";
import NextLink from "next/link";

function BoxRelations(props) {
  const githubUser = useContext(LoginContext)[0];
  const qtdFriends = props.items
    .filter((qtd) => qtd.creatorSlug === githubUser)
    .map((qtd) => qtd.id);
  function Link({href, children, ...props}) {
    return (
      <NextLink href={href} passHref>
        <a {...props}>{children}</a>
      </NextLink>
    );
  }
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {props.title} ({props.items.length})
      </h2>
      <ul>
        {props.items.slice(0, 6).map((itemAtual) => {
          return (
            <li key={itemAtual.id}>
              <Link href={`/users/${itemAtual.login}`}>
                <img src={`${itemAtual.avatar_url}`} alt="Foto Usuário" />
                <span>{itemAtual.login}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      {props.items.length > 6 ? (
        <>
          <hr />
          <Link href="/friends">Ver todos</Link>
        </>
      ) : (
        ""
      )}
    </ProfileRelationsBoxWrapper>
  );
}

export default BoxRelations;
