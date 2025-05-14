import Group from "./group.model.js";
import User from "./user.model.js";
import Expense from "./expense.model.js";

Group.belongsToMany(User, {through: "GroupMembers", as: "members"});
User.belongsToMany(Group, {through: "GroupMembers", as: "groups"});

Group.hasMany(Expense, { foreignKey: "groupId", as: "expenses" });
Expense.belongsTo(Group, { foreignKey: "groupId", as: "group" }); 

Expense.belongsTo(User, { foreignKey: "userId", as: "user" });
User.hasMany(Expense, { foreignKey: "userId", as: "expenses" });

export {Group, User, Expense};