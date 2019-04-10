module.exports = (sequelize, type) => {
    return sequelize.define('token', {
        id : {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        token: {
            type: type.TEXT,
        }
    });
};