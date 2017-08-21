const express = require('express');
const router = express.Router();
let crypto = require('crypto');
let jwt = require('../models/jwt');
let Encrypt = require('../models/encrypt');

const hirep = require('../models/repopd');
//รับค่า parameter โดยใช้ /:variable //อันนี้แบบ get
router.get('/repdm/:startdate/:enddate', (req, res, next) => {
    let db2 = req.db2;
    //สร้างตัวแปร มารับค่า ชนิด parameter แบบ get
    let startdate = req.params.startdate;
    let enddate = req.params.enddate;
    // console.log("in route");
    // console.log(startdate);
    // console.log(enddate);
    //ส่งค่า parameter ที่ได้รับมา ไปกับ function เพื่อประมวลผล
    hirep.repdm(db2, startdate, enddate)
        .then((rows) => {
            res.send({ ok: true, rows: rows });
        }, (error) => {
            res.send({ ok: false, error: error });
        });
});

//รับค่า parameter โดยใช้ /:variable //อันนี้แบบ get
router.post('/repdm1', (req, res, next) => {
    let db2 = req.db2;
    //สร้างตัวแปร มารับค่า ชนิด parameter แบบ get
    let startdate = req.body.startdate;
    let enddate = req.body.enddate;
    // console.log("in post route");
    // console.log(startdate);
    // console.log(enddate);
    //ส่งค่า parameter ที่ได้รับมา ไปกับ function เพื่อประมวลผล
    hirep.repdm(db2, startdate, enddate)
        .then((rows) => {
            res.send({ ok: true, rows: rows });
        }, (error) => {
            res.send({ ok: false, error: error });
        });
});
router.post('/repdm', function(req, res, next) {
    let data = req.body.data;
    let db2 = req.db2;

    let decryptedData = Encrypt.decrypt(data);
    let repdm = JSON.parse(decryptedData);

    hirep.repdm(db2, repdm.startdate, repdm.enddate)
        .then((rows) => {
            // console.log(rows.length);
            // let revisit = jwt.sign();
            let token = Encrypt.encrypt(JSON.stringify({ rows }));

            res.send({ ok: true, token: token });
            // res.send({ ok: true, rows: rows });
        }, error => {
            res.send({ ok: false, error: error });
        });

});

module.exports = router;