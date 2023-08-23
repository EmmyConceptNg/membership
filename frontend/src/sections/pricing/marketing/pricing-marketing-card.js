import { useState } from 'react';
import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { LoadingButton } from '@mui/lab';
import Typography from '@mui/material/Typography';

import axios from 'src/api/axios';
import Image from 'src/components/image';
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import ButtonWithModal from 'src/sections/_marketing/utils/modal';

// ----------------------------------------------------------------------

export default function PricingMarketingCard({ plan }) {
  const [open, setOpen] = useState(false);

  const [btnLoad, setBtnLoad] = useState(false);
  const handlePayment = (price, name) => {
    setBtnLoad(true);
    axios
      .post('/api/webchatpay', { price, name }, { headers: { 'Content-Type': 'application/json' } })
      .then((response) => {
        window.location.href = response.data.url;
        console.log(response.data.url);
        setBtnLoad(false);
      })
      .catch((err) => {
        console.log(err);
        setBtnLoad(false);
      });
  };

  return (
    <Card
      sx={{
        p: 5,
        pt: 8,
        boxShadow: (theme) => ({ md: theme.customShadows.z8 }),
      }}
    >
      <Stack direction="row" justifyContent="space-between">
        <div>
          <Typography variant="h4" component="div" sx={{ color: 'primary.main', mb: 2 }}>
            {plan.name}
          </Typography>

          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Typography variant="h3" component="span">
              ¥ {plan.price}
            </Typography>
            {/* <Typography variant="h5" component="span" sx={{ color: 'text.disabled' }}>
              /mo
            </Typography> */}
          </Stack>
        </div>

        <Image alt="icon" src={plan.icon} sx={{ width: 64, height: 64 }} />
      </Stack>

     

      <LoadingButton
        loading={btnLoad}
        onClick={() => handlePayment(plan?.price, plan?.name)}
        fullWidth
        size="large"
        color={(plan?.name === '普通会员' && 'primary') || 'inherit'}
        variant={(plan?.name === '普通会员' && 'outlined') || 'contained'}
      >
        登记
      </LoadingButton>
    </Card>
  );
}

PricingMarketingCard.propTypes = {
  plan: PropTypes.shape({
    caption: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    name: PropTypes.string,
    options: PropTypes.array,
    price: PropTypes.string,
  }),
};
