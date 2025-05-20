//  DETERMINING IF A BROWSER SUPPORTS A SERVICE WORKER, IF CONDITION IS TRUE REGISTER THE SERVICE WORKER
if('serviceWorker' in navigator){
    navigator.serviceWorker.register('sw.js')
    .then((reg)=> console.log('Service Worker Registered', reg))
    .catch((err)=> console.log('Service Worker Not registered',err));
}