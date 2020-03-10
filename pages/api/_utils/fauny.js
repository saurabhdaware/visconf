const { client, q } = require('./config');

async function create(collection, data) {
    return client.query(q.Create(q.Collection(collection), {data}));
}

async function read(index, value) {
	let result;
	try{
		result = await client.query(q.Get(q.Match(q.Index(index), value)));
	} catch(err) {
		result = {data: null};
	}

	return result;
}

async function readAll(index, value = null) {
	return client.query(
		q.Paginate(
			q.Match(
				q.Index(index),
				value
			)
		)
	);
}

module.exports = {
    create,
    read,
    readAll
}