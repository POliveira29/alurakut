import {useState, useEffect, useContext} from "react";
import LoginContext from "../../contexts/LoginContext";
import Box from "../Box";

function WidgetScrap() {
  const [recados, setRecados] = useState([]);
  const githubUser = useContext(LoginContext)[0];
  const [messageTo, setMessageTo] = useState("");
  return (
    <Box>
      <form
        id="scraps"
        onSubmit={async function handleCriarScrap(e) {
          e.preventDefault();
          const dadosForm = new FormData(e.target);
          const scrap = {
            messageTo: dadosForm.get("messageTo"),
            scrap: dadosForm.get("scrap"),
            messageFrom: githubUser,
          };

          const scrapResponse = await fetch("/api/recados", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(scrap),
          });
          if (scrapResponse.ok) {
            const novoRecado = await scrapResponse.json();
            const scrapAtualizado = [...recados, novoRecado];
            setRecados(scrapAtualizado);
            document.getElementById("scraps").reset();
          }
        }}
      >
        <div>
          <input
            type="text"
            name="messageTo"
            required
            aria-label="Para quem será o recado?"
            placeholder="Para quem será o recado?"
            onChange={(evento) => {
              setMessageTo(evento.target.value);
            }}
          />
          <textarea
            name="scrap"
            id="scrap"
            cols="30"
            rows="6"
            maxLength="200"
            required
            placeholder="Digite seu recado"
          ></textarea>
        </div>
        <div>
          <button disabled={messageTo.length === 0 ? true : false}>
            Enviar scrap
          </button>
        </div>
      </form>
    </Box>
  );
}

export default WidgetScrap;
