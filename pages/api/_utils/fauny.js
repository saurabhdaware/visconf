const { client, q } = require('./config');

async function create(collection, data) {
    return client.query(q.Create(q.Collection(collection), {data}));
}

async function read(index, value) {
    return client.query(q.Get(q.Match(q.Index(index), value)));
}

async function readAll(index) {
    return client.query(q.Paginate(q.Match(q.Ref('indexes/'+index))))
        .then(res => {
            console.log(res.data);
        })
}

module.exports = {
    create,
    read,
    readAll
}