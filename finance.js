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

function addData()
{
    const data = this.getData();
}

module.exports = {
    getData: getData
};