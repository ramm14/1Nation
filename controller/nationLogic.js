const axios = require("axios");

async function getRealGDPPerCapita(isoCode3) {
    const response = await axios.get(`https://api.worldbank.org/v2/country/${isoCode3}/indicator/NY.GDP.PCAP.CD?date=2020:2024&format=json`);
    const data = response.data;
    const gdpPerCapitaData = retrieveYearandValue(data);
    console.log(gdpPerCapitaData);
    return gdpPerCapitaData;
}

async function getPopulation(isoCode3) {
    const response = await axios.get(`https://api.worldbank.org/v2/country/${isoCode3}/indicator/SP.POP.TOTL?date=2024&format=json`);
    const data = response.data;
    const population2024 = data[1][0].value;
    return population2024;
}

async function getAgeStructure(isoCode3) {
    const responseUnder14 = await axios.get(`https://api.worldbank.org/v2/country/${isoCode3}/indicator/SP.POP.0014.TO.ZS?format=json`);
    const dataUnder14 = responseUnder14.data;
    const responseUnder65 = await axios.get(`https://api.worldbank.org/v2/country/${isoCode3}/indicator/SP.POP.1564.TO.ZS?format=json`);
    const dataUnder65 = responseUnder65.data;
    const responseOver65 = await axios.get(`https://api.worldbank.org/v2/country/${isoCode3}/indicator/SP.POP.65UP.TO.ZS?format=json`);
    const dataOver65 = responseOver65.data;
    const ageStructureData = {'0-14': roundPercentage(dataUnder14) , '15-65': roundPercentage(dataUnder65) , '65+': roundPercentage(dataOver65)}
    return ageStructureData;
}

async function getYearlyRealGDPData(isocode3){
    const response = await axios.get(`https://api.worldbank.org/v2/country/${isocode3}/indicator/NY.GDP.MKTP.KD?date=2020:2024&format=json`);
    const data = response.data;
    const yearlyGDP = retrieveYearandValue(data);
    return yearlyGDP;
}



// Helper Functions

function retrieveYearandValue(data){ // Helper function to format GDP data
    const fomattedData = [];
    const arr = data[1];
    for(let i = 4; i >= 0; i--){
        const year = arr[i].date;
        const yearValue = arr[i].value;
        fomattedData.push({year, yearValue});
        }
    return fomattedData;
}

function roundPercentage(data){
    const perc = data[1][0].value;
    const roundedPercString = perc.toFixed(2);
    const roundedPerc = parseFloat(roundedPercString);
    return roundedPerc;
}






module.exports = {
    getRealGDPPerCapita,getAgeStructure , getYearlyRealGDPData
};