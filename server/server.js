import http from "http";
import https from "https";
import express from "express";
import cors from "cors";
import sql from "mssql";
import reset from "nodemon";

import {hello, getLoginDetails} from "./dbOperations.js";
import {MercadoPagoConfig, Preference} from "mercadopago";

const client = new MercadoPagoConfig({
    accessToken: 'TEST-2010747068631903-021718-8dd760740f21f72f8ceefe54f8db27a6-536365689',
});

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

app.get("/", (req, res) => {
    res.send("Soy el server");
})

app.post("/create_preference", async(req, res) => {
    console.log("Create preference ");

    try {
        if(req.body.length > 0 ) {
            const body = {
                items: req.body.map(item =>                 
                    // { 
                        // console.log(item.title);
                        // console.log(item.quantity);
                        // console.log(item.title);
                        ({
                            title: item.title,
                            quantity: Number(item.quantity),
                            unit_price: Number(item.price),
                            currency_id: "ARS",
                        })
                    )
                    // {
                    //     title: req.body[1].title,
                    //     quantity: Number(req.body[1].quantity),
                    //     unit_price: Number(req.body[1].price),
                    //     currency_id: "ARS",
                    // }
                ,
                back_urls: {
                    //replace later with Home tab link
                    success: "https://education.nationalgeographic.org/resource/wind-energy/",
                    failure: "https://education.nationalgeographic.org/resource/wind-energy/",
                    pending: "https://education.nationalgeographic.org/resource/wind-energy/",
                },
                auto_return: "approved",
            };
    
            console.log(JSON.stringify(body));
    
            const preference = new Preference(client);
            const result = await preference.create({ body });
            res.json({
                id: result.id,
            });
        } else {
            console.log(JSON.stringify(req.body));
            res.json({
                id: 404,
            });
        }
        
    } catch(error) {
        console.log(error);
        res.status(500).json({
            error: "Error al crear la preferencia :(",
        });
    }   
})

app.get('/getProducts', async(req,res) => {

    var valor;
    getLoginDetails((results) => res.send({products: results}));

});

app.listen(5500, () => {
    console.log("hey app is listening");
});

