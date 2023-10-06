const http = require("http");
require("dotenv").config();
const finance = require("./finance.js");
const PORT = process.env.PORT || 5001;

const server = http.createServer((req, res) => {
    switch (req.method) {
        case "GET":
            switch (req.url) {
                case '/api/finance':
                    const financeData = JSON.stringify(finance.getData());
                    res.statusCode = 200;
                    res.setHeader("Content-type", "application/json");
                    res.write(financeData);
                    res.end();    
                    break;
                
                case '/api/financeSummary':
                    const financeSummary = finance.getSummary();
                    res.statusCode = 200;
                    res.setHeader("Content-type", "application/json");
                    res.write(financeSummary);
                    res.end();    
                    break;
                default:
                    res.statusCode = 404;
                    res.setHeader("Content-type", "application/json");
                    res.write(JSON.stringify({message: "Route not found"}));
                    res.end();        
                    break;
            }
        
            break;
        case "POST":
            if (req.url === '/api/add') {
                let body = '';
                req.on('data', chunk => {
                    body += chunk.toString(); // convert Buffer to string
                });
                req.on('end', () => {
                    const response = finance.addData(body); 
                    if (response) {
                        res.statusCode = 200;
                        res.setHeader("Content-type", "application/json");
                        res.write(response);  
                    }  else {
                        res.statusCode = 500;
                        res.setHeader("Content-type", "application/json");
                        res.write(JSON.stringify({message: "Something went wrong"}));
                    }
                    res.end();
                });
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

