const express = require('express');
const { getstafflist, getSaleBillList, GetStoreBillInfo, updateStoreBillInfo, getBillInfoDetails, deleteStoreBillInfo } = require('../controller/billController');
const router = express.Router();


router.route('/')
    .post(getstafflist);

router.route('/')
    .get(getSaleBillList);

router.route('/:id')
    .get(GetStoreBillInfo);

router.route('/:id')
    .put(updateStoreBillInfo);

router.route('/:id')
    .delete(getBillInfoDetails);

router.route('/deletestorebillinfo/:id')
    .delete(deleteStoreBillInfo);


module.exports = router;
