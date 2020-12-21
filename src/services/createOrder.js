import { post } from "axios";
import jsontoxml from "jsontoxml";

const blingApiKey = process.env.BLING_API_KEY;
import bling_api_url from "../config/bling";

export async function create(deals) {
  const orders = deals.map(async (deal) => {
    const xml = jsontoxml(
      {
        pedido: [
          {
            name: "cliente",
            children: [
              {
                name: "nome",
                text: deal.org_id.name ? deal.org_id.name : "Company",
              },
              { name: "tipoPessoa", text: "J" },
              { name: "endereco", text: "Av. Paulista" },
              { name: "ie_rg", text: "3067663210" },
              { name: "numero", text: "1200" },
              { name: "bairro", text: "Bela Vista" },
              { name: "cep", text: "01310-100" },
              { name: "cidade", text: "Sao Paulo" },
              { name: "uf", text: "SP" },
              { name: "fone", text: "5481153381" },
              {
                name: "email",
                text: deal.creator_user_id.email || "company@gmail.com",
              },
            ],
          },
          {
            name: "transporte",
            children: [
              { name: "transportadora", text: "Transportadora XYZ" },
              { name: "tipo_frete", text: "R" },
              { name: "servico_correios", text: "SEDEX - CONTRATO" },
              {
                name: "dados_etiqueta",
                children: [
                  { name: "nome", text: "Endereco de entrega" },
                  { name: "endereco", text: "Rua Visconde de Sao Gabriel" },
                  { name: "numero", text: "392" },
                  { name: "complemento", text: "Sala 59" },
                  { name: "municipio", text: "Bento Goncalves" },
                  { name: "uf", text: "RS" },
                  { name: "cep", text: "95.700-000" },
                  { name: "cidade", text: "Cidade Alta" },
                ],
              },
              {
                name: "volumes",
                children: [
                  {
                    name: "volume",
                    children: [
                      {
                        name: "servico",
                        text: "SEDEX - CONTRATO",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "itens",
            children: [
              {
                name: "item",
                children: [
                  { name: "codigo", text: 1 },
                  { name: "descricao", text: "Won deal" },
                  { name: "un", text: "Un" },
                  { name: "qtde", text: 1 },
                  { name: "vlr_unit", text: deal.value || 0 },
                ],
              },
            ],
          },
          {
            name: "parcelas",
            children: [
              {
                name: "parcela",
                children: [
                  {
                    name: "vlr",
                    text: deal.value || 0,
                  },
                ],
              },
            ],
          },
        ],
      },
      false
    );

    try {
      const orderData = await post(
        `${bling_api_url}/pedido/json/?apikey=${blingApiKey}&xml=${xml}`
      );

      const { pedido } = orderData.data.retorno.pedidos[0];

      pedido.value = deal.value;
      pedido.orgName = deal.org_id.name;

      return pedido;
    } catch (error) {
      console.log(error);
    }
  });

  const CreatedOrders = await Promise.all(orders).then((res) => {
    const response = [res[res.length - 1]];
    return response;
  });

  return CreatedOrders;
}
