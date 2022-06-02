//applicationServerKey for PushSubscription
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

//function for triggerevent
async function triggerPushNotification() {
    if ('serviceWorker' in navigator) {
        const register = await navigator.serviceWorker.register('/sw.js', { scope: '/' }); //ServiceWorkerRegistration
        const publicVapidKey = 'BCTerqlhqfLBhDQGSgPcYnU8g_V_hE3GjXU-vYTu7_6tEsaR1rnXgj1GIR0MNYy3-gw9K5ouX3F8VnYwLVH6UGU';
        const subscription = await register.pushManager.subscribe({ //PushSubscription
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
        });
        await fetch('/subscribe', {
            method: 'POST',
            body: JSON.stringify(subscription),
            headers: {'Content-Type': 'application/json',},
        });

    } else {
        console.error('Service workers are not supported in this browser');
    }
}

//onclick trigger push notification button
document.querySelector('.trigger-push').addEventListener('click', () => {
    triggerPushNotification().catch(error => console.error("error",error));
});