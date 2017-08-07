module.exports = function(sequelize, DataTypes) {
    var Community = sequelize.import('./Community')
    var Product = sequelize.define('Product', {
        name: DataTypes.STRING,
        series: DataTypes.STRING,
        tag: DataTypes.STRING,
        price: DataTypes.DOUBLE,
        description: DataTypes.TEXT('long'),
        pollId: DataTypes.INTEGER
    })

    Product.belongsTo(Community, {
        foreignKey: 'communityId'
    })

    return Product;
}