const config = {
  dbUrl: process.env.DB_URL || 'mongodb://localhost:27017/telegram',
  port: 3000,
  host: 'http://localhost',
  publicRoute: process.env.PUBLIC_ROUTE || '/app',
};

module.exports = config;
