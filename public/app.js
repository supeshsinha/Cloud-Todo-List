const signedInSection = document.querySelector('#signedIn');
const signedOutSection = document.querySelector('#notSignedIn');
const paragraph = document.querySelector('#custom-text');

const signInBtn = document.querySelector('#signin');
const signOutBtn = document.querySelector('#signout');

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

signInBtn.addEventListener('click',function(){
    auth.signInWithPopup(provider);
    console.log("sign in clicked");
});

signOutBtn.addEventListener('click',function(){
    auth.signOut();
    console.log("sign out clicked");
});

auth.onAuthStateChanged(user => {
    if (user){
        //When signed in
        signedInSection.style.display = "block";
        signedOutSection.style.display = "none";
        paragraph.innerText = `Hi ${user.displayName}, Welcome to your personal To-do :)`
    }
    else{
        //When not signed in
        signedInSection.style.display = "none";
        signedOutSection.style.display = "block";

    }
});