const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;

const {router: productInfo, fetchProducts} = require('./info/products');


app.use(express.json());


// main function that ensures that the array is full before all
const startServer = async () => {
    try {
        await fetchProducts();
        app.use(cors());
        app.use('/api', productInfo);

        app.listen(port, () => {
            console.log(`Listening on port http://localhost:${port}`);
        });

    } catch (e){
        console.error('Error starting server:', e);
    }
}

startServer().then(() => {
    console.log(`Server started successfully.`);
}).catch((e) => {
    console.error('Error starting server:', e);
});


