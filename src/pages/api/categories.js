import { client, categoriesCollection } from "@/utils/db.utils";

async function run(req, res) {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        if (req.method === "GET") {
            const categories = await categoriesCollection.find({}).toArray();
            res.send({ message: "success", status: 200, data: categories });
        }
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
// run().catch(console.dir);
export default run;