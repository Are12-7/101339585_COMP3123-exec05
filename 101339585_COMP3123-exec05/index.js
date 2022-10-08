const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { query, response } = require('express');

/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
router.get('/home', (req, res) => {
  const currentPath = path.join(__dirname, 'home.html');
  res.sendFile(currentPath);
});

/*
- Return all details from user.json file to client as JSON format
*/
router.get('/profile', (req, res) => {
  // user.json path
  const currentPath = path.join(__dirname, 'user.json');
  //  read user.json 
  let info = fs.readFileSync(currentPath, { encoding: 'utf-8' });
  // string to JSON
  info = JSON.parse(info);
  res.json(info);
});

/*
- Modify /login router to accept username and password as query string parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
router.get('/login', (req, res) => {
  const { username, password } = req.query;
  const currentPath = path.join(__dirname, 'user.json');
   //  read user.json 
  const info = fs.readFileSync(currentPath, { encoding: 'utf-8' });
  const userInput = JSON.parse(info);

  let response;
  if (userInput.username == username) {
    if (userInput.password == password) {
      response = {
        status: true,
        message: 'User Is valid'
      };
    } else {
      response = {
        status: false,
        message: 'User Name is invalid'
      };
    }
  } else {
    response = {
      status: false,
      message: "Password is invalid"
    };
  }
  res.json(response); 
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get('/logout/:username', (req, res) => {
  const username = req.params.username;
  res.send(`<b>${username} successfully logout.</b>`);
});

app.use('/', router);

app.listen(process.env.port || 8081);

console.log('Web Server is listening at port '+ (process.env.port || 8081));