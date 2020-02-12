/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import InputFormField from '../common/InputFormField';
import BtnBar from '../common/BtnBar';
import './Loan.scss';

const LOAN_TERMS_LIST = [
  { name: 12, value: 12 },
  { name: 24, value: 24 },
  { name: 36, value: 36 },
  { name: 48, value: 48 },
  { name: 72, value: 72 },
  { name: 84, value: 84 },
];
const CREDIT_SCORE_LIST = [
  { name: '600', value: 600 },
  { name: '650', value: 650 },
  { name: '700', value: 700 },
  { name: '750', value: 750 },
  { name: '800', value: 800 },
  { name: '850', value: 850 },
  { name: '900', value: 900 },
];

class Loan extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const {
      loanTerm,
      tradeIn,
      homeZipCode,
      downPayment,
      onChangeProp,
      apr,
      creditScore,
      msrp,
    } = this.props;
    return (
      <div className="loan">
        <BtnBar
          itemsList={LOAN_TERMS_LIST}
          currentItem={loanTerm}
          label="Term (Months)"
          name="loanTerm"
          onClickBtn={onChangeProp}
        />
        <InputFormField label="Home Zip Code" row name="homeZipCode" value={homeZipCode} onChangeValue={onChangeProp} />
        <InputFormField
          label="Trade-In Value"
          mask="$"
          row
          name="tradeIn"
          value={tradeIn}
          onChangeValue={onChangeProp}
          rules={
            [(value) => (+value < msrp * 0.75),
              'Only $18,377 has been applied to the payment, which is the maximum allowed 70% of the msrp price']
          }
        />
        <InputFormField
          label="Down Payment"
          row
          mask="$"
          name="downPayment"
          value={downPayment}
          onChangeValue={onChangeProp}
        />
        <BtnBar
          label="Approx. Credit Score"
          name="creditScore"
          itemsList={CREDIT_SCORE_LIST}
          currentItem={creditScore}
          onClickBtn={onChangeProp}
        />
        <InputFormField
          label="Estimated APR"
          row
          maskPos="right"
          mask="%"
          name="apr"
          value={apr}
          onChangeValue={onChangeProp}
        />
      </div>
    );
  }
}

Loan.propTypes = {
  homeZipCode: PropTypes.number.isRequired,
  downPayment: PropTypes.number.isRequired,
  tradeIn: PropTypes.number.isRequired,
  creditScore: PropTypes.number.isRequired,
  loanTerm: PropTypes.number.isRequired,
  apr: PropTypes.number.isRequired,
  msrp: PropTypes.number.isRequired,
  onChangeProp: PropTypes.func.isRequired,
};

export default Loan;
