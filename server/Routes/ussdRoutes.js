const ussd = require('../Controllers/newUssdController');
// const ussd = require('../Controllers/USSDController');
const router = require('express').Router();

// router.post('/',ussd.recieveRequest)
router.post('/', ussd.regChild)

module.exports = router;