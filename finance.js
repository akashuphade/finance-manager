const fs = require("fs");

function getData()
{
    try {
        const dataBuffer = fs.readFileSync("data/finance.json");
        let data = dataBuffer.toString();
        if (data.length > 0) {
            data = JSON.parse(data);
        } else {
            data = [];
        }
        return data;
    } catch (error) {
        return [];
    }
}

function addData(body)
{   
    let financeData = this.getData();
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

function getSummary()
{
    let financeData = this.getData();
    let summaryData = {};
    if (financeData.length > 0) {
        financeData.forEach(element => {
            if (element.name in summaryData) {
                if (element.transactionType === summaryData[element.name].transactionType) {
                    summaryData[element.name].amount =  summaryData[element.name].amount + element.amount;
                } else {
                    summaryData[element.name].amount =  summaryData[element.name].amount - element.amount;
                }
                
            } else {
                summaryData[element.name] = {
                    "type" : element.transactionType,
                    "amount" : element.amount
                };
            }
        });

        return JSON.stringify(summaryData);
    }
    return summaryData;
}

module.exports =  {    
    getData: getData,
    addData: addData,
    getSummary: getSummary
};