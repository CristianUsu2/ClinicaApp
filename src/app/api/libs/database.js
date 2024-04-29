import mysql from "serverless-mysql"

export const db=mysql({
    config:{
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'clinica',
        port: 3306
    }
})