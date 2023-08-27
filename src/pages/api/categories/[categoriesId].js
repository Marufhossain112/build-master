import { client, categoriesCollection } from "@/utils/db.utils";

async function run(req, res) {
    try {
        await client.connect();
        if (req.method === "GET") {
            const { categoriesId } = req.query;
            // console.log("categoriesId ", typeof categoriesId);
            const categoryItem = await categoriesCollection.findOne({ id: categoriesId });
            // console.log("featureItem", typeof categoryItem);
            res.send({ message: "success", status: 200, data: categoryItem });
        }
    } finally {
        // Close the client connection
        // await client.close();
    }
}

export default run;
