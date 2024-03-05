import express from "express";
import router from "./routes.mjs";
const app = express();

const port = 3500;

app.use("/", router);
app.use(express.json());

app.listen(port, () => {
    console.log("server running on port: " + port);
});