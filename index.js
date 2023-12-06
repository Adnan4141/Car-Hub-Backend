const express = require('express')
const cors = require("cors");
const app = express()
const port = process.env.PORT || 3000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
        const teamCollection = client.db("rental-service").collection("team")
        app.post('/add-a-vehicle', async (req, res) => {
            const vehicle = req.body;
            const result = await vehicleCollection.insertOne(vehicle);
            console.log(vehicle)
            res.send(result);
        })
      //add teammate information
        app.post('/add-teammate', async (req, res) => {
            const teammate = req.body;
            const result = await teamCollection.insertOne(teammate);
            console.log(teammate)
            res.send(result);
        })



        app.get('/all-vehicles', async (req, res) => {
            const result = await vehicleCollection.find().toArray();
            res.send(result);

        })

        //singleVehicle details
        app.get('/vehicle/:id', async (req, res) => {
            const id = req.params.id;
            const result = await vehicleCollection.findOne({ _id: new ObjectId(id) })
            res.send(result);
        })

        //update
        app.put('/update-by-id/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const updateVehicle = req.body;
            const updates = { $set: updateVehicle }

            const result = await vehicleCollection.updateOne(filter, updates);
            res.send(result);
        })

        //Delect
        app.delete('/delete-by-id/:id', async (req, res) => {
            const id = req.params.id;
            const filter = {_id: new ObjectId(id) };
            const result = await vehicleCollection.deleteOne(filter);
            res.send(result);
        });


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


