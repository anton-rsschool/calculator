import React, { Component } from 'react';

import { getVehicle, getDealer } from '../../service/dataService';
// import getIpData from '../../service/ipService';
import Tabs from '../Tabs';
import InfoCard from '../InfoCard';
import './App.scss';


class App extends Component {
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

      homeZipCode: 222222,
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
    this.changeActiveTab = this.changeActiveTab.bind(this);
    this.changeProp = this.changeProp.bind(this);
  }

  componentDidMount() {
    Promise.all([getVehicle(), getDealer()])
      .then((data) => {
        const [vehicle, dealer] = data;
        this.setState({
          vehicle,
          dealer,
          homeZipCode: 333333,
          isLoaded: true,
        });
      });
  }

  changeProp(prop) {
    this.setState({ ...prop });
  }

  changeActiveTab(tab) {
    this.setState({
      activeTab: tab,
    });
  }

  render() {
    const {
      homeZipCode,
      downPayment,
      tradeIn,
      creditScore,
      leaseTerm,
      miles,
      dealer,
      loanTerm,
      apr,
      vehicle: { msrp, name },
      isLoaded,
      activeTab,
      loanPayment,
      leasePayment,
      isCalculate,
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
        />
        <InfoCard
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
