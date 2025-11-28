# 1Nation :newspaper_roll:
1Nation is a data visualization platform that provides quick and accessible views of the economic performance of various countries.

## Tech Stack :hammer_and_wrench:
Backend : NodeJS , ExpressJS  \
Database : MongoDB (Moongoose) \
Frontend: Bootstrap , HTML , CSS \
Templating : EJS \
API Integration : World Bank Data API 

## Functionality :bar_chart:

Pull information based on indicators from the World Bank Data API . 

Transform the extracted API Data and make it accessible through an API Endpoint. 

Visualize the data with ChartJS 

Store relevant country information in MongoDB database to execute API Calls. 

## Prerequisites
Before running this project, ensure you have the following installed and configured:

* Node.js (v18 or higher recommended)

* npm or yarn package manager

* MongoDB  installed and running locally

* Download and install from MongoDB Community Server

* Ensure the MongoDB service is running (mongod) before starting the app

* Create a database to hold country information 
  
* Ensure that the URI is similiar to this : MONGO_URI=mongodb://localhost:27019/myNationsDB

## Installation 
### Clone the repository
* git clone https://github.com/ramm14/Omnia.git
* cd project

### Install dependencies
* npm install

### Start MongoDB locally
* mongod
* Ensure MongoDB is running before starting the app.

### Run the application
* Integrate personal URIs into the project
* nodemon app.js
* Add Countries through /addNation route 





