// index.js
const User = require("./User");
const Payment = require("./Payment");
const Announcement = require("./Announcement");
const Event = require("./Event");
const Media = require("./Media");
const News = require("./News");
const Vacancy = require("./Vacancy");
const Contact = require("./Contact");
const Service = require("./Service");

// Define associations
User.hasMany(Payment, { foreignKey: "userId", as: "payments" });
Payment.belongsTo(User, { foreignKey: "userId", as: "user" });

User.hasMany(Announcement, { foreignKey: "postedBy", as: "announcements" });
Announcement.belongsTo(User, { foreignKey: "postedBy", as: "user" });

User.hasMany(Event, { foreignKey: "createdBy", as: "events" });
Event.belongsTo(User, { foreignKey: "createdBy", as: "user" });

User.hasMany(Media, { foreignKey: "uploadedBy", as: "media" });
Media.belongsTo(User, { foreignKey: "uploadedBy", as: "user" });

User.hasMany(News, { foreignKey: "postedBy", as: "news" });
News.belongsTo(User, { foreignKey: "postedBy", as: "user" });

User.hasMany(Vacancy, { foreignKey: "postedBy", as: "vacancies" });
Vacancy.belongsTo(User, { foreignKey: "postedBy", as: "user" });

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
