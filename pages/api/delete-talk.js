const fauny = require('./_utils/fauny');
const {verifyToken} = require('./_utils/authHelper');

const deleteTalk = async (req, res) => {
  let uid;
  try{
    tokenResponse = await verifyToken(req.headers.authorization.slice(7));
    uid = tokenResponse.sub;
  }catch(err) {
    res.json({
      success: false,
      err
    })
  }
  const { timestamp, slug } = req.body;
  try{
    await fauny.deleteValue('talks_by_timestamp_and_slug_and_uid', [Number(timestamp), slug, uid])
    res.json({success: true})
  }catch(err) {
    console.log(err);
    res.json({success: false, err})
  }
}


module.exports = deleteTalk;