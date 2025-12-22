const express = require('express');

const { getRealGDPPerCapita , getYearlyRealGDPData, getAgeStructure } = require("./controller/nationLogic.js");

require('dotenv').config();

const { connectDB } = require("./Helper Functions/dbConnection.js");

const { Nation } = require("./models/nationModel.js");

const path = require("path");

const axios = require('axios');

const mongoose = require('mongoose');

const { Redis } = require('@upstash/redis');

const redis = new Redis({
  url: 'https://one-squid-25693.upstash.io',
  token: process.env.REDISTOKEN,
})


const app = express();

app.set("view engine","ejs");

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")))

app.set("views", path.join(__dirname, "/views"))


app.use((req, res, next) => {
    res.locals.isDBConnected = true;
    next();
})

connectDB().then(() => console.log("DB Connected")).catch((err) => console.log("DB Connection Error: ", err));

app.get("/", async (req, res) => {
    try{
        const currentDBStatus = res.locals.isDBConnected;
        res.locals.isDBConnected = await connectDB(currentDBStatus);
        // const response = await axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=c8c9d77842324fcf9d43dd747388ca5f');
        // const articles = response.data.articles;
        // const topStory = articles[1];
        const key = req.path;
        const cacheNationData = await redis.get(key);
        if (cacheNationData) {
            console.log(cacheNationData);
            return res.render("Homepage" , { nations: cacheNationData });
        }
        else{
            const nations =  await Nation.find({});
            await redis.set(key, JSON.stringify(nations));
            return res.render("Homepage" , { nations: nations });
        }
    }catch(err){
        console.log(err);
    }
})

app.get("/nation/:isocode3", async (req, res) => {
    const currentDBStatus = res.locals.isDBConnected;
    res.locals.isDBConnected = await connectDB(currentDBStatus);
    const key = req.path;
    const cacheNationData = await redis.get(key);
    const nationCode = req.params.isocode3
    if (cacheNationData) {
        console.log(cacheNationData);
        return res.render("Nation" , { nation: cacheNationData });
    }
    else{
        const nation = await Nation.findOne({isocode3:nationCode});
        await redis.set(key, JSON.stringify(nation));
        return res.render("Nation" , { nation:nation });
    }
});

app.post("/search", async (req, res) => {
    const nationName = req.body.nationName;
    const formattedName =  nationName.charAt(0).toUpperCase() + nationName.slice(1)
    const nation = await Nation.findOne({name:formattedName});
    if(!nation){
        return res.redirect("/"); 
    }
    const nationCode = nation.isocode3;
    res.redirect(`/nation/${nationCode}`);
});

app.get("/addNation", async(req, res)=>{
    res.render("AddCountries");
})

app.post("/addNation", async(req, res)=>{
    const currentDBStatus = res.locals.isDBConnected;
    res.locals.isDBConnected = await connectDB(currentDBStatus);
    console.log(req.body);
    const countryInformation = req.body;
    await Nation.insertOne({name:countryInformation.countryName , isocode3:countryInformation.isoCode3, flagURL:countryInformation.flagURL})
    res.redirect("/");
})

// API ENDPOINTS 
app.get("/gdpPerCapita/:isocode3", async (req, res) => {
    const currentDBStatus = res.locals.isDBConnected;
    res.locals.isDBConnected = await connectDB(currentDBStatus);
    const iso3 = req.params.isocode3;
    const key = req.path;
    const cacheNationData = await redis.get(key);
    if (cacheNationData) {
        return res.json(cacheNationData);
        
    }
    else{
        const gdpPerCapitaData = await getRealGDPPerCapita(iso3);
        await redis.set(key, JSON.stringify(gdpPerCapitaData));
        return res.json(gdpPerCapitaData);
    }

})

app.get("/yearlyGDP/:isocode3", async (req, res) => {
    const currentDBStatus = res.locals.isDBConnected;
    res.locals.isDBConnected = await connectDB(currentDBStatus);
    const iso3 = req.params.isocode3;
    const key = req.path;
    const cacheNationData= await redis.get(key);
    if (cacheNationData) {
        return res.json(cacheNationData);
    }
    else{
        const yearlyGDPData = await getYearlyRealGDPData(iso3);
        await redis.set(key, JSON.stringify(yearlyGDPData));
        return res.json(yearlyGDPData);
    }
})

app.get("/ageStructure/:isocode3", async (req, res) => {
    const currentDBStatus = res.locals.isDBConnected;
    res.locals.isDBConnected = await connectDB(currentDBStatus);
    const iso3 = req.params.isocode3;
    const key = req.path;
    const cacheNationData = await redis.get(key);
    if (cacheNationData) {
        return res.json(cacheNationData);
    }
    else{
        const ageStructureData = await getAgeStructure(iso3);
        await redis.set(key, JSON.stringify(ageStructureData));
        return res.json(ageStructureData);
    }

})





app.listen(3006,() => {
    console.log("Server is running on port 3006");
})

