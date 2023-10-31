// calculatorService.js
// Data Format 
// {
//     "OBUId": UUID,
//     "Lat":   float,
//     "Long":  float,
// }

class CalculatorService {
    constructor() {
        this.prevLocation = new Map();
    }

    calculateDistance(data) {
        let distance = 0.0;
        if (this.prevLocation.has(data["OBUId"])) {
            let points = this.prevLocation.get(data["OBUId"])
            distance = calculateDistance(points[0], points[1], data.Lat, data.Long);
        }

        // console.log(this.prevLocation.get(data["OBUId"]));
        this.prevLocation.set(data["OBUId"], [data["Lat"], data["Long"]])
        // console.log(`[${data["Lat"]}, ${data["Long"]}]`);
        return distance;
    }
}

function calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

module.exports = CalculatorService;
