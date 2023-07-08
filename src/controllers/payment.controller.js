import mercadopago from "mercadopago";

export const createOrder = async (req, res) => {
  mercadopago.configure({
    sandbox: true,
    access_token: "",
  });

  const result = await mercadopago.preferences.create({
    items: [
      {
        title: "notebook",
        unit_price: 500,
        currency_id: "ARS",
        quantity: 1,
      },
    ],
    back_urls: {
      success: "http://localhost:4000/success",
      failure: "http://localhost:4000/failure",
      pending: "http://localhost:4000/pending",
    },
    notification_url:
      "https://ddce-2802-8010-8b48-f700-3729-f4a-2edf-6234.sa.ngrok.io/webhook",
  });

  console.log(result.body);

  res.send(result.body);
};

export const receiveWebHook = (req, res) => {
  console.log(req.query);

  res.send("webhook");
};
