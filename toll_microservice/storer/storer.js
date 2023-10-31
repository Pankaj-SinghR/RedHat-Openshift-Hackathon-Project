const grpc = require("@grpc/grpc-js");
const path = require("path");
const PROTO_PATH = path.join(__dirname, "grpc", "obu.proto");
const protoLoader = require("@grpc/proto-loader");
const fn = require("./helper");
const logger = require("./logger"); // Import the logger
const GRPC_HOST = process.env.GRPC_HOST || 'localhost'
const GRPC_PORT = process.env.GRPC_PORT || 50051

const basePrice = 0.10; // $0.10 per meter charge

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};
const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const obuProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

server.addService(obuProto.ObuService.service, {
    storeDataInPostgres: async (call, callback) => {
        const resData = call.request;
        const obuid = resData["obuid"];
        const lat = resData["lat"];
        const long = resData["long"];
        const distance = resData["distance"];

        // calculate the price of covered distance
        const price = distance * basePrice;
        // Log the calculated price
        logger.info(`Price calculated for obuid ${obuid}: $${price}`);
        // Log the data before storing it in the database
        logger.info(`Storing data for obuid ${obuid}: Lat: ${lat}, Long: ${long}, Distance: ${distance}, Price: $${price}`);
        // Store info in the Postgres database
        fn.dataStore({ obuid, lat, long, distance, price });

        callback(null, {});
    }
});

server.bindAsync(
    `${GRPC_HOST}:${GRPC_PORT}`,
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
        if (error) {
            logger.error(`Storer Server failed to start: ${error}`);
        } else {
            logger.info(`Storer Server running at http://${GRPC_HOST}:${GRPC_PORT}`);
            server.start();
        }
    }
);
