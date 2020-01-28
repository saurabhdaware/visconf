const { parse } = require('querystring');
const faunadb = require('faunadb');
const q = faunadb.query;

var client = new faunadb.Client({ secret: process.env.FAUNADB_SERVER_SECRET });


exports.handler = async (event, context) => {
    const message = "Hello, World!"
    const body = parse(event.body);


    return client.query(
        q.Create(
          q.Collection('talks'),
          { data: { title: 'My awesome title' } },
        )
    )
    .then((ret) => console.log(ret))
    .then(() => {
        return {
            statusCode: 200,
            body: message
        };
    })

    
}