var config = {
    apiKey: "AIzaSyBPUXuAEjquJrNkkE7QANj87lsC6hdH8Oo",
    authDomain: "social-media-b6a2d.firebaseapp.com",
    databaseURL: "https://social-media-b6a2d.firebaseio.com",
    projectId: "social-media-b6a2d",
    storageBucket: "social-media-b6a2d.appspot.com",
    messagingSenderId: "816678703841"
  };

firebase.initializeApp(config);
 
function signUpEmail(){
    let email=document.getElementById('email').value;
    let pass=document.getElementById('password').value;

    if(email.length>0 && pass.length>0){
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
        });
    }
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        window.location='dashboard.html';
    } else {
       console.log('not logged in');
    }
  });