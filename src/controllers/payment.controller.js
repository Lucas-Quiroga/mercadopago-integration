import mercadopago from "mercadopago";
import { MERCADOPAGO_API_KEY } from "../config.js";

export const createOrder = async (req, res) => {
  mercadopago.configure({
    access_token: MERCADOPAGO_API_KEY,
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
      "https://3c72-2802-8010-8b3c-9000-f941-88aa-1c0c-9e61.ngrok.io/webhook",
  });

  console.log(JSON.stringify(result.body, null, 2));

  res.send(result.body);
};

export const receiveWebHook = async (req, res) => {
  const payment = req.query;

  try {
    if (payment.type === "payment") {
      const data = await mercadopago.payment.findById(payment["data.id"]);
      console.log(data);
      //store in database
    }
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500).json({ error: error.message });
  }
};
