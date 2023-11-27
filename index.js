const express = require('express')
const cors = require("cors");
const app = express()
const port = process.env.PORT || 3000;
const { MongoClient, ServerApiVersion } = require('mongodb');
require("dotenv").config();


app.use(express.json());
app.use(cors());
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.mpobb6h.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function run() {
    try {
        const vehicleCollection = client.db("rental-service").collection("vehicles");
        app.post('/add-a-vehicle', async (req, res) => {
            const vehicle = req.body;
            const result = await vehicleCollection.insertOne(vehicle);
            console.log(vehicle)
            res.send(result);
        })
        
        app.get('/all-vehicles', async (req, res) => {
            const result = await vehicleCollection.find().toArray();
            res.send(result);

        })
    }

    finally {
    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('Helloo World')
})

app.get('/Home', (req, res) => {
    res.send(user)
})


app.listen(port, () => {
    console.log(` http://localhost:${port}/ `)
})



//nodemon index.js
// npm i -g nodemon cors express mongodb
// npm install -g nodemon


