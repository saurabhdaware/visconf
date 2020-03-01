const fauny = require('../_utils/fauny');
const { getAuthToken, getHash } = require('../_utils/authHelper');

const register = async (req, res) => {
  const {username, email, password} = req.body;
  const uid = "user" + (new Date()).getTime();

  if(!username || !email || !password) {
    res.json({success: false, message: "Username, Email or Password invalid"});
  }

  // Hash and store in 'users'
  try{
    const hashedPassword = await getHash(password);
    const dataToStore = {
      uid,
      username,
      email,
      password: hashedPassword
    }

    await fauny.create('users', dataToStore);
  }catch(err) {
    res.json({success: false, message: err.message});
  }

  // generate token and return
  const token = getAuthToken(uid);
  res.json({
    "success": true,
    "access_token": token,
    "token_type": "bearer",
    "expires_in": "2h"
  })
}

module.exports = register;