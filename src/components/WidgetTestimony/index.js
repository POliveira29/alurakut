import {useState, useEffect, useContext} from "react";
import LoginContext from "../../contexts/LoginContext";
import Box from "../Box";

function WidgetTestimony() {
  const [depoimento, setDepoimento] = useState([]);
  const githubUser = useContext(LoginContext)[0];
  const [messageTo, setMessageTo] = useState("");
  return (
    <Box>
      <form
        id="testimony"
        onSubmit={async function handleCriarDepoimento(e) {
          e.preventDefault();
          const dadosForm = new FormData(e.target);
          const testimony = {
            messageTo: dadosForm.get("messageTo"),
            testimony: dadosForm.get("testimony"),
            messageFrom: githubUser,
          };

          const testimonyRes = await fetch("/api/depoimento", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(testimony),
          });
          if (testimonyRes.ok) {
            const novoDepoimento = await testimonyRes.json();
            const DepoimentoAtualizado = [...depoimento, novoDepoimento];
            setDepoimento(DepoimentoAtualizado);
            e.target.reset();
          }
        }}
      >
        <div>
          <input
            type="text"
            name="messageTo"
            required
            aria-label="Escrever um depoimento para?"
            placeholder="Escrever um depoimento para?"
            onChange={(evento) => {
              setMessageTo(evento.target.value);
            }}
          />
          <textarea
            name="testimony"
            id="testimony"
            cols="30"
            rows="6"
            maxLength="200"
            required
            placeholder="Sua mensagem aqui"
          ></textarea>
        </div>
        <div>
          <button disabled={messageTo.length === 0 ? true : false}>
            Postar
          </button>
        </div>
      </form>
    </Box>
  );
}

export default WidgetTestimony;
