// Why does express doesnot have a typescript file as it is such a big library
// As express is written in JS not in TS, but developers write the types in different files
// npm install -d @types/express
import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { UserModel, ContentModel } from "./db";
import { userMiddleware } from "./middleware";

const app = express();
app.use(express.json());
const JWT_PASSWORD = "123123";

app.post("/api/v1/signup", async (req,res) => {
     
    const username = req.body.username;
    const password = req.body.password;

    try {
    await UserModel.create({
         username: username,
         password: password
    })

    res.json({
         message: "User signed up Successfully"
    })
  } catch(e) {
      res.status(411).json({
           message: "User already exists"
      })
  }
})

app.post("/api/v1/signin", async (req,res) => {
      const username = req.body.username;
      const password = req.body.password;

      const existingUser = await UserModel.findOne({
            username,
            password
      })
      if(existingUser) {
            const token = jwt.sign({
                 id: existingUser._id
            },JWT_PASSWORD)

            res.json({
                token
            })
      } else {
            res.status(403).json({
                 message: "Invalid Credentials"
            })
      }
})

app.post("/api/v1/content", userMiddleware, async (req,res) => {
     const link = req.body.link;
     const type = req.body.type;
     await ContentModel.create({
         link,
         type,
         //@ts-ignore
         userId: req.userId,
         tags: []
     })

     return res.json({
         message: "Content added"
     })
})

app.get("/api/v1/content", userMiddleware, async (req,res) => {
     //@ts-ignore
     const userId = req.userId
     await ContentModel.find({
         userId: userId
     }).populate("userId")

     return res.json({
          message: "Content get successfully"
     })
})

app.get("/api/v1/share", (req,res) => {

})

app.get("/api/v1/brain/:shareLink", (req,res) => {

})

const PORT =  3000;
app.listen(PORT, () => {
     console.log("Server listening to the port")
})