const express = require("express");
const cors = require("cors")
const http = require("http");
const router = require("./router.js");
const logger = require("./logger.js")
const path = require('path');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 8080
const httpServer = http.createServer(app);
app.use(express.static(path.join(__dirname, 'dist')));
app.use((req, res, next) => {
    logger.info(`Request: ${req.method} ${req.url}`);
    next();
})
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/invoice/api/v1", router);
app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

//Invoicer Listening on PORT 8081
httpServer.listen(PORT, () => {
    console.log(`TOLL INVOICER SERVER RUNNING ON PORT ${PORT} 🚀`);
});
