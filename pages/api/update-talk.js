const fauny = require('./_utils/fauny');
const { verifyToken } = require('./_utils/authHelper');
/**
 * 1. get Uid from header token
 * 2. read old talk and get timestamp of old talk
 * 3. Create new talk and store it along with the old slug and old timestamp
 * 4. delete old talk
 */
const updateTalk = async (req, res) => {
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

  // Read old talk
  const {slug} = req.body.oldTalkData;
  const result = await fauny.readAll('talkdata_by_uid_and_slug', [uid, slug]);
  const timestamp = result.data[0][8];
  const newTalk = {
    ...req.body,
    uid,
    slug,
    timestamp
  }

  try{
    await fauny.create('talks', newTalk);
  } catch(err) {
    res.json({
      success: false,
      err
    })
  }

  // Delete old talk
  try{
    await fauny.deleteValue('talks_by_timestamp_and_slug_and_uid', [Number(timestamp), slug, uid])
    res.json({success: true, data: {slug}})
  }catch(err) {
    console.log(err);
    res.json({success: false, err})
  }
}


module.exports = updateTalk;