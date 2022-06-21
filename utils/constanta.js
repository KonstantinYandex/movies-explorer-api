const mongoAdress = 'mongodb://localhost:27017/bitfilmsdb';
const port = 3000;
const allowedCors = [
  'https://pancfly.movies.nomoredomains.rocks',
  'http://pancfly.movies.nomoredomains.rocks',
  'https://localhost:3000',
  'http://localhost:3000',
  'localhost:3000',
];

module.exports = { mongoAdress, port, allowedCors };
