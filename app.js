let admin = require("firebase-admin");
let serviceAccount = require("./node-push-5ad69-firebase-adminsdk-67f9b-46ab8eb51c.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://node-push-5ad69-default-rtdb.firebaseio.com"
});

let registrationToken = 'chDcErczSbSY7Hu48XA_Nw:APA91bE-VxO065nJEpC7idsSp7YjY1dH-U-kObD6E-M8WwvbVcXY0Kp3Bxipf7fVF-UubiStwwmonTl3LNRD_kppNxadOv1TmJdJ79qEb3zveA04P0uPbdNoefM778yLeL98Sr1aZ0RB';
let message = {notification: {title: "push notification title", body: "push notification body"}};
let notification_options = {priority: "high", timeToLive: 60 * 60 * 24};
admin.messaging().sendToDevice(registrationToken, message, notification_options)
    .then((response) => {
        console.log(response);
    }).catch((err) => {
    console.log("error with deviceToken", err);
})