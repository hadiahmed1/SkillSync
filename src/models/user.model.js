import { Model, DataTypes } from 'sequelize';

export default class User extends Model {
  static associate(models) {
    this.belongsToMany(models.Skill, {
      through: 'UserSkills',
      foreignKey: 'userId',
    });

    // this.hasMany(models.Project, {
    //   foreignKey: 'userId',
    // });
  }
}

export const initUser = (sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM('USER', 'ADMIN'),
        defaultValue: 'USER',
      },
      bio: DataTypes.TEXT,
      github: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: true,
      paranoid: true
    }
  );

  return User;
};
