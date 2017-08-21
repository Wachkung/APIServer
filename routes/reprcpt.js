const express = require('express');
const router = express.Router();

const reprcpt = require('../models/reprcpt');

router.get('/rcptlab', (req, res, next) => {
    let db2 = req.db2;
    reprcpt.rcptlab(db2)
        .then((rows) => {
            res.send({ ok: true, rows: rows });
        }, (error) => {
            res.send({ ok: false, error: error });
        });
});
router.get('/rcptxry', (req, res, next) => {
    let db2 = req.db2;
    reprcpt.rcptxry(db2)
        .then((rows) => {
            res.send({ ok: true, rows: rows });
        }, (error) => {
            res.send({ ok: false, error: error });
        });
});
router.get('/rcptdtt', (req, res, next) => {
    let db2 = req.db2;
    reprcpt.rcptdtt(db2)
        .then((rows) => {
            res.send({ ok: true, rows: rows });
        }, (error) => {
            res.send({ ok: false, error: error });
        });
});
router.get('/rcptphm', (req, res, next) => {
    let db2 = req.db2;
    reprcpt.rcptphm(db2)
        .then((rows) => {
            res.send({ ok: true, rows: rows });
        }, (error) => {
            res.send({ ok: false, error: error });
        });
});
router.get('/rcptnomed', (req, res, next) => {
    let db2 = req.db2;
    reprcpt.rcptnomed(db2)
        .then((rows) => {
            res.send({ ok: true, rows: rows });
        }, (error) => {
            res.send({ ok: false, error: error });
        });
});

module.exports = router;