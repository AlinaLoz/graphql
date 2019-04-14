const root = {
    //mutations
    dropBoard  : (obj, context) => require('../routes/board').delete(obj, context),
    createBoard: (obj, context) => require('../routes/board').createBoard(obj, context),
    updateNameTeam: (obj, context) => require('../routes/team').put(obj, context),
    dropTeam  : (obj, context) => require('../routes/team').delete(obj, context),
    createTeam: (obj, context) => require('../routes/team').teamAdd(obj, context),

    //queries
    auth   : (obj, context) => require('../routes/auth').get(context),
    teamAll: (obj, context) => require('../routes/team').get(context),
    getOneTeam: (obj, context) => require('../routes/team').getById(obj, context),
    checkUser : (obj, context) => require('../routes/user').get(obj, context),
    getBoards : (obj, context) => require('../routes/board').getBoards(obj, context),
};

module.exports = root;