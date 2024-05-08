const mysql = require('mysql');

let configPool = {
	user: process.env.DB_USER || 'root',
	password: process.env.DB_PASSWORD,
	server: process.env.DB_SERVER || '127.0.0.1',
	port: parseInt(process.env.DB_PORT || 3306),
	database: process.env.DB_NAME,
	dateStrings: true
}

const pool = mysql.createPool(configPool);

exports.queryMySQL = function(query, params) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                if (params.length > 0) {
                    connection.query(query, params, function(err, rows) {
                        connection.release();
                        if (!err) {
                            resolve(rows);
                        } else {
                            reject(err);
                        }
                    });
                } else {
                    connection.query(query, function(err, rows) {
                        connection.release();
                        if (!err) {
                            resolve(rows);
                        } else {
                            reject(err);
                        }
                    });
                }
            }
        });
    });
}

