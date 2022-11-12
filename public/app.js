const signedInSection = document.querySelector('#signedIn');
const signedOutSection = document.querySelector('#notSignedIn');
const paragraph = document.querySelector('#custom-text');

const signInBtn = document.querySelector('#signin');
const signOutBtn = document.querySelector('#signout');
const submitButton = document.querySelector('#createdata');
const displaySection = document.querySelector('#listdata');
const titleInput = document.querySelector('#todotitle');
const descriptionInput = document.querySelector('#tododes');


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

const db = firebase.firestore();
let reference;
let unsubscribe;

submitButton.addEventListener('click',console.log("worked"));
auth.onAuthStateChanged(user => {
    if (user){
        //When signed in
        reference = db.collection('todo');
        submitButton.addEventListener('click',function(){
            const { serverTimestamp } = firebase.firestore.FieldValue;

            reference.add({
                uid: user.uid,
                Title: titleInput.value,
                Description: descriptionInput.value,
                createdAt: serverTimestamp(),
            });

            console.log("Create Button Clicked");
        });
    }
});
