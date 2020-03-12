const fauny = require('./_utils/fauny');

const getTalk = async (req, res) => {
  const {username, slug} = req.query;
  const result = await fauny.read('talks_by_username_and_slug', [username, slug]);

  res.json({
    success: true,
    message: result.data
  })
}


module.exports = getTalk;