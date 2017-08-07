module.exports = function(sequelize, DataTypes) {
    var bcrypt = require('bcrypt');    
    var User = sequelize.define('User', {
        name : DataTypes.STRING,
        email : {
            type : DataTypes.STRING,
            validate : {
                isEmail : true
            }
        },
        lastActive : DataTypes.DATE,
        gender : DataTypes.ENUM('M', 'F'),
        password : DataTypes.STRING
    }, {
        classMethods : {
             generateHash : function(password) {
                 return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
             },
             validPassword : function(password) {
                 return bcrypt.compareSync(password, this.password);
             }
        } 
        }
    );

    return User;
}