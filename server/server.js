const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');

require('dotenv').config();

const app = express();
app.use( bodyParser.json() );



massive( process.env.CONNECTION_STRING )
.then( db => {
    app.set('db', db);
    db.init_tables.user_create_seed().then( response => {
      console.log('User table init');
      db.init_tables.vehicle_create_seed().then( response => {
        console.log('Vehicle table init');
      })
    })
  });


app.get('/api/users', (req,resp) => {
    const db =  req.app.get('db');
    db.get_users().then(users => {
        resp.send(users)
    }).catch(console.log)
})

app.get('/api/vehicles', (req,resp) => {
    const db =  req.app.get('db');
    db.get_vehicles().then(cars => {
        resp.send(cars)
    }).catch(console.log)
})

app.post('/api/users', (req,resp)=> {
    const db = req.app.get('db');
    db.create_user([req.body.name, 
                   req.body.email, ])
                   .then((newUser) => {
        resp.send(newUser)
    }).catch(console.log)
})


app.post('/api/users', (req,resp) => {
    const db =  req.app.get('db');
    db.get_vehicles().then(cars => {
        resp.send(cars)
    }).catch(console.log)
})



const port = 3000;
app.listen( port, () => { console.log(`I'm listening... on Port: ${port}.`); } );