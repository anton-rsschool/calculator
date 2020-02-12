import React, { Component } from 'react';

import { getVehicle, getDealer } from '../../service/dataService';
// import getIpData from '../../service/ipService';
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

      isLoaded: false,
    };
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

  render() {
    return (
      <div className="app">
        Calculator
      </div>
    );
  }
}

export default App;
