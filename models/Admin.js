module.exports = function(sequelize, DataTypes) {
    var Admin = sequelize.define('Admin', {
        email : {
            type : DataTypes.STRING,
            validate : {
                isEmail : true
            }
        }
    })

    return Admin;
}