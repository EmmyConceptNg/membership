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
  const basicLicense = plan.license === '加入';

  const starterLicense = plan.license === 'Starter';

  const premiumLicense = plan.license === 'Premium';

  const [open, setOpen] = useState(false);

  const [btnLoad, setBtnLoad] = useState(false);
  const handlePayment = () => {
    setBtnLoad(true);
    axios
      .post('/api/webchatpay', {}, { headers: { 'Content-Type': 'application/json' } })
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
        ...(starterLicense && {
          boxShadow: (theme) => ({ md: theme.customShadows.z24 }),
        }),
      }}
    >
      {open && <ButtonWithModal open={open} setOpen={setOpen} />}
      {starterLicense && (
        <Label color="info" sx={{ position: 'absolute', top: 24, left: 32 }}>
          POPULAR
        </Label>
      )}

      <Stack direction="row" justifyContent="space-between">
        <div>
          <Typography variant="h4" component="div" sx={{ color: 'primary.main', mb: 2 }}>
            加入{/* {plan.license} */}
          </Typography>

          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Typography variant="h3" component="span">
              ¥ 2,000
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
        onClick={handlePayment}
        fullWidth
        size="large"
        color={(premiumLicense && 'primary') || 'inherit'}
        variant={(basicLicense && 'outlined') || 'contained'}
      >
        付款
      </LoadingButton>
    </Card>
  );
}

PricingMarketingCard.propTypes = {
  plan: PropTypes.shape({
    caption: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    license: PropTypes.string,
    options: PropTypes.array,
    price: PropTypes.string,
  }),
};
