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
      // payment_method_types: ['card'],
      payment_method_types: ['card', 'wechat_pay', 'alipay'],

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
      locale: 'zh',
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: [
          'AC',
          'AD',
          'AE',
          'AF',
          'AG',
          'AI',
          'AL',
          'AM',
          'AO',
          'AQ',
          'AR',
          'AT',
          'AU',
          'AW',
          'AX',
          'AZ',
          'BA',
          'BB',
          'BD',
          'BE',
          'BF',
          'BG',
          'BH',
          'BI',
          'BJ',
          'BL',
          'BM',
          'BN',
          'BO',
          'BQ',
          'BR',
          'BS',
          'BT',
          'BV',
          'BW',
          'BY',
          'BZ',
          'CA',
          'CD',
          'CF',
          'CG',
          'CH',
          'CI',
          'CK',
          'CL',
          'CM',
          'CN',
          'CO',
          'CR',
          'CV',
          'CW',
          'CY',
          'CZ',
          'DE',
          'DJ',
          'DK',
          'DM',
          'DO',
          'DZ',
          'EC',
          'EE',
          'EG',
          'EH',
          'ER',
          'ES',
          'ET',
          'FI',
          'FJ',
          'FK',
          'FO',
          'FR',
          'GA',
          'GB',
          'GD',
          'GE',
          'GF',
          'GG',
          'GH',
          'GI',
          'GL',
          'GM',
          'GN',
          'GP',
          'GQ',
          'GR',
          'GS',
          'GT',
          'GU',
          'GW',
          'GY',
          'HK',
          'HN',
          'HR',
          'HT',
          'HU',
          'ID',
          'IE',
          'IL',
          'IM',
          'IN',
          'IO',
          'IQ',
          'IS',
          'IT',
          'JE',
          'JM',
          'JO',
          'JP',
          'KE',
          'KG',
          'KH',
          'KI',
          'KM',
          'KN',
          'KR',
          'KW',
          'KY',
          'KZ',
          'LA',
          'LB',
          'LC',
          'LI',
          'LK',
          'LR',
          'LS',
          'LT',
          'LU',
          'LV',
          'LY',
          'MA',
          'MC',
          'MD',
          'ME',
          'MF',
          'MG',
          'MK',
          'ML',
          'MM',
          'MN',
          'MO',
          'MQ',
          'MR',
          'MS',
          'MT',
          'MU',
          'MV',
          'MW',
          'MX',
          'MY',
          'MZ',
          'NA',
          'NC',
          'NE',
          'NG',
          'NI',
          'NL',
          'NO',
          'NP',
          'NR',
          'NU',
          'NZ',
          'OM',
          'PA',
          'PE',
          'PF',
          'PG',
          'PH',
          'PK',
          'PL',
          'PM',
          'PN',
          'PR',
          'PS',
          'PT',
          'PY',
          'QA',
          'RE',
          'RO',
          'RS',
          'RU',
          'RW',
          'SA',
          'SB',
          'SC',
          'SE',
          'SG',
          'SH',
          'SI',
          'SJ',
          'SK',
          'SL',
          'SM',
          'SN',
          'SO',
          'SR',
          'SS',
          'ST',
          'SV',
          'SX',
          'SZ',
          'TA',
          'TC',
          'TD',
          'TF',
          'TG',
          'TH',
          'TJ',
          'TK',
          'TL',
          'TM',
          'TN',
          'TO',
          'TR',
          'TT',
          'TV',
          'TW',
          'TZ',
          'UA',
          'UG',
          'US',
          'UY',
          'UZ',
          'VA',
          'VC',
          'VE',
          'VG',
          'VN',
          'VU',
          'WF',
          'WS',
          'XK',
          'YE',
          'YT',
          'ZA',
          'ZM',
          'ZW',
          'ZZ',
        ],
      },
      mode: 'payment',
      phone_number_collection: {
        enabled: true,
      },
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
