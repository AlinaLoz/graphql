const {Team, Board, User} = require("../lib/sequelize");

exports.getBoards = async (data, {idUser}) => {
    try {
        const user = await User.findByPk(parseInt(idUser));
        if (!user) throw new Error('user is not exist');
        let boards = await user.getBoards();
        const teams = await user.getTeams();
        for await (const team of teams) {
            const tboards = await team.getBoards();
            boards = [...boards, ...tboards];
        }
        return boards;
    }catch(err) {
        throw err;
    }
};

exports.createBoard = async ({isTeamBoard, name, team = null}, {idUser}) => {
    if (isTeamBoard) {
        try {
            const searchTeam = await Team.findById(parseInt(team));
            if (!searchTeam) throw new Error('team is not exist');
            return await searchTeam.createBoard({name, ownerIsTeam: isTeamBoard, userId: null, teamId: team})
        } catch (err) {
            throw err;
        }
    } else {
        try {
            const user = await User.findById(parseInt(idUser));
            if (!user) throw new Error('team is not exist');
            const board = await user.getBoards().filter(board => board.name === name && !board.ownerIsTeam);
            if (board.length) throw new Error('board with the same name is exist');
            const newBoard = await user.createBoard({name, ownerIsTeam: isTeamBoard, userId: idUser, teamId: null});
            const {updatedAt, createdAt, ...other} = newBoard.dataValues;
            return other;
        } catch(err) {
            throw err;
        }
    }
};

exports.delete = async ({idBoard}, {idUser}) => {
    try {
        const board = await Board.findById(parseInt(idBoard));
        if (!board) throw new Error('board is not exist');
        await board.destroy();
        return {message: 'board has been destoyed', id: idBoard};
    } catch(err) {
        throw err;
    }
};