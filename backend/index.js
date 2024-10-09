import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import cors from "cors";
import patientRoute from "./routes/Health_Card/patientRoute.js";

const app = express();

app.use(express.json());

//app.use(cors());

//const Images = mongoose.model("productModel");

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('welcome to CARENET');
});

app.use('/patientRoute', patientRoute);



mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to the database');
        app.listen(PORT, () => {
            console.log(`App is listening to port : ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
