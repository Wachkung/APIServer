module.exports = {
    //รับตัวแปร ที่ส่งมาจาก router
    doLogin(db, username, password) {
        return new Promise((resolve, reject) => {
            db.getConnection((err, conn) => {
                if (err) {
                    reject(err);
                } else {
                    // console.log(username);
                    // console.log(password);
                    let sql = `
                        SELECT hirepuser.id,hirepuser.username,hirepuser.status FROM hirepuser WHERE hirepuser.username = ? AND hirepuser.password = ? ;  
                        `;
                    // เครื่องหมาย ? หรือ bind parameter ใช้แทนค่าตัวแปร มีกี่ตัวก็ใช้ ? เท่านั้นตัว
                    // [username, password] คือตัวแปร ที่จะเอามา bind เข้ามา แทน ? มีกี่ตัวก็ใส่ไป
                    // แต่ต้องเรียงลำดับให้ถูก ตาม ? ข้างบนว่า ตัวไหน แทนตัวไหน
                    conn.query(sql, [username, password], (err, rows) => {
                        // console.log(sql);
                        if (err) reject(err);
                        else resolve(rows);
                    });
                    conn.release();
                }
            });

        });
    },

    doLoginAll(db, username, password) {
        return new Promise((resolve, reject) => {
            db.getConnection((err, conn) => {
                if (err) {
                    reject(err);
                } else {
                    let sql = `
                    SELECT hirepuser.id,hirepuser.username,hirepuser.status FROM hirepuser WHERE hirepuser.username = ? AND hirepuser.password = ?
                    `;

                    conn.query(sql, [username, password], (err, rows) => {
                        if (err) reject(err);
                        else resolve(rows);
                    });
                    conn.release();
                }
            });

        });
    },

    getUsers(db) {
        return new Promise((resolve, reject) => {
            db.getConnection((err, conn) => {
                if (err) {
                    reject(err);
                } else {
                    let sql = `
                    SELECT id, fullname FROM hirepuser
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

    getDeviceToken(db, id) {
        return new Promise((resolve, reject) => {
            db.getConnection((err, conn) => {
                if (err) {
                    reject(err);
                } else {
                    let sql = `
                    SELECT device_token FROM hirepuser WHERE id=?
                    `;
                    conn.query(sql, [id], (err, rows) => {
                        if (err) reject(err);
                        else resolve(rows);
                    });
                    conn.release();
                }
            });

        });
    },

    saveDeviceToken(db, id, deviceToken) {
        return new Promise((resolve, reject) => {
            db.getConnection((err, conn) => {
                if (err) {
                    reject(err);
                } else {

                    let sql = `
                    UPDATE hirepuser SET device_token=? WHERE username=?
                    `;
                    conn.query(sql, [id, deviceToken], (err, rows) => {
                        if (err) reject(err);
                        else resolve(rows);
                    });
                    conn.release();
                }
            });

        });
    }



}