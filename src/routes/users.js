const { Router } = require('express');
const axios = require('axios')
const router = Router();

router.get('/', async (req, res) => {
  try {
    const response = await axios('https://jsonplaceholder.typicode.com/users');
    const users = await response.data;
    res.json(users);
  } catch (err) {
    console.log(err)
    res.json(err)
  }

});

module.exports = router; 
