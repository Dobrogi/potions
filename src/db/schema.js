const { boolean } = require("drizzle-orm/gel-core");
const { mysqlTable, int, varchar } = require("drizzle-orm/mysql-core");

const potions = mysqlTable("potions", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }),
  email: varchar("effect", { length: 255 }).notNull().unique(),
  isDangerous: boolean("isDangerous").default(false),
});

module.exports = { potions };
