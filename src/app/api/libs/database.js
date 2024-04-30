import mysql from 'mysql2/promise';

export const db = async () => {
  return await mysql.createConnection({
    host: 'sql3.freesqldatabase.com',
        user: 'sql3703084',
        password: 'B7fRTwRs23',
        database: 'sql3703084',
        port: 3306     
  });
};
