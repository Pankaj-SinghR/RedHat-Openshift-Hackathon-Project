const Router = require("express");
const SERVICE = require("./service.js");

const router = Router();

router.get("/obu/", SERVICE.getAllOBU)
router.get("/obu/:obuId", SERVICE.getInvoiceWithId)

module.exports = router;
