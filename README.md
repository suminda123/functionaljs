# functionaljs

const fs = require("fs");
const highland = require("highland");
highland(fs.createReadStream("customer.csv","utf8"))
    .split()
    .map(line => line.split(','))
    .map(parts => ({
        fullname : parts[0] + ' ' + parts[1],
        num1 : parts[2]
    }))
    .each(x => console.log("each: " , x));
