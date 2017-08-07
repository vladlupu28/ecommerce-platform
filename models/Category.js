module.exports = function(sequelize, DataTypes) {
    var Category = sequelize.define('Category', {
        categoryId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: DataTypes.STRING,
        description: DataTypes.TEXT('medium'),
        numberOfProducts: DataTypes.INTEGER
    })
    return Category;    
}