const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('user', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            set: function(val){
                this.setDataValue('name', val.trim());
            }
        },
        password: {
            type: DataTypes.STRING(64),
            
             
            set: function(val){
            this.setDataValue('password', val.trim())
            }
    }
    })
}