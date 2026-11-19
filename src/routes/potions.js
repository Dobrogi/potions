const express = require("express")
const db = require("../db/db")

const {potions} = require("../db/schema")
//const { format } = require("mysql2")
const { default: responseHandler } = require("../utilities/responseHandler")
const { eq } = require("drizzle-orm")

const router = express.Router()

router.get("/", async (req,res) =>{
    try{
    const entry = await db.select().from(potions)
    return res.status(200).json(entry)
    }
    catch(err){
        return responseHandler(res, 404, {message: "gatya"})
    }

})

routes.get("/:id", async (req,res) =>{
    try{
    const [entries] = await db.select().from(potions).where(eq(potions.id, +req.params.id))
    }
    catch(err){
        return responseHandler(res, 404, {message:gatya})
    }
})


module.exports = router