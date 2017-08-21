const express = require('express');
const router = express.Router();
//var gcm = require('node-gcm');

const hirep = require('../models/hirep');

router.get('/today', (req, res, next) => {
    let db2 = req.db2;
    hirep.today(db2)
        .then((rows) => {
            res.send({ ok: true, rows: rows });
        }, (error) => {
            res.send({ ok: false, error: error });
        });
});
router.get('/todayipt', (req, res, next) => {
    let db2 = req.db2;
    hirep.todayipt(db2)
        .then((rows) => {
            res.send({ ok: true, rows: rows });
        }, (error) => {
            res.send({ ok: false, error: error });
        });
});
router.get('/todaytype', (req, res, next) => {
    let db2 = req.db2;
    hirep.todaytype(db2)
        .then((rows) => {
            res.send({ ok: true, rows: rows });
        }, (error) => {
            res.send({ ok: false, error: error });
        });
});
router.get('/todaytotal', (req, res, next) => {
    let db2 = req.db2;
    hirep.todaytotal(db2)
        .then((rows) => {
            res.send({ ok: true, rows: rows });
        }, (error) => {
            res.send({ ok: false, error: error });
        });
});
router.get('/revier', (req, res, next) => {
    let db2 = req.db2;
    hirep.revier(db2)
        .then((rows) => {
            res.send({ ok: true, rows: rows });
        }, (error) => {
            res.send({ ok: false, error: error });
        });
});
router.get('/opicdtm', (req, res, next) => {
    let db2 = req.db2;
    hirep.opicdtm(db2)
        .then((rows) => {
            res.send({ ok: true, rows: rows });
        }, (error) => {
            res.send({ ok: false, error: error });
        });
});
router.get('/ericdtm', (req, res, next) => {
    let db2 = req.db2;
    hirep.ericdtm(db2)
        .then((rows) => {
            res.send({ ok: true, rows: rows });
        }, (error) => {
            res.send({ ok: false, error: error });
        });
});
router.get('/dticdtm', (req, res, next) => {
    let db2 = req.db2;
    hirep.dticdtm(db2)
        .then((rows) => {
            res.send({ ok: true, rows: rows });
        }, (error) => {
            res.send({ ok: false, error: error });
        });
});
router.get('/iptnum', (req, res, next) => {
    let db2 = req.db2;
    hirep.iptnum(db2)
        .then((rows) => {
            res.send({ ok: true, rows: rows });
        }, (error) => {
            res.send({ ok: false, error: error });
        });
});
router.get('/reopuc', (req, res, next) => {
    let db2 = req.db2;
    hirep.reopuc(db2)
        .then((rows) => {
            res.send({ ok: true, rows: rows });
        }, (error) => {
            res.send({ ok: false, error: error });
        });
});
router.get('/reipuc', (req, res, next) => {
    let db2 = req.db2;
    hirep.reipuc(db2)
        .then((rows) => {
            res.send({ ok: true, rows: rows });
        }, (error) => {
            res.send({ ok: false, error: error });
        });
});
router.get('/overvisit', (req, res, next) => {
    let db2 = req.db2;
    hirep.overvisit(db2)
        .then((rows) => {
            res.send({ ok: true, rows: rows });
        }, (error) => {
            res.send({ ok: false, error: error });
        });
});
router.get('/overadmin', (req, res, next) => {
    let db2 = req.db2;
    hirep.overadmin(db2)
        .then((rows) => {
            res.send({ ok: true, rows: rows });
        }, (error) => {
            res.send({ ok: false, error: error });
        });
});

//รับค่า parameter โดยใช้ /:variable //อันนี้แบบ get
router.get('/typetotal/:startdate/:enddate', (req, res, next) => {
    let db2 = req.db2;
    //สร้างตัวแปร มารับค่า ชนิด parameter แบบ get
    let startdate = req.params.startdate;
    let enddate = req.params.enddate;
    // console.log("in route");
    // console.log(startdate);
    // console.log(enddate);
    //ส่งค่า parameter ที่ได้รับมา ไปกับ function เพื่อประมวลผล
    hirep.typetotal(db2, startdate, enddate)
        .then((rows) => {
            res.send({ ok: true, rows: rows });
        }, (error) => {
            res.send({ ok: false, error: error });
        });
});

//รับค่า parameter โดยใช้ /:variable //อันนี้แบบ get
router.post('/typetotal', (req, res, next) => {
    let db2 = req.db2;
    //สร้างตัวแปร มารับค่า ชนิด parameter แบบ get
    let startdate = req.body.startdate;
    let enddate = req.body.enddate;
    // console.log("in post route");
    // console.log(startdate);
    // console.log(enddate);
    //ส่งค่า parameter ที่ได้รับมา ไปกับ function เพื่อประมวลผล
    hirep.typetotal(db2, startdate, enddate)
        .then((rows) => {
            res.send({ ok: true, rows: rows });
        }, (error) => {
            res.send({ ok: false, error: error });
        });
});

module.exports = router;