const express = require('express');

const { getRealGDPPerCapita , getYearlyRealGDPData, getAgeStructure } = require("./controller/nationLogic.js");



const path = require("path");

const axios = require('axios');

const mongoose = require('mongoose');

const { Nation } = require("./models/nationModel.js");

const app = express();

app.set("view engine","ejs");

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")))

app.set("views", path.join(__dirname, "/views"))




mongoose.connect("mongodb://localhost:27017/NationDB").then(()=>{
    console.log("Connected to DB!")
}).catch((err) =>{
    console.log("There was an error");
    console.log(err);
})

app.get("/", async (req, res) => {
    try{
        
        // const response = await axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=c8c9d77842324fcf9d43dd747388ca5f');
        // const articles = response.data.articles;
        // const topStory = articles[1];
        const nations =  await Nation.find({});
        res.render("Homepage" , { nations });
    }catch(err){
        console.log(err);
    }
})

app.get("/nation/:isocode3", async (req, res) => {
    const nationCode = req.params.isocode3
    const nation = await Nation.findOne({isocode3:nationCode})
    res.render("Nation" , { nation:nation });
});

app.get("/gdpPerCapita/:isocode3", async (req, res) => {
    const iso3 = req.params.isocode3;
    const gdpPerCapitaData = await getRealGDPPerCapita(iso3);
    res.json(gdpPerCapitaData);
})

app.get("/yearlyGDP/:isocode3", async (req, res) => {
    const iso3 = req.params.isocode3;
    const yearlyGDPData = await getYearlyRealGDPData(iso3);
    res.json(yearlyGDPData);
})

app.get("/ageStructure/:isocode3", async (req, res) => {
    const iso3 = req.params.isocode3;
    const ageStructureData = await getAgeStructure(iso3);
    res.json(ageStructureData);
})

app.get("/addNation", async(req,res)=>{
    res.render("AddCountries");
})

app.post("/addNation", async(req, res)=>{
    console.log(req.body);
    const countryInformation = req.body;
    await Nation.insertOne({name:countryInformation.countryName , isocode3:countryInformation.isoCode3, flagURL:countryInformation.flagURL})
    res.redirect("/");

})



app.listen(3006,() => {
    console.log("Server is running on port 3006");
})

