const express = require('express');
const fs = require('fs');
require('dotenv').config();
const todoRouter = require('./todo/route');
const authRouter = require('./auth/routes');
const validateUser = require('./middlewares/validateUser');
const { connectToDb } = require('./utils/db');
const  userRouter  = require('./users/user.route');

const server = express();
var cors = require('cors');

server.use(cors());

server.use(express.json());
server.use(express.urlencoded({ extended: true }));


server.get("/",(req,res)=>{
    res.send("Welcome to the todo application");
});

server.use("/user",userRouter);
server.use("/todo",
    validateUser,
    todoRouter);
server.use("/auth",authRouter);


server.listen(3000,async()=>{
    await connectToDb();
    
    console.log("server is listening on port 3000");
})
