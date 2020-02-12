const dealer = {
  name: 'Edmunds',
  phone: '(855) 977-2913',
  rating: '7',
};

const vehicle = {
  msrp: 22500,
  name: 'Kia Seltos',
};


const getVehicle = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve(vehicle);
  }, 750);
});


const getDealer = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve(dealer);
  }, 600);
});

export { getVehicle, getDealer };
