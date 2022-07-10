const express = require('express')
const app = express()
const port = 3000
const dotenv=require('dotenv')
dotenv.config();
const {sendEmail}=require('./aws-ses')

app.get('/', (req, res) => {
  
  
    const mailArr=[{mail:'mpal8074@gmail.com',name:'Mukesh'},{
        mail:'anujpal160180107030@gmail.com',name:'anuj'
    },{
        mail:'modibhargav1998@gmail.com',name:'bhargav'
    },
]
   mailArr.forEach((item)=>{
    sendEmail(item.mail,item.name).then((res)=>{
        console.log(res)
       
       }).catch((err)=>{
        console.log(err)
       
       })
   })
   
  
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})