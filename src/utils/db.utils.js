// /src/dbUtils.js

import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = "mongodb+srv://only_me:112022@cluster0.efpjwcu.mongodb.net/?retryWrites=true&w=majority";
export const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
export const categoriesCollection = client.db("productsDatabase").collection("categories");
export const featuredProductsCollection = client.db("productsDatabase").collection("featuredProducts");

