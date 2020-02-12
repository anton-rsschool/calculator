/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';

import { getVehicle, getDealer } from '../../service/dataService';
import getIpData from '../../service/ipService';
import { calculateLease, calculateLoan } from '../../service/calculateService';
import getCreditScoreValue from '../../utils/utils';
import Tabs from '../Tabs';
import InfoCard from '../InfoCard';
import './App.scss';


class App extends Component {
  static handleKeydown(event) {
    const { target, code } = event;
    if (code === 'Enter' && target.nodeName === 'INPUT') {
      target.blur();
    }
  }

  constructor() {
    super();
    this.state = {
      dealer: {
        name: '',
        phone: '',
        rating: '',
      },

      vehicle: {
        msrp: 0,
        name: '',
      },

      homeZipCode: 0,
      downPayment: 0,
      tradeIn: 0,
      creditScore: 750,
      loanTerm: 24,
      leaseTerm: 36,
      apr: 0,
      miles: 1200,

      activeTab: 'lease',
      isLoaded: false,
      isCalculate: false,
      loanPayment: 0,
      leasePayment: 0,
    };
    this.isValid = {};
    this.changeActiveTab = this.changeActiveTab.bind(this);
    this.changeProp = this.changeProp.bind(this);
    this.validation = this.validation.bind(this);
    document.addEventListener('keydown', App.handleKeydown);
  }

  componentDidMount() {
    this.loadState();
    Promise.all([getVehicle(), getDealer(), getIpData()])
      .then((data) => {
        const [vehicle, dealer, ip] = data;
        const { homeZipCode } = this.state;
        this.setState({
          vehicle,
          dealer,
          homeZipCode: homeZipCode || +ip.postal,
          isLoaded: true,
        });
        this.calculatePayment();
      });
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      downPayment, tradeIn, creditScore, loanTerm, leaseTerm, apr, miles,
    } = this.state;

    const {
      downPayment: newDownPayment, tradeIn: newTradeIn, creditScore: newCreditScore,
      loanTerm: newLoanTerm, leaseTerm: newLeaseTerm, apr: newApr, miles: newMiles,
    } = prevState;

    const isValid = Object.keys(this.isValid).every((key) => this.isValid[key] === true);

    const isChangePayment = downPayment !== newDownPayment || tradeIn !== newTradeIn
    || creditScore !== newCreditScore || loanTerm !== newLoanTerm || leaseTerm !== newLeaseTerm
    || apr !== newApr || miles !== newMiles;

    if (isChangePayment && isValid) {
      this.calculatePayment();
    }
    this.saveState();
  }

  validation(name, isValid) {
    this.isValid[name] = isValid;
  }

  changeProp(prop) {
    this.setState({ ...prop });
  }

  changeActiveTab(tab) {
    // eslint-disable-next-line consistent-return
    this.setState(({ activeTab }) => {
      if (tab !== activeTab) {
        this.isValid = {};
        return { activeTab: tab };
      }
    });
  }

  saveState() {
    const {
      homeZipCode, downPayment, tradeIn, creditScore, loanTerm, leaseTerm, apr, miles,
    } = this.state;
    const state = JSON.stringify({
      homeZipCode, downPayment, tradeIn, creditScore, loanTerm, leaseTerm, apr, miles,
    });
    localStorage.setItem('calculatorState', state);
  }

  loadState() {
    const state = JSON.parse(localStorage.getItem('calculatorState'));
    this.setState(state);
  }

  calculatePayment() {
    const {
      downPayment, tradeIn, creditScore, loanTerm, leaseTerm, apr, miles, vehicle: { msrp },
    } = this.state;
    this.setState({ isCalculate: false });
    Promise.all(
      [calculateLease(
        downPayment, tradeIn, getCreditScoreValue(creditScore), leaseTerm, miles, msrp,
      ),
      calculateLoan(downPayment, tradeIn, getCreditScoreValue(creditScore), loanTerm, apr, msrp)],
    ).then((data) => {
      const [leasePayment, loanPayment] = data;
      this.setState({ leasePayment, loanPayment, isCalculate: true });
    });
  }

  render() {
    const {
      homeZipCode, downPayment, tradeIn, creditScore, leaseTerm, miles, dealer, loanTerm, apr,
      vehicle: { msrp, name }, isLoaded, activeTab, loanPayment, leasePayment, isCalculate,
    } = this.state;
    return (
      <div className="app">
        <Tabs
          isLoaded={isLoaded}
          msrp={msrp}
          homeZipCode={homeZipCode}
          downPayment={downPayment}
          tradeIn={tradeIn}
          creditScore={creditScore}
          leaseTerm={leaseTerm}
          miles={miles}
          loanTerm={loanTerm}
          apr={apr}
          onChangeProp={this.changeProp}
          activeTab={activeTab}
          onChangeTab={this.changeActiveTab}
          loanPayment={loanPayment}
          leasePayment={leasePayment}
          isCalculate={isCalculate}
          validation={this.validation}
        />
        <InfoCard
          isLoaded={isLoaded}
          isCalculate={isCalculate}
          vehicle={{ name, msrp }}
          dealer={dealer}
          homeZipCode={homeZipCode}
          monthlyPayment={activeTab === 'loan' ? loanPayment : leasePayment}
        />
      </div>
    );
  }
}

export default App;
