import React from 'react';
import PropTypes from 'prop-types';

import TabsNav from '../TabsNav';
import Spinner from '../common/Spinner';
import Lease from '../Lease';
import Loan from '../Loan';

import './Tabs.scss';

const Tabs = ({
  homeZipCode,
  downPayment,
  tradeIn,
  creditScore,
  leaseTerm,
  miles,
  loanTerm,
  apr,
  msrp,
  isLoaded,
  activeTab,
  onChangeTab,
  onChangeProp,
  leasePayment,
  loanPayment,
  isCalculate,
  validation,
}) => {
  let tab;
  if (activeTab === 'lease') {
    tab = (
      <Lease
        homeZipCode={homeZipCode}
        downPayment={downPayment}
        tradeIn={tradeIn}
        creditScore={creditScore}
        leaseTerm={leaseTerm}
        miles={miles}
        onChangeProp={onChangeProp}
        msrp={msrp}
        validation={validation}
      />
    );
  } else {
    tab = (
      <Loan
        homeZipCode={homeZipCode}
        downPayment={downPayment}
        tradeIn={tradeIn}
        creditScore={creditScore}
        loanTerm={loanTerm}
        apr={apr}
        msrp={msrp}
        onChangeProp={onChangeProp}
        validation={validation}
      />
    );
  }

  return (
    <div className="tabs">
      <TabsNav
        activeTab={activeTab}
        onChangeTab={onChangeTab}
        loanPayment={loanPayment}
        leasePayment={leasePayment}
        isCalculate={isCalculate}
      />
      <div className="tabs__body">
        { isLoaded
          ? tab
          : <Spinner /> }
      </div>
    </div>
  );
};

Tabs.propTypes = {
  homeZipCode: PropTypes.number.isRequired,
  downPayment: PropTypes.number.isRequired,
  tradeIn: PropTypes.number.isRequired,
  creditScore: PropTypes.number.isRequired,
  leaseTerm: PropTypes.number.isRequired,
  miles: PropTypes.number.isRequired,
  loanTerm: PropTypes.number.isRequired,
  apr: PropTypes.number.isRequired,
  msrp: PropTypes.number.isRequired,
  onChangeProp: PropTypes.func.isRequired,
  activeTab: PropTypes.string.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  isCalculate: PropTypes.bool.isRequired,
  loanPayment: PropTypes.number.isRequired,
  leasePayment: PropTypes.number.isRequired,
  onChangeTab: PropTypes.func.isRequired,
  validation: PropTypes.func.isRequired,
};

export default Tabs;
