module.exports = function(sequelize, DataTypes) {
    var Poll = sequelize.import('./Poll')
    var ProposedProduct = sequelize.define('ProposedProduct', {
        proposedProductId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        description: DataTypes.TEXT('medium'),
        userIdVotes: {
            type: DataTypes.STRING,
            allowNull: false,
            get: function () {
                return this.getDataValue('userIdVotes').split(';')
            },
            set: function (val) {
            var array = [];
            // for(i = 0; i<val.length;i++) {
            //     array[i].push(val[i])
            // }
            array = val;
            this.setDataValue('userIdVotes', array.join(';'));
            }
        },
        numberOfVotes: DataTypes.INTEGER
    })
    ProposedProduct.belongsTo(Poll, {
        foreignKey: 'pollId'
    })
    return ProposedProduct;
}