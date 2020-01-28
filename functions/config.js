const faunadb = require('faunadb');

const client = new faunadb.Client({ secret: process.env.FAUNADB_SERVER_SECRET });
const q = faunadb.query;
const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, POST, PUT',
    'Access-Control-Allow-Headers': '*'
}

module.exports = {
    client,
    q,
    headers
}

