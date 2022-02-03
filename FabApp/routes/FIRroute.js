const express = require("express")

const router = express.Router();

const {clientApplication} = require('../client');
router.get('/get/:id', function(req, res, next) {
    const id = req.params.id
  let user = new clientApplication();
 
  user.generatedAndEvaluateTxn(
      "police",
      "Admin",
      "autochannel", 
      "chaincode",
      "PoliceContract",
      "readFIR",
      id
  )
  .then(cases => {
    const dataBuffer = cases.toString();
    console.log("cases are ", cases.toString()) 
    const value = JSON.parse(dataBuffer)
    console.log("History DataBuffer is",value)
    res.json({  title: 'FIR Details', data: value});
  }).catch(err => {
    res.json({"err" : err})
  })
});

router.get('/getAll', function(req, res, next) {
    let user = new clientApplication();
   
    user.generatedAndEvaluateTxn(
        "police",
        "Admin",
        "autochannel", 
        "chaincode",
        "PoliceContract",
        "queryAllCases"
    )
    .then(cases => {
      const dataBuffer = cases.toString();
      console.log("cases are ", cases.toString())
      const value = JSON.parse(dataBuffer)
      console.log("History DataBuffer is",value)
      res.json({  title: 'Pending Cases', itemList: value});
    }).catch(err => {
      res.json({"err" : err})
    })
  });

  router.get('/getHistory/:id', function(req, res, next) {
    let user = new clientApplication();
    const id = req.params.id
   
    user.generatedAndEvaluateTxn(
        "police",
        "Admin",
        "autochannel", 
        "chaincode",
        "PoliceContract",
        "getCaseHistory",id
    )
    .then(cases => {
      const dataBuffer = cases.toString();
      console.log("cases are ", cases.toString())
      const value = JSON.parse(dataBuffer)
      console.log("History DataBuffer is",value)
      res.json({  title: 'Case History', itemList: value});
    }).catch(err => {
      res.json({"err" : err})
    })
  });


  router.post('/create',function(req,res){

    const FIRId = req.body.FIRId;
    const case_status = req.body.case_status;
    const law_name = req.body.law_name;
    const offense_date = req.body.offense_date;
    const offense_time = req.body.offense_time;
    const description = req.body.description;
    const station_name= req.body.station_name;
    const witness_name= req.body.witness_name;
    const witness_age= req.body.witness_age;
    const witness_address= req.body.witness_address;
    const id_proof_status = req.body.id_proof_status

    
  
    // console.log("Request Object",req)
let PoliceFIR = new clientApplication();
    
PoliceFIR.generatedAndSubmitTxn(
        "police",
        "Admin",
        "autochannel", 
        "chaincode",
        "PoliceContract",
        "createFIR",
        FIRId,
        case_status,
        law_name,
        offense_date,
        offense_time,
        description,
        station_name,
        witness_name,
        witness_age,
        witness_address,
        id_proof_status,
      ).then(message => {
          console.log("Message is $$$$",message)
          res.status(200).send({message: "FIR created"})
        }
      )
      .catch(error =>{
        console.log("Some error Occured $$$$###", error)
        res.status(500).send({error:`Failed to Add`,message:`${error}`})
      });
  });

  router.post('/update',function(req,res){

    const FIRId = req.body.FIRId;
    const station_name= req.body.station_name;
    const case_status = req.body.case_status;
    
    let UpdateFIR = new clientApplication();
    
    UpdateFIR.generatedAndSubmitTxn(
        "police",
        "Admin",
        "autochannel", 
        "chaincode",
        "PoliceContract",
        "registerCase",
        FIRId,
        station_name,
        case_status,
      
      ).then(message => {
          console.log("Message is $$$$",message)
          res.status(200).send({message: "FIR created"})
        }
      )
      .catch(error =>{
        console.log("Some error Occured $$$$###", error)
        res.status(500).send({error:`Failed to Add`,message:`${error}`})
      });
  });

module.exports = router;
