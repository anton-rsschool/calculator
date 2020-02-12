import React from 'react';
import PropTypes from 'prop-types';

import Payment from '../common/Payment';
import './TabsNav.scss';

const TabsNav = ({
  activeTab,
  onChangeTab,
  loanPayment,
  leasePayment,
  isCalculate,
}) => (
  <div className="tabs-nav">
    <button
      className={`tabs-nav__button${activeTab === 'loan' ? ' tabs-nav__button--active' : ''}`}
      type="button"
      onClick={() => { onChangeTab('loan'); }}
    >
      <p className="tabs-nav__title">Est. Loan:</p>
      <Payment payment={loanPayment} isCalculate={isCalculate} />
    </button>
    <button
      className={`tabs-nav__button${activeTab === 'lease' ? ' tabs-nav__button--active' : ''}`}
      type="button"
      onClick={() => { onChangeTab('lease'); }}
    >
      <p className="tabs-nav__title">Est. Lease:</p>
      <Payment payment={leasePayment} isCalculate={isCalculate} />
    </button>
  </div>
);

TabsNav.propTypes = {
  activeTab: PropTypes.string.isRequired,
  loanPayment: PropTypes.number.isRequired,
  leasePayment: PropTypes.number.isRequired,
  isCalculate: PropTypes.bool.isRequired,
  onChangeTab: PropTypes.func.isRequired,
};

export default TabsNav;
