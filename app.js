const express = require('express');

const app = express();
const cors = require("cors");
require("./config/db");
// const adminRouter = require("./routes/admin/admin.route");
// const customerRouter = require("./routes/customer/customer.route");
// const productRouter = require("./routes/customer/product.route");


app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// app.use("/api/v1/admin", adminRouter);
// app.use("/api/v1/customer", customerRouter);
// app.use("/api/v1/", productRouter);

app.get("/", (req, res)=>{
    res.status(404).json({
        message: "Welcome"
    })
});

app.use((req, res, next) =>{
    res.status(404).json({
        message: "Route not found"
    })
});

app.use((err, req, res, next) =>{
    res.status(500).json({
        message: "Something went wrong"
    })
});

module.exports = app;

