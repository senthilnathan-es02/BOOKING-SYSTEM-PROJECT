
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
  import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
  
  // Firebase configuration
  const firebaseConfig = {
      apiKey: "AIzaSyCH129DJcdxSr6yyx3ctQrze9IwgiiR700",
      authDomain: "login-page-27bbb.firebaseapp.com",
      projectId: "login-page-27bbb",
      storageBucket: "login-page-27bbb.appspot.com",
      messagingSenderId: "656890661171",
      appId: "1:656890661171:web:7740142971d538764c9646"
    };
  
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
  
  // Function to show messages
  function showMessage(message, divId) {
    var messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(function () {
      messageDiv.style.opacity = 0;
    }, 5000);
  }
  
  // Sign-up process
  const signup = document.getElementById("submitSignUp");
  signup.addEventListener("click", (event) => {
    event.preventDefault();
  
    const email = document.getElementById("rEmail");
    const password = document.getElementById("rPassword");
    const firstName = document.getElementById("fName");
    const lastName = document.getElementById("lName");
  
    const auth = getAuth(app);
    const db = getFirestore(app);
  
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        const user = userCredential.user;
        const userData = {
          email: email.value,
          firstName: firstName.value,
          lastName: lastName.value
        };
        showMessage('Account created successfully', 'signUpMessage');
        
        const docRef = doc(db, "users", user.uid);
        setDoc(docRef, userData)
          .then(() => {
            window.location.href = 'login.html';
          })
          .catch((error) => {
            console.error("Error writing document:", error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode == 'auth/email-already-in-use') {
          showMessage('Email Address Already Exists !!!', 'signUpMessage');
        } else {
          showMessage('Unable to create user', 'signUpMessage');
        }
      });
  });
  
  // Sign-in process
  
  
  const signIn = document.getElementById("submitSignIn");
  signIn.addEventListener("click", (event) => {
    event.preventDefault();
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const auth = getAuth();
  
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        showMessage('Login is successful', 'signInMessage');
        window.location.href = 'home.html';  // Redirect after successful login
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/wrong-password') {
          showMessage('Incorrect password. Please try again.', 'signInMessage');
        } else if (errorCode === 'auth/user-not-found') {
          showMessage('No account found with this email.', 'signInMessage');
        } else {
          showMessage('Unable to sign in. Please try again later.', 'signInMessage');
  }
  });
  });

  //-----------------------------------------------------------------------------------//

  // enter page login button click // 

document.getElementById("enter-login-button").onclick = function() {
    window.location.href="pages/login.html"; 
};

// enter page signin button click//

document.getElementById("enter-signin-button").onclick =function () {
    window.location.href="pages/signin.html";
};