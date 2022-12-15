const recordModel = (sequelize, DataTypes) => sequelize.define('records', {
 
  country: { type: DataTypes.STRING },
  totalConfirmedCases: { type: DataTypes.INTEGER },
  totalDeathsCases: { type: DataTypes.INTEGER },
  totalRecoveredCases: { type: DataTypes.INTEGER },
  Date: { type: DataTypes.DATE },
},{ timestamps: false });

  

  module.exports = recordModel;
  