
const express = require("express");
const { json } = require("express/lib/response");

const {recordCollection, recordsTable} = require("../models/index.js");
const recordRouter = express.Router();
const bearer=require("../middleware/bearer");


recordRouter.get("/record",getAll);
recordRouter.post("/record",creatRecord);
recordRouter.put("/record/:id",updating);
recordRouter.delete("/record/:id",deleting);
recordRouter.get("/record/:id",getOneRecored);


////////////////creat=insert////////////////////
async function creatRecord(req,res){
let newrecord =req.body;
let newRecored=await recordCollection.create(newrecord);
res.status(201).json(newRecored);


}
///////////select *//////////////////
async function getAll(req,res){
    console.log(req.params);
    let record = await recordCollection.read();
    // let userRecord= await recordsTable.findAll({where:{userId:req.body.userId}})
    res.status(200).json(record);

}

///////////////update/////////
async function updating(req,res){

    let id = parseInt(req.params.id);
    let newRecored = req.body;
    let found = await recordCollection.read(id);
    if (found) {
        let updated = await found.update(newRecored);
        res.status(201).json(updated);
    }
}
/////////////delete///////////////
async function deleting(req,res){

    let id = parseInt(req.params.id);
    let deleted = await recordCollection.delete(id);
    res.status(204).json(deleted);
}

/////////////get one/////////////

async function getOneRecored(req,res)
{
    console.log(req.params);

    const id = parseInt(req.params.id);
    console.log("******************************",req.params);
    // let recored = await recordCollection.read(id);
    // record = await recordsTable.findOne({ where: { id:id } });

    let userRecord= await recordsTable.findAll({where:{userId:id}})
    res.status(200).json(userRecord);
}
module.exports=recordRouter;
// let userRecord= await recordsTable.findAll({where:{userId:req.body.id}})
//