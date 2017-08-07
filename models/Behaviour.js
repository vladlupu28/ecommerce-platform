module.exports = function(sequelize, DataTypes) {
  var Behaviour = sequelize.define('Behaviour', {
      bouncedUsers : {
          type : DataTypes.INTEGER
      },
      noOfUserWithUnfinishedTranzactions : {
          type : DataTypes.INTEGER
      },
      numberOfVisitors : {
          type : DataTypes.INTEGER
      },
      timeSpentOnProductsPage : {
          type : DataTypes.INTEGER
      },
      timeSpentOnDiscussionPage : {
          type : DataTypes.INTEGER
      }, 
      timeSpentOnVotePage : {
          type : DataTypes.INTEGER
      },
      timeSpentOnPostPage : {
          type : DataTypes.INTEGER
      }
  })
    return Behaviour;
}