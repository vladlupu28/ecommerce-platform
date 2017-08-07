module.exports = function(sequelize, DataTypes) {
    var User = sequelize.import('./User')
    var Poll = sequelize.import('./Poll')
    var Vote = sequelize.define('Vote', {
        voteId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        }
    })

    User.belongsToMany(Poll, {
        through: Vote,
        foreignKey: 'userId'
    })
    Poll.belongsToMany(User, {
        through: Vote,
        foreignKey: 'pollId'
    })

    return Vote;
}