import { DataTypes } from "sequelize";

export const initUserSkill = (sequelize) => {
  const UserSkill = sequelize.define('UserSkill', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    skillId: {
      type: DataTypes.UUID,
      allowNull: false,
    }
  });

  return UserSkill;
};
