const mongoAdress = 'mongodb://localhost:27017/moviesdb';
const port = 3000;
const allowedCors = [
  'https://movies-konstantin.nomoredomains.xyz',
  'http://movies-konstantin.nomoredomains.xyz',
  'https://localhost:3000',
  'http://localhost:3000',
  'localhost:3000',
];

module.exports = { mongoAdress, port, allowedCors };
