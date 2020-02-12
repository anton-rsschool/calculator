/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import InputFormField from '../common/InputFormField';
import SelectFormField from '../common/SelectFormField';
import './Lease.scss';

class Lease extends Component {
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
      homeZipCode, downPayment, tradeIn, creditScore, onChangeProp, leaseTerm, miles, msrp,
      validation,
    } = this.props;
    return (
      <form className="lease">
        <InputFormField label="Home Zip Code" name="homeZipCode" value={homeZipCode} onChangeValue={onChangeProp} />
        <SelectFormField
          label="Approx. Credit Score"
          name="creditScore"
          value={creditScore}
          options={[600, 650, 700, 750, 800, 850, 900]}
          onChangeProp={onChangeProp}
        />
        <InputFormField
          label="Trade-in Value"
          name="tradeIn"
          value={tradeIn}
          onChangeValue={onChangeProp}
          mask="$"
          rules={
            [(value) => (+value < msrp * 0.25),
              `Max value $${msrp * 0.25} `]
          }
          validation={validation}
        />
        <SelectFormField
          label="Term (Month)"
          name="leaseTerm"
          value={leaseTerm}
          options={[24, 36, 48]}
          onChangeProp={onChangeProp}
        />
        <InputFormField
          label="Down Payment"
          name="downPayment"
          value={downPayment}
          onChangeValue={onChangeProp}
          mask="$"
          rules={
            [(value) => (+value < msrp * 0.25),
              `Max value $${msrp * 0.25} `]
          }
          validation={validation}
        />
        <SelectFormField
          label="Annual Miles"
          name="miles"
          value={miles}
          options={[1000, 1200, 1500]}
          onChangeProp={onChangeProp}
        />
      </form>
    );
  }
}

Lease.propTypes = {
  homeZipCode: PropTypes.number.isRequired,
  downPayment: PropTypes.number.isRequired,
  tradeIn: PropTypes.number.isRequired,
  creditScore: PropTypes.number.isRequired,
  leaseTerm: PropTypes.number.isRequired,
  miles: PropTypes.number.isRequired,
  msrp: PropTypes.number.isRequired,
  onChangeProp: PropTypes.func.isRequired,
  validation: PropTypes.func.isRequired,
};

export default Lease;
