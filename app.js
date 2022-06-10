const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const bodyParser = require('body-parser');
const OrderRoutes = require('./routes/OrderRoutes.js');
const ProductRoutes = require('./routes/ProductRoutes.js');
const UserRoutes = require('./routes/UserRoutes.js');
const SellerRoutes = require('./routes/SellerRoutes.js');

const app = express()
app.use( cors() );
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/user", UserRoutes);
app.use("/product", ProductRoutes);
app.use("/order", OrderRoutes);
app.use("/seller", SellerRoutes);
app.listen({ port: 5000 }, async () => {
    console.log('Server up on http://localhost:5000')
    await sequelize.authenticate()
    //await sequelize.sync({alter: true})
    console.log('Database Connected!')
})