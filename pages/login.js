import {useContext, useState} from "react";
import {useRouter} from "next/router";
import nookies from "nookies";
import jwt from "jsonwebtoken";

import LoginContext from "../src/contexts/LoginContext";

export default function LoginPage() {
  const router = useRouter();
  const [userExist, setUserExist] = useState(true);
  const [githubUser, setGithubUser] = useContext(LoginContext);

  return (
    <main
      style={{
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="loginScreen">
        <section className="logoArea">
          <img src="https://alurakut.vercel.app/logo.svg" />
          <p>
            <strong>Conecte-se</strong> aos seus amigos e familiares usando
            recados e mensagens instantâneas
          </p>
          <p>
            <strong>Conheça</strong> novas pessoas através de amigos de seus
            amigos e comunidades
          </p>
          <p>
            <strong>Compartilhe</strong> seus vídeos, fotos e paixões em um só
            lugar
          </p>
        </section>

        <section className="formArea">
          <form
            className="box"
            onSubmit={(evento) => {
              evento.preventDefault();
              setUserExist(true);

              fetch("https://alurakut.vercel.app/api/login", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({githubUser: githubUser}),
              }).then(async (res) => {
                const dados = await res.json();

                const {isAuthenticated} = await fetch("/api/autenticacao", {
                  headers: {
                    Authorization: dados.token,
                  },
                }).then((res) => res.json());

                if (isAuthenticated) {
                  nookies.set(null, "token", dados.token, {
                    path: "/",
                    maxAge: 86400 * 7,
                  });
                  router.push("/");
                  return;
                }
                setUserExist(false);
              });
            }}
          >
            <p>
              Acesse agora mesmo com seu usuário do <strong>GitHub</strong>!
            </p>
            <input
              placeholder="Usuário"
              value={githubUser}
              required
              onChange={(evento) => {
                setGithubUser(evento.target.value);
              }}
            />
            {githubUser.length === 0 ? "Preencha o campo" : ""}
            {!userExist && (
              <span
                style={{fontSize: "13px", color: "red", marginBottom: "12px"}}
              >
                Este usuário é inválido! Tente novamente
              </span>
            )}
            <button
              className={githubUser.length === 0 ? "disabled" : "enabled"}
              type="submit"
              disabled={githubUser.length === 0 ? true : false}
            >
              Login
            </button>
          </form>

          <footer className="box">
            <p>
              Ainda não é membro? <br />
              <a href="/login">
                <strong>ENTRAR JÁ</strong>
              </a>
            </p>
          </footer>
        </section>

        <footer className="footerArea">
          <p>
            © 2021 alura.com.br - <a href="/">Sobre o Orkut.br</a> -{" "}
            <a href="/">Centro de segurança</a> - <a href="/">Privacidade</a> -{" "}
            <a href="/">Termos</a> - <a href="/">Contato</a>
          </p>
        </footer>
      </div>
    </main>
  );
}

// export async function getServerSideProps(context) {
//   const cookies = nookies.get(context);
//   const token = cookies.token;
//   // Destruction
//   const {githubUser} = jwt.decode(token);

//   const {isAuthenticated} = await fetch(
//     "https://alurakut.vercel.app/api/auth",
//     {
//       headers: {
//         Authorization: token,
//       },
//     }
//   ).then((res) => res.json());
//   if (!isAuthenticated) {
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {
//       githubUser: githubUser,
//     }, // will be passed to the page component as props
//   };
// }
