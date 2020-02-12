import React from 'react';
import PropTypes from 'prop-types';

import Spinner from '../Spinner';

import './Payment.scss';

const Payment = ({ payment, isCalculate }) => (
  <div className="payment">
    {
      isCalculate ? (
        <p className="payment__text">
          $
          {payment}
          <span className="payment__term">/mo</span>
        </p>
      ) : <Spinner />
    }
  </div>
);

Payment.propTypes = {
  isCalculate: PropTypes.bool.isRequired,
  payment: PropTypes.number.isRequired,
};

export default Payment;
