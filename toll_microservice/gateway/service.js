const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

const SERVICE = {
    getAllOBU: (req, res) => {
        getAllOBU(req, res);
    },
    getInvoiceWithId: (req, res) => {
        getInvoiceWithId(req, res);
    }
};

async function getAllOBU(req, res) {
    try {
        const result = await prisma.obu_invoice.findMany();
        res.status(200).send({
            "status": 200,
            "data": {
                "obu_data": result
            }
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            "status": 400,
            "message": error.message,
        })
    }
}

async function getInvoiceWithId(req, res) {
    try {
        const params = req.params
        if (params !== undefined) {
            const result = await prisma.obu_invoice.findFirst({
                where: {
                    obu_id: params["obuId"]
                }
            });

            res.status(200).send({
                "status": 200,
                "data": {
                    "obu_data": result
                }
            })

        } else throw error("OBUId not found!!")

    } catch (error) {
        console.log(error);
        res.status(400).send({
            "status": 400,
            "message": error.message,
        })
    }
}

module.exports = SERVICE
