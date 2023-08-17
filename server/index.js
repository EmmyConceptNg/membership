import express from 'express';
const app = express();
import * as dotenv from 'dotenv';
import cors from 'cors';

import Stripe from 'stripe';

const stripe = new Stripe('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

dotenv.config();

app.use(
  cors({
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
  })
);

app.use(express.json());

let success_url = '';
let cancel_url = '';

if (window.location.hostname === 'localhost') {
  success_url = 'http://localhost:3000';
  cancel_url = 'http://localhost:3000';
} else {
  success_url = 'http://localhost:3000';
  cancel_url = 'http://localhost:3000';
}

app.post('/api/webchatpay', (req, res) => {
  stripe.checkout.sessions
    .create({
      payment_method_types: ['card'],
      payment_method_types: ['wechat_pay', 'alipay'],

      // or you can take multiple payment methods with
      // payment_method_types: ['card', 'wechat_pay', ...]

      // Specify the client (currently, Checkout only supports a client value of "web")
      payment_method_options: {
        wechat_pay: {
          client: 'web',
        },
      },
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'T-shirt',
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: success_url,
      cancel_url: cancel_url,
    })
    .then((response) => res.status(200).json(response))
    .catch((err) => res.status(500).json(err));
});

const port = 2000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
