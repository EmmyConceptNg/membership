
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify/iconify';

import PlanCard from './pricing-marketing-card';

// ----------------------------------------------------------------------

const plans = [
  { name: '普通会员', price: 200000 },
  { name: '公司会员', price: 600000 },
];
export default function PricingMarketing() {
  return (
    <Container
      sx={{
        pt: 10,
        pb: { xs: 5, md: 10 },
      }}
    >
      <Stack
        spacing={5}
        alignItems={{ xs: 'center', md: 'flex-end' }}
        direction={{ xs: 'column', md: 'row' }}
        justifyContent={{ md: 'space-between' }}
        sx={{ mb: { xs: 5, md: 10 } }}
      >
        <Stack
          spacing={3}
          sx={{
            maxWidth: 480,
            mx: { xs: 'auto', md: 'unset' },
            textAlign: { xs: 'center', md: 'unset' },
          }}
        >
          <Typography variant="overline" sx={{ color: 'text.disabled' }}>
            Member
          </Typography>

          <Typography variant="h2">早鸟优惠 {/* Become a Member */}</Typography>
        </Stack>

        {/*  <Stack direction="row" alignItems="center">
          <Typography variant="overline">MONTHLY</Typography>

          <Switch defaultChecked />

          <Typography variant="overline">YEARLY (save 10%)</Typography>
        </Stack> */}
      </Stack>
      <Box
        sx={{
          gap: 4,
          display: 'grid',
          alignItems: 'center',
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            md: 'repeat(3, 1fr)',
          },
        }}
      >
        {plans.map((plan, index) => (
          <PlanCard key={index} plan={plan} />
        ))}
      </Box>
      <Box>
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
      </Box>{' '}
    </Container>
  );
}
