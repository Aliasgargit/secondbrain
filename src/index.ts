// Why does express doesnot have a typescript file as it is such a big library
// As express is written in JS not in TS, but developers write the types in different files
// npm install -d @types/express
import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { UserModel, ContentModel, LinkModel } from "./db";
import { userMiddleware } from "./middleware";
import { random } from "./utils";
import cors from "cors";

const app = express();
app.use(express.json());
const JWT_PASSWORD = "123123";

app.use(cors({
  origin: "http://localhost:4200",
  credentials: true
}));

app.post("/api/v1/signup", async (req, res) => {

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
    } catch (e) {
        res.status(411).json({
            message: "User already exists"
        })
    }
})

app.post("/api/v1/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const existingUser = await UserModel.findOne({
        username,
        password
    })
    if (existingUser) {
        const token = jwt.sign({
            id: existingUser._id
        }, JWT_PASSWORD)

        res.json({
            token
        })
    } else {
        res.status(403).json({
            message: "Invalid Credentials"
        })
    }
})

app.post("/api/v1/content", userMiddleware, async (req, res) => {
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

app.get("/api/v1/content", userMiddleware, async (req, res) => {
    //@ts-ignore
    const userId = req.userId
    const contents = await ContentModel.find({
        userId: userId
    }).populate("userId", "username - _id")

    return res.json({
        data: contents,
        message: "Content get successfully"
    })
})

app.delete("/api/v1/content", async (req, res) => {
    //@ts-ignore
    const userId = req.userId
    await ContentModel.deleteOne({
        userId: userId
    })

    return res.json({
        message: "Content deleted successfully"
    })
})

app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
    const share = req.body.share;
    if (share) {
        const existingLink = await LinkModel.findOne({
             //@ts-ignore
             userId: req.userId
        });

        if(existingLink) {
            res.json({
                 hash: existingLink.hash
            })
            return;
        }
        const hash = random(10)
        await LinkModel.create({
            //@ts-ignore
            userId: req.userId,
            hash: hash

        })

        res.json({
             message: "/share/" + hash
        })
    } else {
        await LinkModel.deleteOne({
            //@ts-ignore
            userId: req.userId
        })

        return res.json({
            message: "Link share successfully"
        })
    }

})

app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;

    const link = await LinkModel.findOne({ hash });
    if (!link) {
        return res.json({
            message: "Invalid share Link"
        })
    }

    const content = await ContentModel.find({
        userId: link.userId
    })

    console.log(link);
    const user = await UserModel.findOne({
        _id: link.userId
    })

    if(!user) {
        return res.status(411).json({
             message: "User doesnot exist"
        })
    }

    return res.json({
        content: content,
        username: user?.username,
        message: "Link get successfully"
    })
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log("Server listening to the port")
})