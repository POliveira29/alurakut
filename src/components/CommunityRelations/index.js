import {useContext} from "react";
import {ProfileRelationsBoxWrapper} from "../ProfileRelations";
import LoginContext from "../../contexts/LoginContext";
import NextLink from "next/link";

function CommunityRelations(props) {
  const githubUser = useContext(LoginContext)[0];
  const qtdComunity = props.items
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
        {props.title} ({qtdComunity.length})
      </h2>
      <ul>
        {props.items
          .filter((itemAtual) => itemAtual.creatorSlug === githubUser)
          .slice(0, 6)
          .map((itemAtual) => {
            return (
              <li key={itemAtual.id}>
                <Link href={`/communities/${itemAtual.id}`}>
                  <img src={itemAtual.imageUrl} alt={itemAtual.title} />
                  <span>{itemAtual.title}</span>
                </Link>
              </li>
            );
          })}
      </ul>
      {props.items.length > 6 ? (
        <>
          <hr />
          <Link href="/communities">Ver todos</Link>
        </>
      ) : (
        ""
      )}
    </ProfileRelationsBoxWrapper>
  );
}

export default CommunityRelations;
