require('dotenv').config();
const server = require('./server');

const PORT = process.env.PORT || process.env.LOCALPORT;

server.listen(PORT, () => {
  console.log(`\n*** Server Running on ${PORT} ***\n`);
});
