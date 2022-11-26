


const redis = require("redis");
const mongoose = require('mongoose')

const todoModel = require('../model/todoModel')





//Connect to redis
const redisClient = redis.createClient(
    33713,
  "apn1-brave-adder-33713.upstash.io",
  { no_ready_check: true }
);
redisClient.auth("69b6358deaf14b44a0f44fbdb31adf8b",
    (err) => {
        if (err) { throw err; };
    });

redisClient.on("connect", async function () {
  console.log("Connected to Redis..");
});




const findTodo= async function (req, res) {

    const listTodo = await todoModel.find({isDeleted:false})
    if(!listTodo){
        return res.status(400).send({msg:"list is empty or deleted"})
    }
    return res.send({msg:"Here is your TO-Do List", data : listTodo});
};

const createTODO = async function (req, res)  {
   

    const requestBody = req.body;
    const{item,isDeleted}= requestBody
    
    const todoCreate = await todoModel.create(requestBody)

    return res.send({msg:"Todo List Created Successfully", data:todoCreate});
};



const deleteTodo = async function (req, res)  {
    try{
    const data = req.params.id

     if(!mongoose.isValidObjectId(data)){
        return res.status(400).send({msg:"please enter valid objectId"})
     }
    const itemFind = await todoModel.findOne({_id:data, isDeleted:false})
    if(!itemFind){
        return res.status(400).send({msg:"item not present Or may be deleted"})
    }

    const dataId = itemFind._id
    console.log(dataId);

    const todoDelete = await todoModel.findOneAndUpdate(
        {_id :dataId},
        {$set:{isDeleted:true}},
        {new:true})

    return res.status(200).send({msg:"list Item deleted successfully ", data: todoDelete});
}catch(err){
    return res.status(500).send({status : false, Error:err.message})
}
}





//************ */
   
    

module.exports = {findTodo,createTODO,deleteTodo}






