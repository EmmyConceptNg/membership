import { Helmet } from 'react-helmet-async';

import EcommerceAccountOrdersView from 'src/sections/_ecommerce/view/ecommerce-account-orders-view';

// ----------------------------------------------------------------------

export default function EcommerceAccountOrdersPage() {
  return (
    <>
      <Helmet>
        <title>Account: Orders</title>
      </Helmet>

      <EcommerceAccountOrdersView />
    </>
  );
}
