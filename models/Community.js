module.exports = function(sequelize, DataTypes) {
    var Community = sequelize.define('Community', {
        communityId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        description: DataTypes.TEXT('medium'),
        numberOfSubscribers: DataTypes.INTEGER
    })

    return Community;
}