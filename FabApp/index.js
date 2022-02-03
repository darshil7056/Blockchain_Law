const express = require('express');
const FIRRoute =  require("./routes/FIRroute")
const AnonymousReportRoute = require("./routes/AnonymousReportRoute")
const sendSecuredMessage = require("./routes/sendSecuredMessage")



require("dotenv").config();
const { API_PORT } = process.env;
const port =  API_PORT;
const app = express();

var cors = require("cors");
//const auth = require("./middleware/authorization");
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  next();
});
app.use(express.json());

app.get("/",(req,res) => {
    res.send("hello minifab")
})

app.use("/FIR",FIRRoute)
app.use("/anonymous",AnonymousReportRoute)
app.use("/chat",sendSecuredMessage)
/* GET home page. */

  

  

app.listen(port, () => {
    console.log(`Server listening on the port::::::${port}`);
});
