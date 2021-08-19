import {SiteClient} from "datocms-client";

export default async function recebedorRequest(req, res) {
  if (req.method === "POST") {
    const TOKEN = "3144e159582c8af3f923819498b6b2";
    const client = new SiteClient(TOKEN);

    //O ideal seria Validar o dado utilizando o DTO(Data Transfer Object), antes de cadastrar
    const criarRegistro = await client.items.create({
      itemType: "1084038", // ID do Model de "Depoimento" criado pelo Dato
      ...req.body,
    });
    console.log(process.env.NEXT_PUBLIC_SCRAP_MODEL_KEY);
    res.json({
      dados: "Dado",
      criarRegistro: criarRegistro,
    });
    return;
  }
  res.status(404).json({
    message: "Erro",
  });
}
