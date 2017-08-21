module.exports = {
    repdm(db2, startdate, enddate) {
        return new Promise((resolve, reject) => {
            db2.getConnection((err, conn) => {
                if (err) {
                    reject(err);
                } else {
                    // console.log(startdate);
                    // console.log(enddate);
                    let sql = `
                        SELECT @rownum:= @rownum+1 as Num, d.* FROM
						(select 
                        p.hn,
                        p.pop_id as cid,
                        concat(p.fname,' ',p.lname) as fullname,
                        m.namemale as sex,
                        floor(datediff(date(o.vstdttm),p.brthdate)/365.25) as age,
                        d2.icd10 as diag_1,
                        date(d2.vstdttm) as first_visit,
                        d1.icd10 as diag_2,
                        date(o.vstdttm) as revisit,
                        (datediff(o.vstdttm,d2.vstdttm)) as revisit_date
                        from hi.ovst as o
                        inner join hi.pt as p on p.hn=o.hn
                        inner join hi.male as m on p.male=m.male
                        inner join hi.iptdx as d1 on o.an=d1.an
                        inner join 
                        (select hn,vstdttm,icd10 
                        from hi.ovst 
                        inner join hi.iptdx on ovst.an=iptdx.an 
                        where (icd10 between 'J44' and 'J46' or icd10 between 'E10' and 'E14' or icd10 ='I10')) as d2 on (datediff(o.vstdttm,d2.vstdttm) between 1 and 28) and o.hn=d2.hn
                        where 
                        (d1.icd10 between 'J44' and 'J46' or d1.icd10 between 'E10' and 'E14' or d1.icd10 ='I10') 
                        and o.vstdttm between ? and ? 
                        group by first_visit order by first_visit asc)d, (SELECT @rownum:=0) r
                        LIMIT 0, 1000000 ;  
                        `;
                    // เครื่องหมาย ? หรือ bind parameter ใช้แทนค่าตัวแปร มีกี่ตัวก็ใช้ ? เท่านั้นตัว
                    // [startdate, enddate] คือตัวแปร ที่จะเอามา bind เข้ามา แทน ? มีกี่ตัวก็ใส่ไป
                    // แต่ต้องเรียงลำดับให้ถูก ตาม ? ข้างบนว่า ตัวไหน แทนตัวไหน
                    conn.query(sql, [startdate, enddate], (err, rows) => {
                        // console.log(sql);
                        if (err) reject(err);
                        else resolve(rows);
                    });
                    conn.release();
                }
            });

        });
    }

}