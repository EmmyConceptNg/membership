import express from 'express';
const app = express();
import * as dotenv from 'dotenv';
import cors from 'cors';
import os from 'os';

import Stripe from 'stripe';

const stripe = new Stripe(
  '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'
);

dotenv.config();

app.use(
  cors({
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
  })
);

app.use(express.json());

app.post('/api/webchatpay', (req, res) => {
  let success_url = '';
  let cancel_url = '';
  if (os.hostname() === 'localhost') {
    success_url = 'http://localhost:3000';
    cancel_url = 'http://localhost:3000';
  } else {
    success_url = 'https://elite-house.vercel.app';
    cancel_url = 'https://elite-house.vercel.app';
  }
  stripe.checkout.sessions
    .create({
      payment_method_types: ['card'],
      // payment_method_types: ['card', 'wechat_pay', 'alipay'],

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
            currency: 'cny',
            product_data: {
              name: 'Membership Fee',
            },
            unit_amount: 200000,
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
