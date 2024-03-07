const express = require('express');
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

const port = 4000;

app.use(express.json());

app.get("/get-posts", async(req, res) => {
    const posts = await prisma.post.findMany();

    res.send(posts)
    
});

app.post("/create-post", async(req, res) => {

    const postData = req.body;

    const post = await prisma.post.create({
        data: {
            title: postData.title,
            content: postData.content,
            creatorName: postData.creatorName,
            likes: postData.likes
        }
    });

    res.send({ post: post });

});

app.get("/test", (req, res) => {
    res.send({message: "helloo"});
});

app.listen(port, () => {
    console.log("app is running on port: " + port)
});