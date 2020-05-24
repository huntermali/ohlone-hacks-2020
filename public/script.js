// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Array of facts
var facts = ["Laughing helps you live longer!","Exercising will give you more energy, even if you’re feeling tired!", 
             "Maintaining good relationships with your family is healthy for both your mind and body", 
             "Walking outside - or spending time in green space - can make you feel better", 
             "Although it takes only a few minutes to eat a meal, it takes your body hours to completely digest your food", 
             "An apple a day does really keep the doctor away!", 
             "Going outside is a great source of Vitamin D! (Don’t forget to wear sunscreen, always!)", 
             "The human body has more than 650 muscles", 
             "The average person walks about 7,500 steps a day. In a lifetime, that adds up to walking around the Earth five times!", 
             "Plastic bottles may release chemicals into your water. Using reusable cups decreases waste and keeps you healthy!", 
             "Drinking water is good for your skin!", "Looking at a device screen may affect your ability to fall asleep", 
             "The nose knows: it can remember 50,000 different scents!", 
             "The eye muscles are the most active, moving more than 100,000 times a day!", 
             "Although bodies may stop growing, your nose and ears won’t!", 
             "Sugary soft drinks, sugary cereals, and white bread make you hungry again faster", 
             "Eating protein for breakfast (like eggs) helps keep you full until lunch and build stronger muscles", 
             "Green is Good!", "Tomatoes are fruits, not vegetables", 
             "Strawberries are actually not a berry. They are a complex fruit that is more similar to flowers!", 
             "Pumpkins and avocados are actually fruits!", "A pineapple is actually considered part of the berry family", 
             "Getting enough sleep is just as important as exercising"];

//Sets button as var, sets var so we can enter fact in p
var fact = $(".funfact");
var button = $(".getfact");

//Fact generator
function randomFact(){
  var random = Math.random() * 24;
  var rounded = Math.floor(random);
  var ffact = facts[rounded];
  fact.text(ffact);
}

//Call function
randomFact();

//When button is clicked, generates a new fact
button.on("click", randomFact);

// var startB = $('#starttimer');

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

window.onload = function () {
    var twoMinutes = 60 * 2,
        display = document.querySelector('#time');
    startTimer(twoMinutes, display);
};
    