const fs = require("fs");
const highland = require("highland");

let files = fs.readdirSync(__dirname + '\\data', "utf8");

files.forEach(file => {
    console.log(file);
    let filepath = __dirname + '\\data\\'+ file;
    highland(fs.createReadStream(filepath,"utf8"))
        .debounce(1000)
        .split()
        .map(line => line.split(','))
        .map(parts => ({
            fullname : parts[0] + ' ' + parts[1],
            num1 : parts[2]
        }))
        .each(x =>
            console.log("each: " , x, file))
        .done(x => {
            fs.unlinkSync(filepath);
            console.log("done")
        });
});


console.log("test async");


