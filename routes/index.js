const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'TansumHospital.Go.Th' });
});

// router.get('/ipt', function(req, res, next) {
//     let sql2 = `SELECT ipt.vn as vn, 
//                 ipt.hn as hn,
//                 ipt.an as an,
//                 pt.pop_id as pop_id,
//                 pt.fname as fname,
//                 pt.lname as lname,
//                 ipt.rgtdate as rgtdate FROM hi.ipt 
//                 LEFT JOIN hi.pt ON ipt.hn = pt.hn
//                 WHERE rgtdate BETWEEN '2016-01-01' AND '2016-12-31' AND dchdate !='0000-00-00' AND vn > 0 limit 10`;
//     let db2 = req.db2;
//     db2.getConnection((err, conn) => {
//         if (err) {
//             res.send({ ok: false, error: err });
//         } else {
//             conn.query(sql2, [], (err, rows) => {
//                 if (err) res.send({ ok: false, error: err });
//                 else res.send({ ok: true, rows: rows }); //อันนี้ใช่ไหมที่ return ไป
//             });
//             conn.release();
//         }
//     });

// });

module.exports = router;