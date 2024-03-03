// routes/auth.js

const express = require('express');
const { getstafflist, getSaleBillList, GetStoreBillInfo, updateStoreBillInfo, getBillInfoDetails, deleteStoreBillInfo } = require('../controller/billController');
const router = express.Router();


router.route('/stafflist')
    .get(getstafflist);

router.route('/getsalebilllist')
    .get(getSaleBillList);

router.route('/getstorebillinfo')
    .post(GetStoreBillInfo);

router.route('/getupdatebillinfo/:id')
    .put(updateStoreBillInfo);

router.route('/getbillinfodetail/:id')
    .get(getBillInfoDetails);

router.route('/deletestorebillinfo/:id')
    .delete(deleteStoreBillInfo);


module.exports = router;
