const displayWord = document.querySelector(".word");
const hangmanParts = document.querySelectorAll(".body-lines");
const message = document.querySelector("#final-message");
const messageBox= document.querySelector(".message-container");
const wrongDisplay = document.querySelector(".wrong-container");
const notification = document.querySelector(".notification-container");
const finalMessage = document.querySelector("#final-message-reveal-word");
const reloadButton = document.querySelector("#play-again");

const words = ["banana", "mountain", "monkey", "cycling", "coronavirus"];
let word = words[Math.floor(Math.random() * words.length)];

//state

const correctLetters = [];
const wrongLetters= [];

// display letters function
function displayRandomWord(){
    console.log(word);
    displayWord.innerHTML =`
      ${word
            .split('')
            .map(el => `
                <span class="letter">
                ${correctLetters.includes(el) ? el : ''}
                </span>
            `)
            .join('')
       }
    `;
    console.log(correctLetters.length);
    console.log(word.length);
    const innerWord = displayWord.innerText.replace(/[ \n]/g, '');
    if(innerWord === word) {
       message.innerText = "Congratulations! You won! 😃";
       messageBox.style.display = "flex";
    }
};
displayRandomWord();

//display wrong letters
function displayWrongLetters(){
    wrongDisplay.innerHTML = wrongLetters.map(el => `
        <span> ${el}</span> `
    );
    hangmanParts.forEach((el, index)=>{
        const errors = wrongLetters.length;
        if(index < errors){
            el.style.display ="block";
        } else {
            el.style.display = "none";
        }
    })

    if(wrongLetters.length === 6){
        message.innerText = "Sorry. You lost! 😕";
        finalMessage.innerText = `The word was  ${word.toUpperCase()}.`;
        messageBox.style.display = "flex";
    }

}
//show notification
function displayNotification(){
   notification.classList.add("show");
   setTimeout(() => {
       notification.classList.remove("show");
   }, 2000)
}

//keydown press function
 window.addEventListener("keydown", e => {
     const letterPressed = e.key;
   
     if(e.keyCode >= 65 && e.keyCode <=90){
        if(word.includes(letterPressed)){
           if(!correctLetters.includes(letterPressed)){
            correctLetters.push(letterPressed);
            displayRandomWord();
           } else {
               displayNotification();
           } 
        }else{
            if(!wrongLetters.includes(letterPressed)){
                wrongLetters.push(letterPressed);
                displayWrongLetters();
            }else{
                displayNotification();
            }      
        }   
     }
 })


 
// play again function
function playAgain () {
    window.location.reload();
}
reloadButton.addEventListener("click", playAgain);