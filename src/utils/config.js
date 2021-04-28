require('dotenv').config();

const { NODE_ENV } = process.env;
const BASE_URL = 'https://front-test.beta.aviasales.ru';
const TICKETS_IN_A_ROW = 5;

export {
  NODE_ENV,
  BASE_URL,
  TICKETS_IN_A_ROW,
};
