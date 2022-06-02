require('dotenv').config({ path: 'variables.env' });

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const webPush = require('web-push');
const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client')));
webPush.setVapidDetails('mailto:test@example.com', publicVapidKey, privateVapidKey);

app.post('/subscribe', (req, res) => {
    const subscription = req.body
    res.status(200).json({success:true});

    const payload = JSON.stringify({title: 'Push notifications with Service Workers'});
    webPush.sendNotification(subscription, payload).catch(error => console.error(error));
});

app.set('port', process.env.PORT || 5000);
const server = app.listen(app.get('port'), () => {
    console.log(`Express running → PORT ${server.address().port}`);
});