module.exports = function(sequelize, DataTypes){
    var User = sequelize.import('./User')
    var Community = sequelize.import('./Community')
    var Subscription = sequelize.define('Subscription', {
        subscriptionId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    })
    User.belongsToMany(Community, {
        through: Subscription,
        foreignKey: 'userId'
    })
    Community.belongsToMany(User, {
        through: Subscription,
        foreignKey: 'communityId'
    })

    return Subscription;
}