const fauny = require('./_utils/fauny');
const { verifyToken } = require('./_utils/authHelper'); 

const submitTalk = async (req, res) => {
  const { sub } = await verifyToken(req.headers.authorization.slice(7));

  const talkDataToStore = {
    ...req.body,
    uid: sub,
    timestamp: new Date().getTime()
  }

  try{
    await fauny.create('talks', talkDataToStore);
    res.json({
      success: true,
      data: {
        slug: talkDataToStore.slug
      }
    })
  }catch(err) {
    res.json({
      success: false,
      err
    })
  }
}


module.exports = submitTalk;