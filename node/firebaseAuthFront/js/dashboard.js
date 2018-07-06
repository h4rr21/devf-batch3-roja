var config = {
  apiKey: "AIzaSyBPUXuAEjquJrNkkE7QANj87lsC6hdH8Oo",
  authDomain: "social-media-b6a2d.firebaseapp.com",
  databaseURL: "https://social-media-b6a2d.firebaseio.com",
  projectId: "social-media-b6a2d",
  storageBucket: "social-media-b6a2d.appspot.com",
  messagingSenderId: "816678703841"
};

firebase.initializeApp(config);
var currentUser = {};

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      document.getElementById('user-name').textContent=user.displayName;
      document.getElementById('user-image').setAttribute('src',user.photoURL);
      currentUser=user;
      // ...
    } else {
      window.location="index.html";
    }
  });

  function logout(){
    firebase.auth().signOut()
      .then(function() {
        window.location="index.html";
      })
      .catch(function(error) {
        console.log('something went wrong',error);
      });
  }

function postSomething(){
  let postText = document.getElementById('newPostInput').value;

  if (postText.length>0){
    firebase.database().ref('posts/'+new Date().getTime()).set({
      username: currentUser.displayName,
      photo: currentUser.photoURL,
      post:postText,
      currentUser: new Date().toISOString()
    });
    document.getElementById('newPostInput').value="";
  }
}

firebase.database().ref('posts/').on('child_added',snapshot=>{
  console.log(snapshot.val());
  let newPost = document.getElementById('emptyPost').cloneNode(true);
  newPost.setAttribute('style','');

  newPost.querySelector('img').setAttribute('src',snapshot.val().photo);
  newPost.querySelector('h5').textContent=snapshot.val().username;
  newPost.querySelector('h3').textContent=snapshot.val().post;

  document.getElementById('posts-container').prepend(newPost);

})