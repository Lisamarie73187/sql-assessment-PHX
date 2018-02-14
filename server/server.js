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


app.post('/api/vehicles', (req,resp) => {
    const db =  req.app.get('db');
    db.add_vehicle([req.body.make,
                     req.body.model,
                     req.body.year,
                    req.body.owner_id])
        .then(cars => {
        resp.send(cars)
    }).catch(console.log)
})


app.get('/api/user/:userId/vehiclecount', (req,resp) => {
    const db =  req.app.get('db');
    db.get_vehicle_by_user_count([req.params.userId])
        .then(cars => {
        resp.send(cars)
    }).catch(console.log)
})
    
app.get('/api/user/:userId/vehicle', (req,resp) => {
    const db =  req.app.get('db');
    db.get_vehicles_by_user([req.params.userId])
        .then(cars => {
        resp.send(cars)
    }).catch(console.log)
})

app.get('/api/vehicle', (req,resp) => {
    const db =  req.app.get('db');
    if(req.query.userEmail){
        db.get_vehicles_by_email([req.query.userEmail])
            .then(cars => {
            resp.send(cars)
        }).catch(console.log)
    }else if(req.query.userFirstStart) {
        db.get_vehicles_search_users([req.query.userFirstStart + "%"])
            .then(cars => {
            resp.send(cars)
        }).catch(console.log)
    }
})

app.get('/api/newervehiclesbyyear', (req,resp) => {
    const db =  req.app.get('db');
    db.get_vehicles_new()
        .then(cars => {
        resp.send(cars)
    }).catch(console.log)
})


app.put('/api/vehicle/:vehicleId/user/:userId', (req,resp) => {
    const db =  req.app.get('db');
    db.update_owner([req.params.vehicleId,
                    req.params.userId])
        .then(car => {
        resp.send(car)
    }).catch(console.log)
})

app.delete('/api/user/:userId/vehicle/:vehicleId', (req, resp) => {
    const db = req.app.get('db');
    db.delete_ownership([req.params.userId,
                        req.params.vehicleId])
        .then(owner => {
            resp.send(owner)
        }).catch(console.log)
})

app.delete('/api/vehicle/:vehicleId', (req, resp) => {
    const db = req.app.get('db');
    db.delete_vehicle([req.params.vehicleId])
        .then(owner => {
            resp.send(owner)
        }).catch(console.log)
})
const port = 3000;
app.listen( port, () => { console.log(`I'm listening... on Port: ${port}.`); } );