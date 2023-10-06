const http = require("http");
require("dotenv").config();
const finance = require("./finance.js");


const PORT = process.env.PORT || 5001;

const server = http.createServer((req, res) => {
    switch (req.method) {
        case "GET":
            if (req.url === '/api/finance') {
                const financeData = finance.getData();
                res.statusCode = 200;
                res.setHeader("Content-type", "application/json");
                res.write(financeData);
                res.end();
            } else {
                res.statusCode = 404;
                res.setHeader("Content-type", "application/json");
                res.write(JSON.stringify({message: "Route not found"}));
                res.end();
            }
            break;
        case "POST":
            if (req.url === '/api/add') {
                const financeData = finance.addData();
                res.statusCode = 200;
                res.setHeader("Content-type", "application/json");
                res.write(financeData);
                res.end();
            } else {
                res.statusCode = 404;
                res.setHeader("Content-type", "application/json");
                res.write(JSON.stringify({message: "Route not found"}));
                res.end();
            }
            break;
        case "PUT":
            putReq(req, res);
            break;
        case "DELETE":
            deleteReq(req, res);
            break;
        default:
            res.statusCode = 404;
            res.setHeader("Content-type", "application/json");
            res.write(JSON.stringify({title: "Not found",  message: "Route not found"}));
            res.end();        
    }
});

server.listen(PORT, () => {
    console.log("server started on port: "+ PORT);
})

