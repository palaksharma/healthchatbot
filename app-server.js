/**
 * NG_DIR_PATH_HEALTH = /app
 * NG_PORT_HEALTH = 3000
 */
const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const hsts = require('hsts');
const helmet = require('helmet');
//const request = require('request');
const jwt = require('jsonwebtoken');
const config = require('./config');

app.use(helmet({
    frameguard: {
        action: 'deny'
    }
}));
app.use(hsts({
    maxAge: 31536000, // 12 months
    includeSubDomains: true,
    preload: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
const NG_DIR_PATH_HEALTH = "/dist/HealthChatBot" || '/app';
app.use(express.static(path.join(__dirname, NG_DIR_PATH_HEALTH)));

// Mask Server version disclosure via HTTP response headers
app.use(function(req, res, next) {
    res.setHeader('Server', 'Health Chat Bot');
    next();
});

/* To validate login */
app.post('/pendingAnswers', bodyParser.json(), (req, res) => {
    const question = req.body.question;
    const answers = req.body.answer;
    if (question && answers) {
        res.send({
            success: true,
            message: 'Answer of the pending question is saved successfully',
            question: [question],
            answers: [answers]
        });
    } else {
        res.send(400).json({
            success: false,
            message: 'Answer of the pending question is not saved successfully.Please try again.'
        });
    }
});


/* To validate login */
app.post('/validateLogin', bodyParser.json(), (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username && password) {
        if (username === 'admin' && password === 'adminadmin') {
            const token = jwt.sign({ username: username },
                config.secret, { expiresIn: '2h' } // expires in 2 hours
            );
            // return the JWT token for the future API calls
            res.json({
                success: true,
                message: 'Authentication successful',
                token: token,
                username: username
            });
        } else if (username === 'user' && password === 'useruser') {
            const token = jwt.sign({ username: username },
                config.secret, { expiresIn: '2h' } // expires in 2 hours
            );
            // return the JWT token for the future API calls
            res.json({
                success: true,
                message: 'Authentication successful',
                token: token,
                username: username
            });
        } else {
            res.send(403).json({
                success: false,
                message: 'Incorrect username or password'
            });
        }
    } else {
        res.send(400).json({
            success: false,
            message: 'Authentication failed. Please check the request'
        });
    }
});



/* Handle all application URL(s) */
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, NG_DIR_PATH_HEALTH, '/index.html'));
});

/* Create the server for application */
const server = http.createServer(app);
var port = process.env.PORT || 3000;
server.listen(port, () => console.log('Health Chat Bot server is running on port ' + port + '...'));