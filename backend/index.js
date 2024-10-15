import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import cors from "cors";
import patientRoute from "./routes/Health_Card/patientRoute.js";

import appointmentRoute from "./routes/appointmentRoute.js";
import doctorRoute from "./routes/doctorRoute.js";

import serviceRoute from "./routes/Health_Card/serviceRoute.js";

import paymentRoute from "./routes/Payment/paymentRoute.js";



const app = express();

app.use(express.json());

// app.use(cors());

//const Images = mongoose.model("productModel");

app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type"],
    })
);

app.get("/", (request, response) => {
    console.log(request);
    return response.status(234).send("welcome to CARENET");
});


app.use('/patientRoute', patientRoute);
app.use('/paymentRoute', paymentRoute);



//tharushi
app.use("/appointmentRoute", appointmentRoute);
app.use("/doctorRoute", doctorRoute);
app.use("/serviceRoute", serviceRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("App connected to the database");
        app.listen(PORT, () => {
            console.log(`App is listening to port : ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
