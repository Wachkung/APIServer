module.exports = {
    rcptlab(db2) {
        return new Promise((resolve, reject) => {
            db2.getConnection((err, conn) => {
                if (err) {
                    reject(err);
                } else {
                    let sql = `
                        SELECT 'OPD' as 'Service'  ,
                        sum(case when date(date) between '2016-10-01' and '2016-12-31' then incoth.rcptamt end) as 'Oct',
                        sum(case when date(date) between '2017-01-01' and '2017-03-30' then incoth.rcptamt end) as 'Jan',
                        sum(case when date(date) between '2017-04-01' and '2017-06-30' then incoth.rcptamt end) as 'Apr',
                        sum(case when date(date) between '2017-07-01' and '2017-09-30' then incoth.rcptamt end) as 'Jul'
                        FROM incoth WHERE an = '0' and income in(01)
                        UNION
                        SELECT 'IPD' as 'Service',  
                        sum(case when date(date) between '2016-10-01' and '2016-12-31' then incoth.rcptamt end) as 'Oct',
                        sum(case when date(date) between '2017-01-01' and '2017-03-30' then incoth.rcptamt end) as 'Jan',
                        sum(case when date(date) between '2017-04-01' and '2017-06-30' then incoth.rcptamt end) as 'Apr',
                        sum(case when date(date) between '2017-07-01' and '2017-09-30' then incoth.rcptamt end) as 'Jul'
                        FROM incoth WHERE an != '0' and income  in (01)
                        `;
                    conn.query(sql, [], (err, rows) => {
                        if (err) reject(err);
                        else resolve(rows);
                    });
                    conn.release();
                }
            });
        });
    },
    rcptxry(db2) {
        return new Promise((resolve, reject) => {
            db2.getConnection((err, conn) => {
                if (err) {
                    reject(err);
                } else {
                    let sql = `
                        SELECT 'OPD' as 'Service'  ,
                        sum(case when date(date) between '2016-10-01' and '2016-12-31' then incoth.rcptamt end) as 'Oct',
                        sum(case when date(date) between '2017-01-01' and '2017-03-30' then incoth.rcptamt end) as 'Jan',
                        sum(case when date(date) between '2017-04-01' and '2017-06-30' then incoth.rcptamt end) as 'Apr',
                        sum(case when date(date) between '2017-07-01' and '2017-09-30' then incoth.rcptamt end) as 'Jul'
                        FROM incoth WHERE an = '0' and income in(02)
                        UNION
                        SELECT 'IPD' as 'Service',  
                        sum(case when date(date) between '2016-10-01' and '2016-12-31' then incoth.rcptamt end) as 'Oct',
                        sum(case when date(date) between '2017-01-01' and '2017-03-30' then incoth.rcptamt end) as 'Jan',
                        sum(case when date(date) between '2017-04-01' and '2017-06-30' then incoth.rcptamt end) as 'Apr',
                        sum(case when date(date) between '2017-07-01' and '2017-09-30' then incoth.rcptamt end) as 'Jul'
                        FROM incoth WHERE an != '0' and income  in (02)
                        `;
                    conn.query(sql, [], (err, rows) => {
                        if (err) reject(err);
                        else resolve(rows);
                    });
                    conn.release();
                }
            });
        });
    },
    rcptdtt(db2) {
        return new Promise((resolve, reject) => {
            db2.getConnection((err, conn) => {
                if (err) {
                    reject(err);
                } else {
                    let sql = `
                        SELECT 
                        'OPD' as 'Service'  ,
                        sum(case when date(ovst.vstdttm) between '2016-10-01' and '2016-12-31' then incoth.rcptamt end) as 'Oct',
                        sum(case when date(ovst.vstdttm) between '2017-01-01' and '2017-03-30' then incoth.rcptamt end) as 'Jan',
                        sum(case when date(ovst.vstdttm) between '2017-04-01' and '2017-06-30' then incoth.rcptamt end) as 'Apr',
                        sum(case when date(ovst.vstdttm) between '2017-07-01' and '2017-09-30' then incoth.rcptamt end) as 'Jul'
                        from dt inner join incoth on dt.vn =incoth.vn 
                        inner join ovst on ovst.vn=dt.vn  
                        where dt.an=0

                        union 

                        SELECT 
                        'IPD' as 'Service'  ,
                        sum(case when date(ovst.vstdttm) between '2016-10-01' and '2016-12-31' then incoth.rcptamt end) as 'Oct',
                        sum(case when date(ovst.vstdttm) between '2017-01-01' and '2017-03-30' then incoth.rcptamt end) as 'Jan',
                        sum(case when date(ovst.vstdttm) between '2017-04-01' and '2017-06-30' then incoth.rcptamt end) as 'Apr',
                        sum(case when date(ovst.vstdttm) between '2017-07-01' and '2017-09-30' then incoth.rcptamt end) as 'Jul'
                        from dt inner join incoth on dt.vn =incoth.vn 
                        inner join ovst on ovst.vn=dt.vn  
                        where dt.an<>0
                        `;
                    conn.query(sql, [], (err, rows) => {
                        if (err) reject(err);
                        else resolve(rows);
                    });
                    conn.release();
                }
            });
        });
    },
    rcptphm(db2) {
        return new Promise((resolve, reject) => {
            db2.getConnection((err, conn) => {
                if (err) {
                    reject(err);
                } else {
                    let sql = `
                        SELECT 'OPD' as 'Service'  ,
                        sum(case when date(date) between '2016-10-01' and '2016-12-31' then incoth.rcptamt end) as 'Oct',
                        sum(case when date(date) between '2017-01-01' and '2017-03-30' then incoth.rcptamt end) as 'Jan',
                        sum(case when date(date) between '2017-04-01' and '2017-06-30' then incoth.rcptamt end) as 'Apr',
                        sum(case when date(date) between '2017-07-01' and '2017-09-30' then incoth.rcptamt end) as 'Jul'
                        FROM incoth WHERE an = '0' and income in(08,09) 
                        UNION
                        SELECT 'IPD' as 'Service',  
                        sum(case when date(date) between '2016-10-01' and '2016-12-31' then incoth.rcptamt end) as 'Oct',
                        sum(case when date(date) between '2017-01-01' and '2017-03-30' then incoth.rcptamt end) as 'Jan',
                        sum(case when date(date) between '2017-04-01' and '2017-06-30' then incoth.rcptamt end) as 'Apr',
                        sum(case when date(date) between '2017-07-01' and '2017-09-30' then incoth.rcptamt end) as 'Jul'
                        FROM incoth WHERE an != '0' and income  in (08,09) 
                        `;
                    conn.query(sql, [], (err, rows) => {
                        if (err) reject(err);
                        else resolve(rows);
                    });
                    conn.release();
                }
            });
        });
    },
    rcptnomed(db2) {
        return new Promise((resolve, reject) => {
            db2.getConnection((err, conn) => {
                if (err) {
                    reject(err);
                } else {
                    let sql = `
                        SELECT 'OPD' as 'Service'  ,
                        sum(case when date(date) between '2016-10-01' and '2016-12-31' then incoth.rcptamt end) as 'Oct',
                        sum(case when date(date) between '2017-01-01' and '2017-03-30' then incoth.rcptamt end) as 'Jan',
                        sum(case when date(date) between '2017-04-01' and '2017-06-30' then incoth.rcptamt end) as 'Apr',
                        sum(case when date(date) between '2017-07-01' and '2017-09-30' then incoth.rcptamt end) as 'Jul'
                        FROM incoth 
                        WHERE an = '0' and income in(11,14,15,10,12)  

                        UNION
                        SELECT 'IPD' as 'Service',  
                        sum(case when date(date) between '2016-10-01' and '2016-12-31' then incoth.rcptamt end) as 'Oct',
                        sum(case when date(date) between '2017-01-01' and '2017-03-30' then incoth.rcptamt end) as 'Jan',
                        sum(case when date(date) between '2017-04-01' and '2017-06-30' then incoth.rcptamt end) as 'Apr',
                        sum(case when date(date) between '2017-07-01' and '2017-09-30' then incoth.rcptamt end) as 'Jul' 
                        FROM incoth 
                        WHERE an != '0' and income  in (11,14,15,10,12)  
                        `;
                    conn.query(sql, [], (err, rows) => {
                        if (err) reject(err);
                        else resolve(rows);
                    });
                    conn.release();
                }
            });
        });
    }

}