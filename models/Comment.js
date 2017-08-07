module.exports = function(sequelize, DataTypes) {
    var Topic = sequelize.import('./Topic');
    var User = sequelize.import('./User');
    var Comment = sequelize.define('Comment', {
        commentId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        message: DataTypes.STRING,
        authorName: DataTypes.STRING
    })

    Comment.belongsTo(Topic, {
        foreignKey: 'topicId'
    })
    Comment.belongsTo(User, {
        foreignKey: 'userId'
    })

    return Comment;
}