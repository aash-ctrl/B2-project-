const axios = require('axios');

axios.get('http://localhost:3000/cars')
  .then(res => console.log(res.data))
  .catch(err => console.error(err));