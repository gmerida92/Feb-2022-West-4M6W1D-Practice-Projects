'use strict';
const {
  Model, Op
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Instrument extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Instrument.belongsTo(models.Store)
    }
  }
  Instrument.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    storeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Instrument',

    defaultScope: {
      attributes:{
        exclude: ['createdAt', 'updatedAt']
      }
    },

    scopes: {

      isInstrumentType(type) {
        return {
          where:{
            type: {[Op.like]: `${type}`}
          }
        }
      },

      instrumentByStore(storeId) {
        const {Store} = require('../models');

        return {
          include: Store,
          where: {
            storeId
          }
        }
      },

    }

  });
  return Instrument;
};