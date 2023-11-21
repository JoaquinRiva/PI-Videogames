const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
   const Genres = sequelize.define('genres', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
    })
    Genres.associate = (models) => {
        Genres.belongsToMany(models.Videogame, {
            through: 'Videogames_Genres',
            foreignKey: 'genresId',
        })
    };
    return Genres;
}