const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const apiCallFromNode = require('./NodeJsCall')
const app = express()
const port = 3000


let users ="";
//    {
//     "page": 1,
//     "per_page": 6,
//     "total": 12,
//     "total_pages": 2,
//     "data": [
//        {
//           "id": 1,
//           "email": "george.bluth@reqres.in",
//           "first_name": "George",
//           "last_name": "Bluth",
//           "avatar": "https://reqres.in/img/faces/1-image.jpg"
//        },
//        {
//           "id": 2,
//           "email": "janet.weaver@reqres.in",
//           "first_name": "Janet",
//           "last_name": "Weaver",
//           "avatar": "https://reqres.in/img/faces/2-image.jpg"
//        },
//        {
//           "id": 3,
//           "email": "emma.wong@reqres.in",
//           "first_name": "Emma",
//           "last_name": "Wong",
//           "avatar": "https://reqres.in/img/faces/3-image.jpg"
//        },
//        {
//           "id": 4,
//           "email": "eve.holt@reqres.in",
//           "first_name": "Eve",
//           "last_name": "Holt",
//           "avatar": "https://reqres.in/img/faces/4-image.jpg"
//        },
//        {
//           "id": 5,
//           "email": "charles.morris@reqres.in",
//           "first_name": "Charles",
//           "last_name": "Morris",
//           "avatar": "https://reqres.in/img/faces/5-image.jpg"
//        },
//        {
//           "id": 6,
//           "email": "tracey.ramos@reqres.in",
//           "first_name": "Tracey",
//           "last_name": "Ramos",
//           "avatar": "https://reqres.in/img/faces/6-image.jpg"
//        }
//     ],
//     "support": {
//        "url": "https://reqres.in/#support-heading",
//        "text": "To keep ReqRes free, contributions towards server costs are appreciated!"
//     }
//  };
 //users=users.data;
 
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/user', (req, res) => {
    const user = req.body;

    console.log(user);
    users.push(user);

    res.send('User is added to the database');
});

app.get('/user', (req, res) => {
    apiCallFromNode.callApi(function(response){
            users=JSON.parse(response).data;
           res.json(users); 
           
    });
   // res.json(users);
});

app.get('/user/:id', (req, res) => {
    // reading id from the URL
    const id = req.params.id;
        
    // searching users for the id
    for (let user of users) {
        if (parseInt(user.id) === parseInt(id)) {
            res.json(user);
            return;
        }
    }

    // sending 404 when not found something is a good practice
    res.status(404).send('User not found');
});

app.delete('/user/:id', (req, res) => {
    // reading id from the URL
    const id = req.params.id;

    // remove item from the users array
    users = users.filter(i => {
        if (parseInt(i.id) !== parseInt(id)) {
            return true;
        }

        return false;
    });

    // sending 404 when not found something is a good practice
    res.send('User is deleted');
});

app.post('/user/:id', (req, res) => {
    // reading id from the URL
    const id = req.params.id;
    const newUser = req.body;

    // remove item from the users array
    for (let i = 0; i < users.length; i++) {
        let user = users[i]

        if (parseInt(user.id) === parseInt(id)) {
            users[i] = newUser;
        }
    }

    // sending 404 when not found something is a good practice
    res.send('User is edited');
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));