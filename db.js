import sql from 'mssql';

const config = {
  user: 'drivethrumedics', // ✅ your DB username
  password: 'yPQ3xW~3mk@0wodz', // ✅ your DB password
  server: '144.76.221.176', // ✅ your DB server IP
  database: 'drivethrumedics', // ✅ your DB name
  port: 1438, // ✅ custom port
  options: {
    encrypt: true, // required if server forces SSL
    trustServerCertificate: true // set true to ignore self-signed certs
  }
};

const poolPromise = sql.connect(config)
  .then(pool => {
    console.log('✅ Connected to MSSQL database');
    return pool;
  })
  .catch(err => {
    console.error('❌ Database connection failed:', err.message);
    return null;
  });

export { sql, poolPromise };
