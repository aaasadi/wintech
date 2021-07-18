if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js').then( registration => {
        // console.log('Service Worker registration succeeded.', registration)
    })
}
let installPromptEvent;
window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    
    installPromptEvent = e;
    
});

if (installPromptEvent) {
    installPromptEvent.propmt();
    // installPromptEvent.userChoice.then( choiceResult => {
    //     if (choiceResult.outcome === 'accepted') {
    //         console.log('user accepted')
    //     } else {
    //         console.log('user dismiss')
    //     }
    // })
}
