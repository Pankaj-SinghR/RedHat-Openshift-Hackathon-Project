const WebSocket = require("ws");
const { v4 } = require('uuid');
const yargs = require('yargs');

const URL = yargs.argv.url || 'ws://localhost:8080/ws';
const numObuDevices = yargs.argv.obu || 20;
let ws;
let isConnected = false;

function main() {
    let obuIDS = generateOBUIDS(numObuDevices);

    ws = new WebSocket(URL);

    ws.on('open', async () => {
        isConnected = true;
        console.log('Connected to OBU server');
        await sendLoop(obuIDS);
    });

    ws.on('close', () => {
        isConnected = false;
        console.log('Disconnected from OBU server');
        setTimeout(main, 1000);
    });

    ws.on('error', () => {
        console.log("Connection Error");
    })
}

// Start the main function
main();

// Send data in a loop as long as the connection is open
async function sendLoop(obuIDS) {
    while (isConnected) {
        for (let i = 0; i < obuIDS.length; i++) {
            if (isConnected) {
                let data = {
                    "OBUId": obuIDS[i],
                    "Lat": getCoord(),
                    "Long": getCoord(),
                }

                ws.send(JSON.stringify(data));
                console.log(JSON.stringify(data));
            }
        }
        await sleep(5000);
    }
}

// HELPER FUNC: generate random OBU ids
function generateOBUIDS(n) {
    let ids = []
    for (let i = 0; i < n; i++) {
        ids.push(v4())
    }
    return ids;
}

// HELPER FUNC: generate random latitude and longitude
function getCoord() {
    const n = Math.random() * 100 + 1;
    const f = Math.random();
    return n + f;
}

// Sleep function
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

