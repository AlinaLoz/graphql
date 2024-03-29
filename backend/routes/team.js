const {User, Team} = require('../lib/sequelize');

exports.get = async ({idUser}) => {
  try {
    const user = await User.findByPk(parseInt(idUser));
    if (!user) return [];
    const teams = await user.getTeams();
    return teams.map(team => ({
      id: team.id,
      name: team.name
    }));
  }catch(err) {
    throw new Error(err.message)
  }
};

exports.getById = async ({id}, {idUser}) => {
  try {
    const team = await Team.findByPk(parseInt(id));
    if (!team) return {};
    const users = await User.findAll({
      include: [{
        model: Team,
        where: {id}
      }]
    });
    const resultUsers = users.map(user => {
      return {id: user.id, login: user.login}
    });
    return {name: team.name, id: team.id, users: resultUsers};
  }catch(err) {
    throw new Error(err.message)
  }
};

exports.teamAdd = async ({name, users}, {idUser}) => {
  try {
    const user = await User.findByPk(parseInt(idUser));
    if (!user) return user;
    const team = await Team.findOne({where: {name}});
    if (team) throw new Error("this team exist");
    const newTeam = await Team.create({name});
    users.forEach(async id => {
      const user = await User.findByPk(id);
      user.addTeam(newTeam);
    });
    await user.addTeam(newTeam);
    return  "team is created";
  }
  catch(err) {
    throw new Error(err.message)
  }
};

exports.delete = async ({id}, {idUser}) => {
    try {
      const user = await User.findByPk(parseInt(idUser));
      const team = await Team.findByPk(id);
      if (!team) throw new Error("this team is not exist");
      const result = await team.destroy();
      return {id, message: "team has been droped"};
    }catch (err){
      throw new Error(err.message)
    }
};

exports.put = async ({id, name}, {idUser}) => {
  //переделать чтоб айди был в строке запроса
  try {
    const team = await Team.findByPk(parseInt(id));
    if (!team) throw new Error("this team is not exist");
    await team.update({name: name});
    return "изменения сохранены";
  } catch (err) {
    throw new Error(err.message)
  }
};