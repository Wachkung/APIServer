const express = require('express');
const router = express.Router();
let crypto = require('crypto');
let jwt = require('../models/jwt');
let Encrypt = require('../models/encrypt');

const hirep = require('../models/user');

router.post('/login', function(req, res, next) {
    let data = req.body.data;
    let db = req.db;

    let decryptedData = Encrypt.decrypt(data);
    let user = JSON.parse(decryptedData);

    // console.log(data);
    // console.log(user);
    let hashPassword = crypto.createHash('md5')
        .update(user.password).digest('hex');
    hirep.doLogin(db, user.username, hashPassword)
        .then((rows) => {
            // console.log(rows.length);
            if (rows.length) {
                let token = Encrypt.encrypt(JSON.stringify({ rows }));
                // let token = jwt.sign({ id: rows[0].id });
                // console.log(token);
                res.send({ ok: true, token: token });
            } else {
                res.send({ ok: false, error: 'ชื่อผู้ใช้งาน/รหัสผ่านไม่ถูกต้อง' });
            }
        }, error => {
            res.send({ ok: false, error: error });
        });

});

router.post('/save-device-token', function(req, res, next) {
    // let id = req.decoded.id;
    let id = req.body.token;
    let deviceToken = req.body.deviceToken;
    let db = req.db;

    hirep.saveDeviceToken(db, id, deviceToken)
        .then((rows) => {
            res.send({ ok: true, rows: rows });
        }, (error) => {
            res.send({ ok: false, error: error });
        });
});



//รับค่า parameter โดยใช้ /:variable //อันนี้แบบ get
router.get('/username/:username/:password', (req, res, next) => {
    let db = req.db;
    //สร้างตัวแปร มารับค่า ชนิด parameter แบบ get
    let username = req.params.username;
    let password = req.params.password;

    // console.log("in route");
    // console.log(username);
    // console.log(password);
    //ส่งค่า parameter ที่ได้รับมา ไปกับ function เพื่อประมวลผล
    hirep.userall(db, username, password)
        .then((rows) => {
            res.send({ ok: true, rows: rows });
        }, (error) => {
            res.send({ ok: false, error: error });
        });
});
//รับค่า parameter โดยใช้ /:variable //อันนี้แบบ get
router.post('/username', (req, res, next) => {
    let db = req.db;
    //สร้างตัวแปร มารับค่า ชนิด parameter แบบ get
    let username = req.body.username;
    let password = req.body.password;
    // console.log("in post route");
    // console.log(username);
    // console.log(password);
    //ส่งค่า parameter ที่ได้รับมา ไปกับ function เพื่อประมวลผล
    hirep.userall(db, username, password)
        .then((rows) => {
            res.send({ ok: true, rows: rows });
        }, (error) => {
            res.send({ ok: false, error: error });
        });
});


module.exports = router;