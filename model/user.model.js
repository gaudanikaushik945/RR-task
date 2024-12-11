const db = require("./db")


module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("users", {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone_number: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      date_of_birth: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      select_business_category: {
        type: DataTypes.STRING,
        allowNull: false
        // defaultValue: null
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true
      }
    })
    return User
  }