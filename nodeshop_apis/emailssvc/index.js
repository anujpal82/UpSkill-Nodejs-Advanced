const AWS = require('aws-sdk');
const { Consumer } = require('sqs-consumer');
const nodemailer = require('nodemailer');
const dotenv=require('dotenv')
dotenv.config();

// less secure apps setting is not availaible now.
// Configure the region
AWS.config.update({region: process.env.region});

const queueUrl = process.env.queueUrl;

// Configure Nodemailer to user Gmail
let transport = nodemailer.createTransport({
    host:process.env.host,
    port: process.env.port,
    auth: {
        user: process.env.user,
        pass: process.env.pass
    }
});

function sendMail(message) {
    let sqsMessage = JSON.parse(message.Body);
    const emailMessage = {
        from: process.env.from,    // Sender address
        to: sqsMessage.userEmail,     // Recipient address
        subject: 'Order Received | NodeShop',    // Subject line
        html: `<p>Hi ${sqsMessage.userEmail}.</p. <p>Your order of ${sqsMessage.itemsQuantity} ${sqsMessage.itemName} has been received and is being processed.</p> <p> Thank you for shopping with us! </p>` // Plain text body
    };

    transport.sendMail(emailMessage, (err, info) => {
        if (err) {
            console.log(`EmailsSvc | ERROR: ${err}`)
        } else {
            console.log(`EmailsSvc | INFO: ${info}`);
        }
    });
}

// Create our consumer
const app = Consumer.create({
    queueUrl: queueUrl,
    handleMessage: async (message) => {
        sendMail(message);
    },
    sqs: new AWS.SQS()
});

app.on('error', (err) => {
    console.error(err.message);
});

app.on('processing_error', (err) => {
    console.error(err.message);
});

console.log('Emails service is running');
app.start();