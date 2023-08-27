import { client, featuredProductsCollection } from "@/utils/db.utils";

async function run(req, res) {
    try {
        await client.connect();
        if (req.method === "GET") {
            const { featuredProductsId } = req.query;
            // console.log("featuredProductsId ", typeof featuredProductsId);
            const featuredProductItem = await featuredProductsCollection.findOne({ id: featuredProductsId });
            // console.log("featureItem", typeof featuredProductItem);
            res.send({ message: "success", status: 200, data: featuredProductItem });
        }
    } finally {
        // Close the client connection
        // await client.close();
    }
}

export default run;
