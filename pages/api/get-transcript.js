const fauny = require('./_utils/fauny');

const getTranscript = async (req, res) => {
  const { uid, slug } = req.query;
  const result = await fauny.readAll('transcript_by_uid_and_slug', [uid, slug]);

  res.json({
    success: true,
    message: result.data[0]
  })
}


module.exports = getTranscript;