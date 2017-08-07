module.exports = function(sequelize, DataTypes) {
    var Order = sequelize.define('Order', {
        totalAmount: {
            type: DataTypes.INTEGER
        },
        productIds: {
            type: DataTypes.STRING,
            get: function () {
                return this.getDataValue('productIds').split(';')
            },
            set: function (val) {
            var array = [];
            array = val;
            this.setDataValue('productIds', array.join(';'));
            }
        },
        numberOfProducts: {
            type: DataTypes.INTEGER
        }
    })
    return Order;
}