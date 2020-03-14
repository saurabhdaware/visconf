const fauny = require('./_utils/fauny');

const getTalksOfUser = async (req, res) => {
  const { username } = req.query;
  const {data: {uid}} = await fauny.read('users_by_username', username);
  const result = await fauny.readAll("talks_by_uid", uid);
  
  const talksData = [];
  result.data.forEach(val => {
    talksData.push({
      username: username,
      uid: val[0],
      talkTitle: val[1], 
      slug: val[2], 
      eventName: val[3], 
      character: {
        hairStyle: val[4],
        hairColor: val[5],
        skinColor: val[6],
        tshirtColor: val[7]
      },
      timestamp: val[8]
    })
  })

  const sortedTalks = talksData.sort((a, b) => b.timestamp - a.timestamp);
  res.json({success: true, data: sortedTalks});
}

module.exports = getTalksOfUser;