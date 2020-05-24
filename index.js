firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
  
      document.getElementById("user_div").style.display = "block";
      document.getElementById("login_div").style.display = "none";
  
      var user = firebase.auth().currentUser;
  
      if(user != null){
  
        var email_id = user.email;
        var email_verified = user.emailVerified;

        if(email_verified){
            document.getElementById("verify_btn").style.display = "none";
            user_presence();
        }
        else{
            document.getElementById("verify_btn").style.display = "block";
        }
        document.getElementById("user_para").innerHTML = "Welcome User : " + email_id + "\n\n" +
                                                        "verified : " + email_verified;
  
      }
  
    } else {
      // No user is signed in.
  
      document.getElementById("user_div").style.display = "none";
      document.getElementById("login_div").style.display = "block";
  
    }
  });
  
  function login(){
  
    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;
  
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
  
      window.alert("Error : " + errorMessage);
  
      // ...
    });
  
    function create_account(){
        var userEmail = document.getElementById("email_field").value;
        var userPass = document.getElementById("password_field").value;

        firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;

            window.alert("Error : " + errorMessage);
        });
    }
}
  
  function logout(){
    firebase.auth().signOut();
  }

  function send_verification(){
      var user = firebase.auth().currentUser;
      user.sendEmailVerification().then(function(){
          window.alert("Verification sent");
      }).catch(function(error){
          window.alert("Error : " + error.message);
      });
  }

function user_presence(){
    var amOnline = new Firebase('https://<demo>.firebaseio.com/.info/connected');
    var userRef = new Firebase('https://<demo>.firebaseio.com/presence/' + userid);

    amOnline.on('value', function(snapshot) {
    if (snapshot.val()) {
    userRef.onDisconnect().set('☆ offline');
    userRef.set('★ online');
    }
});
document.onIdle = function () {
  userRef.set('☆ idle');
}
document.onAway = function () {
  userRef.set('☄ away');
}
document.onBack = function (isIdle, isAway) {
  userRef.set('★ online');
}
  }