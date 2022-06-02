### Using service workers, you can send push notifications to Chrome straight from your Node.js app

#####1) Setting up push notification with Node
- First, create a directory : `mkdir Web Push Notifications`
- Change into the new directory : `cd Web Push Notifications`
- Initialize an npm project : `npm init -y`
- Then create the server.js file which will be the main file : `touch server.js`
- Required dependencies:

``` 
  "body-parser": "^1.20.0",
  "dotenv": "^16.0.1",
  "express": "^4.18.1",
  "nodemon": "^2.0.16",
  "path": "^0.12.7",
  "web-push": "^3.5.0"
  ```
#####2) Generate VAPID Keys
- You can generate the VAPID key pair by running the below command `./node_modules/.bin/web-push generate-vapid-keys`

#####3) Create variable.env file
- Set vapid keys in your env file

 ``` 
   PORT=5000
   PUBLIC_VAPID_KEY=<your public key>
   PRIVATE_VAPID_KEY=<your private key>
```
#####4) Setup server 
- Set default directory as a client in server.js
  `app.use(express.static(path.join(__dirname, 'client')));`
- The /subscribe route at the bottom is we’re triggering the push notification event to the service worker.

#####5) Setup client
- Create client directory in project root
- Create files using commnad:`touch index.html style.css main.js sw.js`
- Once the triggerPush button is clicked, we register the service worker file sw.js, and create a subscription which then prompts the user to allow notifications for the current page. When using your public VAPID key in your web app, you’ll need to convert the URL safe base64 string to a Uint8Array to pass into the subscribe call, which you can do by passing the key to the urlBase64ToUint8Array() function as shown above.
- The request to the /subscribe route we created earlier subsequently triggers a new push event. Now, we need to listen for this event on the service worker and show a notification to the user each time this event is triggered.


#####6) Test route
- We have to test this route in browser : `http://localhost:5000/`








### Send notifications to Android App from Node.js server using Firebase Cloud Messaging (FCM)

#####1) Setting up a new Firebase project

#####2) Setting up Node.js
- Run command : `npm install firebase-admin`
- Adding configuration of the Firebase project
- Send a message to devices for create variable `registrationToken`, `message`, `notification_options`

#####3) Run command: 
- `npm run app`