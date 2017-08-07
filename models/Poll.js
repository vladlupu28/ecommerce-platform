module.exports = function(sequelize, DataTypes) {
    var Community = sequelize.import('./Community')
    var User = sequelize.import('./User')
    var Poll = sequelize.define('Poll', {
        pollId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        description: DataTypes.TEXT('medium')
    })

    Poll.belongsTo(Community, {
        foreignKey: 'communityId'
    })
    Poll.belongsTo(User, {
        foreignKey: 'userId'
    })
    
    return Poll;
}