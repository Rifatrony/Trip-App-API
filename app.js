const express = require('express');

const app = express();
const cors = require("cors");
require("./config/db");

const userRouter = require("./routes/user.routes");
const memberRouter = require("./routes/members.routes");
const tourRouter = require("./routes/tour.routes");
const costRouter = require("./routes/cost.routes");


app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// app.use("/api/v1/admin", adminRouter);
// app.use("/api/v1/customer", customerRouter);
// app.use("/api/v1/", productRouter);

app.use("/api/auth", userRouter);
app.use("/api/member", memberRouter);
app.use("/api/tour", tourRouter);
app.use("/api/cost", costRouter);

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

