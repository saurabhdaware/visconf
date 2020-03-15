const fauny = require('./_utils/fauny');

const getTalk = async (req, res) => {
  const { username, slug } = req.query;
  const { data:{ uid } } = await fauny.read('users_by_username', username);
  const result = await fauny.readAll('talkdata_by_uid_and_slug', [uid, slug]);

  const response = result.data[0];
  const message = {
    talkTitle: response[0],
    slug: response[1],
    slidePdfLink: response[2],
    eventName: response[3],
    character: {
      hairColor: response[4],
      hairStyle: response[5],
      skinColor: response[6],
      tshirtColor: response[7]
    },
    timestamp: response[8],
    voice: {
      name: response[9]
    },
    username,
    uid
  }

  res.json({
    success: true,
    message
  })
}


module.exports = getTalk;