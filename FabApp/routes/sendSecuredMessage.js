const express = require("express")
const router = express.Router();
const {clientApplication} = require('../client');


// Create order
router.post('/sendMessage',async function(req,res){
    const secureChatId  = req.body.Id;
    const FIRId = req.body.FIRId;
    const clientName = req.body.clientName;
    const message = req.body.message;
    const details = req.body.details;
  
    let Client = new clientApplication();
  
    const transientData = {
        FIRId: Buffer.from(FIRId),
        clientName: Buffer.from(clientName),
        message: Buffer.from(message),
        details: Buffer.from(details)
    }
    
    Client.generatedAndSubmitPDC( 
      "lawyer",
      "Admin",
      "autochannel", 
      "chaincode",
      "SecureChatContract",
      "createSecureChat", secureChatId,transientData)
      .then(message => {
        
        res.status(200).send("Successfully created")
      }).catch(error =>{
       
        res.status(500).send({error:`Failed to create`,message:`${error}`})
      });
  
   })

   router.get('/ReadMessage/:id',async function(req,res){
    const secureChatId = req.params.id;
    let Client = new clientApplication();
    Client.generatedAndEvaluateTxn( 
      "lawyer",
      "Admin",
      "autochannel", 
      "chaincode",
      "SecureChatContract",
      "readSecureChat", secureChatId).then(message => {
     
      res.send({orderData : message.toString()});
    }).catch(error => {
      alert('Error occured')
    })
  
   })

module.exports = router;