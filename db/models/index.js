const { User, UserSchema } = require('./user.models');

function setupModel(sequelize) {
  User.init(UserSchema, User.config(sequelize));
}

module.exports = { setupModel };
