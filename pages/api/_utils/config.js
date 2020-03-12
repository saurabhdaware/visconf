const faunadb = require('faunadb');

const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET_KEY });
const q = faunadb.query;

module.exports = {
  client,
  q
}

