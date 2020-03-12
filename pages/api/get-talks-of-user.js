const fauny = require('./_utils/fauny');

const getTalksOfUser = async (req, res) => {
  const { username } = req.query;
  const result = await fauny.readAll("talks_by_username", username);
  const talksData = [];
  result.data.forEach(val => {
    talksData.push({
      username: val[0], 
      talkTitle: val[1], 
      slug: val[2], 
      eventName: val[3], 
      uid: val[8],
      character: {
        hairStyle: val[4],
        hairColor: val[5],
        skinColor: val[6],
        tshirtColor: val[7]
      }
    })
  })
  res.json({success: true, data: talksData});
}

module.exports = getTalksOfUser;