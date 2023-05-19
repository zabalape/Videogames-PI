const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('genre', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            
        },
        games: {
            type: DataTypes.ARRAY(DataTypes.JSON),
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
        }
    })
}