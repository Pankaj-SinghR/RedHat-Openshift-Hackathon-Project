const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const logger = require("./logger");

const fn = {
    dataStore: ({ obuid, lat, long, distance, price }) => {
        dataStore({ obuid, lat, long, distance, price });
    }
}

async function dataStore({ obuid, lat, long, distance, price }) {
    try {
        const result = await prisma.obu_invoice.findMany({
            where: {
                obu_id: obuid,
            },
            select: {
                total_distance: true,
                total_price: true,
            }
        })
        // console.log("Result", result);

        if (result.length === 0) {
            const data = await prisma.obu_invoice.create({
                data: {
                    obu_id: obuid,
                    start_lat: lat,
                    start_long: long,
                    dest_lat: 0.0,
                    dest_long: 0.0,
                    total_distance: distance,
                    total_price: price,
                    created_at: new Date().getTime() / 1000,
                    updated_at: new Date().getTime() / 1000
                }
            })
            logger.info(`Data Inserted in DB for obuid ${obuid}`);
            // console.log(data);
        } else {
            const { total_distance, total_price } = result[0]
            const data = await prisma.obu_invoice.update({
                where: {
                    obu_id: obuid
                },
                data: {
                    dest_lat: lat,
                    dest_long: long,
                    total_distance: distance + total_distance,
                    total_price: price + total_price,
                    updated_at: new Date().getTime() / 1000
                }
            })
            logger.info(`Data Updated in DB for obuid ${obuid}`);
            // console.log(data);
        }

    } catch (error) {
        logger.error(`Error while storing data for obuid ${obuid}: ${error}`);
    }
    // console.log("Data stored in Database", obuid, distance, price);
}

module.exports = fn;
