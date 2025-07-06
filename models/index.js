const User = require("./User");
const Payment = require("./Payment");
const Announcement = require("./Announcement");
const Event = require("./Event");
const Media = require("./Media");
const News = require("./News");
const Vacancy = require("./Vacancy");

User.hasMany(Payment, { foreignKeys: "userId" });
User.hasMany(Announcement, { foreignKeys: "userId" });
User.hasMany(Event, { foreignKeys: "userId" });
User.hasMany(Media, { foreignKeys: "uploadedBy" });
User.hasMany(News, { foreignKeys: "postedBy" });
User.hasMany(Vacancy, { foreignKeys: "postedBy" });

Payment.belongsTo(User, { foreignKey: "userId" });
Announcement.belongsTo(User, { foreignKey: "postedBy" });
Event.belongsTo(User, { foreignKey: "createdBy" });
Media.belongsTo(User, { foreignKey: "uploadedBy" });
News.belongsTo(User, { foreignKey: "postedBy" });
Vacancy.belongsTo(User, { foreignKey: "postedBy" });

module.exports = {
  User,
  Payment,
  Announcement,
  Contact,
  Event,
  Media,
  News,
  Service,
  Vacancy,
};
