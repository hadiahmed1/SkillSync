import { DataTypes } from "sequelize";

export const initUserSkill = (sequelize) => {
  const UserSkill = sequelize.define('UserSkill', {
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
