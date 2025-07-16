import { initUser } from './user.model.js';
import { sequelize } from '../config/database.js';

const db = {};
db.sequelize = sequelize;
db.User = initUser(sequelize);

Object.values(db).forEach(model => {
  if (typeof model.associate === 'function') {
    model.associate(db);
  }
});
await sequelize.sync();

export default db;
