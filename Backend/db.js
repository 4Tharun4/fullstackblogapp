import mysql from 'mysql'

import 'dotenv/config';

const   db = mysql.createConnection({
    host:process.env.HOST,
    password:process.env.PASSWORD,
    user:process.env.USER,
    database:process.env.DATABASE
})


export default db;
