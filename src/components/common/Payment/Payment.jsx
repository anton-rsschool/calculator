import React from 'react';
import PropTypes from 'prop-types';

import './Payment.scss';

const Payment = ({ payment }) => (
  <div className="payment">
    <p className="payment__text">
      $
      {payment}
      <span className="payment__term">/mo</span>
    </p>
  </div>
);

Payment.propTypes = {
  payment: PropTypes.number.isRequired,
};

export default Payment;
