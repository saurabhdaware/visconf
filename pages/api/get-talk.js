const fauny = require('./_utils/fauny');

const getTalk = async (req, res) => {
  const { username, slug } = req.query;
  const { data:{ uid } } = await fauny.read('users_by_username', username);
  const result = await fauny.read('talks_by_uid_and_slug', [uid, slug]);
  res.json({
    success: true,
    message: result.data
  })
}


module.exports = getTalk;