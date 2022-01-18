const rp = require('request-promise');
const cheerio = require('cheerio').default;
const nodemailer = require('nodemailer');
const express = require('express')
const app = express()
const port = 3000


const url = 'http://www.mumresults.in/';
const jar = true;
var options = {
  url: url,
  jar: true,
};

const accountSid = "AC301dd2f5aa8c7520737e10dafc096679";
const authToken = "bffb9e89d9f19ffce8f58c7599adb0b1";
const client = require('twilio')(accountSid, authToken);

loop();
async function loop() {
  var d = new Date();
  console.log("\n\nReading the website: " + d.toLocaleTimeString());
  await checkStatus();
  setTimeout(loop, 30000);
}


async function checkStatus() {
    const response = await rp(options).then(function(html){
    
    // check availablity by looking at text
    var availability =  cheerio('div.main > div.content_holder > div.content > div.row > table.counterthree > tbody >tr > td.exam > span >a', html);
    if(`${availability}.text()`.toLowerCase().includes("electronics and telecommunication")) {
        twilio('Result is out',accountSid,authToken);   
        console.log(`${availability}.text()`.toLowerCase().includes("electronics and telecommunication"));
    }
  }).catch(function(err){
    // handle error
    console.log(err);
  });
  }

  function twilio(twilioMessage,accountSid,authToken) {
const client = require('twilio')(accountSid, authToken);  
client.messages 
numbersToMessage = ['+917400383241']
numbersToMessage.forEach(async number => {
  const message = await client.messages.create({
    body: twilioMessage,
    messagingServiceSid: 'MG4053db6e95f16f40ee63b60424bd034c',
    from: '+19147642868',
    to: '+917400383241'
  });
  console.log(message.status)
});}


app.listen(port, () => {
  console.log(`nodemailerProject is listening at http://localhost:${port}`)
})