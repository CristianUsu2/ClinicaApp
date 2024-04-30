import mysql from 'mysql2/promise';

export const db = async () => {
  return await mysql.createConnection({
    host: 'sql5.freesqldatabase.com',
        user: 'sql5702682',
        password: 'NZkssBNeKz',
        database: 'sql5702682',
        port: 3306     
  });
};
