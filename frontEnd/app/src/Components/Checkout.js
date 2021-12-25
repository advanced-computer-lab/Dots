import React from 'react';
import ReactDOM from 'react-dom';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import CheckoutForm from './CheckoutForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51K7gFNGx4Kq2M7uIpIsajPEPsFyqwWtLdtISMkVByD2LZ0usPN2ecSMv1f0hOppP2Dk4NdNpVUZOHJhTMBzf7ibc00RA25Ghxw');

const Checkout = () =>
 { const options = {
    // passing the client secret obtained in step 2
    clientSecret: 'pi_3KA7rzGx4Kq2M7uI1MDWdc6n_secret_0HAvarV7ohUYHPLCqfS35QlNc',
    // appearance: {/*...*/},
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
};



export default Checkout;