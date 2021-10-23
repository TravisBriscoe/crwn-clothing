import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_51JKZlYKI1SONGz0zV6nUfD99K08mTxL8KfqQgtOdLL1pWnkefrDLtBmOSNDAk6IvOkRFnSS2rNDJVXFKZ8VtsPwN009rIqGga9';

  const onToken = token => {
    axios({
      url: 'payment',
      method: 'post',
      data: {
        amount: priceForStripe,
        token,
      }
    }).then(response => {
      alert('Payment Successful!')
    }).catch(err => {
      console.log('Payment Error!', JSON.parse(err));
      alert('There was an issue with your payment. Please check your card and try again.');
    });
  }

  return (
    <StripeCheckout
      label='Pay Now'
      name='CRWN Clothing'
      billingAddress
      shippingAddress
      bitcoin
      image='/favicon.ico'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  )
}

export default StripeCheckoutButton;