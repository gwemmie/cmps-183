
var cnv;
var song;
var song2;
var song3;

function preload(){
    song = loadSound("../static/soundfont/acoustic_grand_piano-mp3/C4.mp3");
    song2 = loadSound("../static/soundfont/acoustic_grand_piano-mp3/D4.mp3");
    song3 = loadSound("../static/soundfont/acoustic_grand_piano-mp3/E4.mp3");
}

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function setup() {
  cnv = createCanvas(400, 300);
  centerCanvas();
  background(0);
}

function windowResized() {
  centerCanvas();
}

var questions = [
  {
    question:"Question #1: What note is this?",
    options:[1,2,3],
    selected:-1,
    correct:2
  },
  {
    question:"Question #2: What note is this?",
    options:[1,2,3],
    selected:-1,
    correct:1
  },
  {
    question:"Question #3: What note is this?",
    options:[1,2,3],
    selected:-1,
    correct:3
  }
];

var currentQuestion = 0;

function draw() {
  background(194,147,85);
  text(questions[currentQuestion].question,10,15);
  text(questions[currentQuestion].question,10,15);
  for(var o = 0; o < questions[currentQuestion].options.length; o++){
    text(questions[currentQuestion].options[o],10,35 + (20 * o));
    if(o == 0) text("     D4",10,35 + (20 * o));
    if(o == 1) text("     C4",10,35 + (20 * o));
    if(o == 2) text("     E4",10,35 + (20 * o));
  }
  //text("selected: " + questions[currentQuestion].selected,10,90);
  //text("correct: " + questions[currentQuestion].correct,10,110);
  if(questions[currentQuestion].selected == questions[currentQuestion].correct)
     text("Correct!",10,130);
  else if(questions[currentQuestion].selected != -1 && questions[currentQuestion].selected != questions[currentQuestion].correct)
     text("Incorrect!",10,130);
  else {
      text("Press 1, 2, or 3 to select an answer.", 10, 130);
      text("Press 4 to play the note for each question.",10,150);
      text("Press spacebar to move to the next question.", 10, 170);
  }
}

function keyPressed(){
  //loop through questions on space
  if(key == ' ') currentQuestion = (currentQuestion + 1) % questions.length;
     console.log(currentQuestion);
  if(key == '1') questions[currentQuestion].selected = 1;
  if(key == '2') questions[currentQuestion].selected = 2;
  if(key == '3') questions[currentQuestion].selected = 3;
  if(key == '4' && currentQuestion == 0) song.play();
  if(key == '4' && currentQuestion  == 1) song2.play();
  if(key == '4' && currentQuestion == 2) song3.play();
}