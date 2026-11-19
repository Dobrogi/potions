const express = require("express");
const db = require("../db/db");

const { potions } = require("../db/schema");
const { format } = require("mysql2");
const { default: responseHandler } = require("../utilities/responseHandler");
const { eq } = require("drizzle-orm");
const { AwsDataApiPreparedQuery } = require("drizzle-orm/aws-data-api/pg");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const entry = await db.select().from(potions);
    return res.status(200).json(entry);
  } catch (err) {
    return responseHandler(res, 404, { message: "gatya" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const [entries] = await db
      .select()
      .from(potions)
      .where(eq(potions.id, +req.params.id));
  } catch (err) {
    return responseHandler(res, 404, { message: "gatya" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, effect, isDangerous } = req.body;

    if (!name) return res.status(404).json({ message: "'name' is required!" });
    if (!effect)
      return res.status(404).json({ message: "'effect' is required!" });
    if (isDangerous === undefined)
      return res.status(404).json({ message: "'isDangerous' is required!" });

    await db.insert(potions).values({
      name: name,
      effect: effect,
      isDangerous: isDangerous,
    });
    return res.status(200).json({ message: "Succesful post!" });
  } catch (err) {
    return responseHandler(res, 500, { message: "post gatya" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const [entries] = await db
      .select()
      .from(potions)
      .where(eq(potions.id, +req.params.id));
    if (!entries) return res.status(404).json({ message: "id does not eixst" });
    await db.delete(potions).where(eq(potions.id, +req.params.id));
    return res.status(200).json({ message: "Succesful delete!" });
  } catch (err) {
    return responseHandler(res, 500, { message: "majre" });
  }
});

module.exports = router;
