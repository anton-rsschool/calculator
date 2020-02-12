const ACCESS_TOKEN = 'b5977085a0d495';
const BASE_URL = 'https://ipinfo.io/';

const getIpData = () => fetch(`${BASE_URL}json?token=${ACCESS_TOKEN}`)
  .then((response) => response.json());

export default getIpData;
