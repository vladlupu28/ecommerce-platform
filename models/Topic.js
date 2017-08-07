module.exports = function(sequelize, DataTypes) {
    var Community = sequelize.import('./Community');
    var User = sequelize.import('./User');
    var Topic = sequelize.define('Topic', {
        topicId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: DataTypes.STRING,
        topicSubject: DataTypes.TEXT('long'),
        numberOfComments: DataTypes.INTEGER,
        authorName: DataTypes.STRING
    })

    Topic.belongsTo(Community, {
        foreignKey: 'communityId'
    })
    Topic.belongsTo(User, {
        foreignKey: 'authorId'
    })

    return Topic;
}