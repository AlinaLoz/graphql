const {User} = require('../lib/sequelize');

exports.get = async ({login}, {idUser}) => {
  try {
    const user = await User.findOne({where: {login}});
    if (!user)  throw new Error("user is not exist");
    return {id: user.id, login: user.login};
  }catch(e){
   return {message: e};
  }
};
