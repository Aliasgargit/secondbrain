"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Why does express doesnot have a typescript file as it is such a big library
// As express is written in JS not in TS, but developers write the types in different files
// npm install -d @types/express
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("./db");
const middleware_1 = require("./middleware");
const utils_1 = require("./utils");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const JWT_PASSWORD = "123123";
app.post("/api/v1/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        await db_1.UserModel.create({
            username: username,
            password: password
        });
        res.json({
            message: "User signed up Successfully"
        });
    }
    catch (e) {
        res.status(411).json({
            message: "User already exists"
        });
    }
});
app.post("/api/v1/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = await db_1.UserModel.findOne({
        username,
        password
    });
    if (existingUser) {
        const token = jsonwebtoken_1.default.sign({
            id: existingUser._id
        }, JWT_PASSWORD);
        res.json({
            token
        });
    }
    else {
        res.status(403).json({
            message: "Invalid Credentials"
        });
    }
});
app.post("/api/v1/content", middleware_1.userMiddleware, async (req, res) => {
    const link = req.body.link;
    const type = req.body.type;
    await db_1.ContentModel.create({
        link,
        type,
        //@ts-ignore
        userId: req.userId,
        tags: []
    });
    return res.json({
        message: "Content added"
    });
});
app.get("/api/v1/content", middleware_1.userMiddleware, async (req, res) => {
    //@ts-ignore
    const userId = req.userId;
    const contents = await db_1.ContentModel.find({
        userId: userId
    }).populate("userId", "username - _id");
    return res.json({
        data: contents,
        message: "Content get successfully"
    });
});
app.delete("/api/v1/content", async (req, res) => {
    //@ts-ignore
    const userId = req.userId;
    await db_1.ContentModel.deleteOne({
        userId: userId
    });
    return res.json({
        message: "Content deleted successfully"
    });
});
app.post("/api/v1/brain/share", middleware_1.userMiddleware, async (req, res) => {
    const share = req.body.share;
    if (share) {
        const existingLink = await db_1.LinkModel.findOne({
            //@ts-ignore
            userId: req.userId
        });
        if (existingLink) {
            res.json({
                hash: existingLink.hash
            });
            return;
        }
        const hash = (0, utils_1.random)(10);
        await db_1.LinkModel.create({
            //@ts-ignore
            userId: req.userId,
            hash: hash
        });
        res.json({
            message: "/share/" + hash
        });
    }
    else {
        await db_1.LinkModel.deleteOne({
            //@ts-ignore
            userId: req.userId
        });
        return res.json({
            message: "Link share successfully"
        });
    }
});
app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;
    const link = await db_1.LinkModel.findOne({ hash });
    if (!link) {
        return res.json({
            message: "Invalid share Link"
        });
    }
    const content = await db_1.ContentModel.find({
        userId: link.userId
    });
    console.log(link);
    const user = await db_1.UserModel.findOne({
        userId: link.userId
    });
    if (!user) {
        return res.status(411).json({
            message: "User doesnot exist"
        });
    }
    return res.json({
        content: content,
        username: user?.username,
        message: "Link get successfully"
    });
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log("Server listening to the port");
});
//# sourceMappingURL=index.js.map