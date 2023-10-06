const fs = require("fs");

function getData()
{
    try {
        const dataBuffer = fs.readFileSync("data/finance.json");
        const data = dataBuffer.toString();
        return data;
    } catch (error) {
        return [];
    }
}

function addData(body)
{   
    let financeData = this.getData();
    if (financeData.length > 0) {
        financeData = JSON.parse(financeData);
    } else {
        financeData = [];
    }
    body = JSON.parse(body);
    const transactionData = {
        name: body.name, 
        transactionType: body.typeOfTransaction,
        amount: body.amount 
    };
    financeData.push(transactionData);
    fs.writeFileSync("data/finance.json", JSON.stringify(financeData));
    return JSON.stringify(transactionData);
}

module.exports =  {    
    getData: getData,
    addData: addData
};