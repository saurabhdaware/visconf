const fauny = require('./_utils/fauny');
const { verifyToken } = require('./_utils/authHelper'); 

const submitTalk = async (req, res) => {
  const { sub } = await verifyToken(req.headers.authorization.slice(7));
  const { data } = await fauny.read('users_by_uid', sub);

  const talkDataToStore = {
    ...req.body,
    uid: data.uid,
    username: data.username,
    timestamp: new Date().getTime()
  }

  try{
    await fauny.create('talks', talkDataToStore);
    res.json({
      success: true,
      data: {
        path: `/${talkDataToStore.username}/${talkDataToStore.slug}`
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