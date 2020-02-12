import React from 'react';
import PropTypes from 'prop-types';

import Payment from '../common/Payment';
import './InfoCard.scss';

const InfoCard = ({
  vehicle,
  dealer,
  monthlyPayment,
  homeZipCode,
  isCalculate,
}) => {
  const { msrp, name } = vehicle;
  const { name: dealerName, phone, rating } = dealer;
  const taxes = String(homeZipCode).split('').map((item) => item * 2);
  return (
    <div className="info-card">
      <div className="info-card__field info-card__field--sep">
        <p>MSRP</p>
        <p>{`$${msrp}`}</p>
      </div>
      <div className="info-card__field">
        <p>Vehicle name</p>
        <p>{name}</p>
      </div>
      <div className="info-card__field">
        <p>Est. Loan Payment</p>
        <Payment payment={monthlyPayment} isCalculate={isCalculate} />
      </div>
      <div className="info-card__field info-card__field--sep">
        <p>Taxes</p>
        <p>{taxes}</p>
      </div>
      <div className="info-card__field">
        <p>Dealer name</p>
        <p>{dealerName}</p>
      </div>
      <div className="info-card__field">
        <p>Dealer phone:</p>
        <p>{phone}</p>
      </div>
      <div className="info-card__field">
        <p>Dealer rating:</p>
        <p>{rating}</p>
      </div>
    </div>
  );
};

InfoCard.propTypes = {
  homeZipCode: PropTypes.number.isRequired,
  monthlyPayment: PropTypes.number.isRequired,
  isCalculate: PropTypes.bool.isRequired,
  dealer: PropTypes.shape({
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
  }).isRequired,
  vehicle: PropTypes.shape({
    msrp: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default InfoCard;
