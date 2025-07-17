import { initUser } from './user.model.js';
import { sequelize } from '../config/database.js';
import { initSkill } from './skill.model.js';
import { initUserSkill } from './userskill.model.js';


const db = {};
db.sequelize = sequelize;

db.User = initUser(sequelize);
db.Skill = initSkill(sequelize);
db.UserSkill= initUserSkill(sequelize);

Object.values(db).forEach(model => {
  if (typeof model.associate === 'function') {
    model.associate(db);
  }
});
await sequelize.sync({ alter: true });

export default db;
