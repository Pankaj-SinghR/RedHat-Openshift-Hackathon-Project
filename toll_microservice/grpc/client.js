const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = "../grpc/obu.proto";

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
    "localhost:50051",
    grpc.credentials.createInsecure()
);

module.exports = client;
