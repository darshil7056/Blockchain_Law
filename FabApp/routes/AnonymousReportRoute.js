const express = require("express")
const router = express.Router()
const {clientApplication} = require('../client');
const {Events} = require("../event")
let eventClient = new Events()
eventClient.contractEventListner("citizen", "Admin", "autochannel",
"chaincode", "AnonymousContract", "reportCrimeEvent")



router.get('/getReport/:id', function(req, res, next) {
    const reportId =  req.params.id
    let userReport = new clientApplication();
   
    userReport.generatedAndEvaluateTxn(
        "police",
        "Admin",
        "autochannel", 
        "chaincode",
        "AnonymousContract",
        "readReport",reportId
    )
    .then(cases => {
      const dataBuffer = cases.toString();
      console.log("cases are ", cases.toString())
      const value = JSON.parse(dataBuffer)
      console.log("History DataBuffer is",value)
      res.json({  title: 'Crime Reports', itemList: value});
    }).catch(err => {
      res.json({"err" : err})
    })
  });

  router.post('/postReport',function(req,res){

    const reportId = req.body.reportId;
    const crime_type = req.body.crime_type;
    const offense_date = req.body.offense_date;
    const offense_time = req.body.offense_time;
    const description = req.body.description;
    const area= req.body.area;
    const victim_name= req.body.victim_name;
    const victim_address= req.body.victim_address;
    const suspect_name= req.body.suspect_name;
    const suspect_address = req.body.suspect_address

    
  let generateReport = new clientApplication();
    
  generateReport.generatedAndSubmitTxn(
        "citizen",
        "Admin",
        "autochannel", 
        "chaincode",
        "AnonymousContract",
        "GenerateReport",
        reportId,
        crime_type,
        offense_date,
        offense_time,
        description,
        area,
        victim_name,
        victim_address,
        suspect_name,
        suspect_address,
      ).then(message => {
          console.log("Message is $$$$",message)
          res.status(200).send({message: "Report Generated"})
        }
      )
      .catch(error =>{
        console.log("Some error Occured $$$$###", error)
        res.status(500).send({error:`Failed to Add`,message:`${error}`})
      });
  });

  router.get('/postReportEvent', async function(req, res, next) {
    let reportClient = new clientApplication();
    const result = await reportClient.contractEventListner("citizen", "Admin", "autochannel", 
    "chaincode", "reportCrimeEvent")
    console.log("The result is ####$$$$",result)
    res.json( {view: "carEvents", results: result })
  })

  router.get('/getAllReport', function(req, res, next) {
    let userReport = new clientApplication();
   
    userReport.generatedAndEvaluateTxn(
        "police",
        "Admin",
        "autochannel", 
        "chaincode",
        "AnonymousContract",
        "queryAllReport"
    )
    .then(cases => {
      const dataBuffer = cases.toString();
      console.log("cases are ", cases.toString())
      const value = JSON.parse(dataBuffer)
      console.log("History DataBuffer is",value)
      res.json({  title: 'Crime Reports', itemList: value});
    }).catch(err => {
      res.json({"err" : err})
    })
  });

module.exports = router