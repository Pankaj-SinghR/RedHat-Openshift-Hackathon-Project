const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");
const PROTO_PATH = path.join(__dirname, "obu.proto");
const GRPC_HOST = process.env.GRPC_HOST || 'localhost'
const GRPC_PORT = process.env.GRPC_PORT || 50051

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);

const ObuService = grpc.loadPackageDefinition(packageDefinition).ObuService;

const client = new ObuService(
    `${GRPC_HOST}:${GRPC_PORT}`,
    grpc.credentials.createInsecure()
);

module.exports = client;
