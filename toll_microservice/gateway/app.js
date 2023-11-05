const express = require("express");
const cors = require("cors")
const http = require("http");
const router = require("./router.js");
const logger = require("./logger.js")

const app = express();
const PORT = 80
const httpServer = http.createServer(app);

app.use((req, res, next) => {
    logger.info(`Request: ${req.method} ${req.url}`);
    next();
})
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/invoice/api/v1", router);
app.use("*", (req, res) => {
    res.status(400).send({
        "message": "Invalid url",
    });
});

//Invoicer Listening on PORT 8081
httpServer.listen(PORT, () => {
    console.log(`TOLL INVOICER SERVER RUNNING ON PORT ${PORT} 🚀`);
});
