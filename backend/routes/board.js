const {Team, Board, User} = require("../lib/sequelize");

exports.getBoards = async (data, {idUser}) => {
    try {
        const user = await User.findByPk(parseInt(idUser));
        if (!user) return {errors: 'user is not exist'};
        let boards = await user.getBoards();
        const teams = await user.getTeams();
        for await (const team of teams) {
            const tboards = await team.getBoards();
            boards = [...boards, ...tboards];
        }
        return boards;
    }catch(err) {
        return {errors: err}
    }
};

exports.createBoard = async ({isTeamBoard, name, id, idTeam = null}, {idUser}) => {
    if (isTeamBoard) {
        try {
            const team = await Team.findById(parseInt(idTeam));
            if (!team) throw new Error('team is not exist');
            return await team.createBoard({name, ownerIsTeam: isTeamBoard, userId: null, teamId: idTeam})
        } catch (err) {
            return {errors: err};
        }
    } else {
        try {
            const user = await User.findById(parseInt(id));
            if (!user) throw new Error('team is not exist');
            const board = await user.getBoards().filter(board => board.name === name && !board.ownerIsTeam);
            if (board.length) throw new  Error('board with the same name is exist');
            const newBoard = await user.createBoard({name, ownerIsTeam: isTeamBoard, userId: id, teamId: null});
            return {board: newBoard};
        } catch(err) {
            return {errors: err};
        }
    }
};

exports.delete = async (io, data, action) => {
    const {idBoard, id} = data;

    try {
        const board = await Board.findById(parseInt(idBoard));
        if (!board) return io.emit(action, {errors: 'board is not exist'});
        await board.destroy();
        io.emit(action, {message: 'board has been destoyed', id: idBoard});
    } catch(err) {
        console.log(err);
        io.emit(action, {errors: err})
    }
};