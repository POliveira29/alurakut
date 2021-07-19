import {SiteClient} from "datocms-client";

export default async function recebedorRequest(req, res) {
  if (req.method === "POST") {
    const token = "3144e159582c8af3f923819498b6b2";
    const client = new SiteClient(token);

    //O ideal seria Validar o dado utilizando o DTO(Data Transfer Object), antes de cadastrar

    const criarRegistro = await client.items.create({
      itemType: "972261", // ID do Model de "Communities" criado pelo Dato
      ...req.body,
    });
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
