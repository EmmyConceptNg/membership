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

      <Stack spacing={2} sx={{ my: 5 }}>
        <Stack direction="row" alignItems="center" sx={{ typography: 'body2' }}>
          <Iconify icon="carbon:checkmark" sx={{ mr: 2, color: 'primary.main' }} />
          公司会员” 现階段只接受香港、新加坡、英国、加拿大公司申请
        </Stack>
        <Stack direction="row" alignItems="center" sx={{ typography: 'body2' }}>
          <Iconify icon="carbon:checkmark" sx={{ mr: 2, color: 'primary.main' }} />
          如早鸟会员最终未能成功申请新加坡数字银行账户，可选择全额退款或将名额转让他人一次(再次不成功，将自动退款)
        </Stack>
        <Stack direction="row" alignItems="center" sx={{ typography: 'body2' }}>
          <Iconify icon="carbon:checkmark" sx={{ mr: 2, color: 'primary.main' }} />
          MasterCard设计已交由新加坡金管局(MAS)审批，预计数星期內完成，最终获批设计或有出入，早鸟会员敬请留意
        </Stack>
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
