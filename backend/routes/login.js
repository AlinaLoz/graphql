const {User} = require('../lib/sequelize');

exports.get = async (req, resp) => {
  const {login, password} = req.query;
  try {
    const user = await User.login(login, password);
    return resp.status(200).send(user);
  } catch (err) {
    throw new Error(err.message);
  }
};