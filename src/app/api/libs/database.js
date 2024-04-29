import mysql from "serverless-mysql"

export const db=mysql({
    config:{
        host: 'sql5.freesqldatabase.com',
        user: 'sql5702682',
        password: 'NZkssBNeKz',
        database: 'sql5702682',
        port: 3306
    }
})