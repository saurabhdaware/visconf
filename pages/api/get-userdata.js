const fauny = require('./_utils/fauny');
const { verifyToken } = require('./_utils/authHelper'); 

const createUser = async ({sub, name, email}) => {
  const username = name.replace(/ /g, '').toLowerCase();
  const { data } = await fauny.read('users_by_username', username);
  let newUser;
  if(!data){
    // a user with this username does not exist so we are free to create!
    newUser = {
      uid: sub,
      username,
      name,
      email
    }
  } else {
    // User with same username already exists so we append numbers to make it unique
    newUser = {
      uid: sub,
      username: username + String(new Date().getTime()).slice(-5),
      name,
      email
    }
  }

  await fauny.create("users", newUser)

  return { data: newUser }
}

const getUserData = async (req, res) => {
  const { sub, email, name } = await verifyToken(req.headers.authorization.slice(7));
  const { data } = await fauny.read('users_by_uid', sub);
  if(data) {
    res.json({
      success: true,
      data
    })

    return;
  }

  // User does not exist, so we create!
  const newUser = await createUser({sub, name, email});
  res.json({
    success: true,
    data: newUser.data
  })

}


module.exports = getUserData;