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
    const financeData = JSON.parse(this.getData());
    body = JSON.parse(body);
    const transactionData = {
        name: body.name, 
        transactionType: body.typeOfTransaction,
        amount: body.amount 
    };
    console.log(transactionData);
    financeData.push(transactionData);
    fs.writeFileSync("data/finance.json", JSON.stringify(financeData));
    return JSON.stringify(transactionData);
}

module.exports =  {    
    getData: getData,
    addData: addData
};