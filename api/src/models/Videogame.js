const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  const Videogames = sequelize.define('videogames', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4, 
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    platform: {
      type: DataTypes.STRING,
      allowNull: false
    },
    background_image: {
      type: DataTypes.BLOB,
      allowNull: false
    },
    released: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
  });
  Videogames.associate = (models) => {
    Videogames.belongsToMany(models.Genres, {
      through: 'Videogames_Genres',
      foreignKey: 'videogamesId',
    })
  };
  return Videogames;
};
