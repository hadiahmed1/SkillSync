import { Model, DataTypes } from 'sequelize';

export default class Skill extends Model {
  static associate(models) {
    this.belongsToMany(models.User, {
      through: models.UserSkill,
      foreignKey: 'skillId',
    });
  }
}

export const initSkill = (sequelize) => {
  Skill.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      set(value) {
        this.setDataValue('name', value.toLowerCase());
      }
    },
  },
    {
      sequelize,
      modelName: 'Skill',
      tableName: 'skills',
      timestamps: true,
      paranoid: true
    }
  );

  return Skill;
};
