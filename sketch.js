var Engine = Matter.Engine,
World = Matter.World,
Events = Matter.Events,
Bodies = Matter.Bodies;

var particles;
var plinkos = [];
var divisions=[];

var divisionHeight=300;
var score =0;
var turn=0;

var PLAY=1;
var END=0;
var gameState=PLAY;

var bg;
var txtcolor;

function preload() {
bg=color("black");
txtcolor=color("black");
fetchtime();
}

function setup() {
createCanvas(800, 800);
engine = Engine.create();
world = engine.world;
ground = new Ground(width/2,height,width,20);

for (var k = 0; k <=width; k = k + 80) {
divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
}
for (var j = 75; j <=width; j=j+50) {
plinkos.push(new Plinko(j,75));
}
for (var j = 50; j <=width-10; j=j+50) {
plinkos.push(new Plinko(j,175));
}

for (var j = 75; j <=width; j=j+50) {
plinkos.push(new Plinko(j,275));
}

for (var j = 50; j <=width-10; j=j+50) {  
plinkos.push(new Plinko(j,375));
}
}

function draw() {
background(bg);
textSize(20)
Engine.update(engine);

for (var i = 0; i < plinkos.length; i++) {   
plinkos[i].display();
}

for (var k = 0; k < divisions.length; k++) {   
divisions[k].display();
}
textSize(30);
fill(txtcolor)
text("Score : "+score,20,35);

if(particles!=null) {
particles.display();
if(particles.body.position.y>760){
if(particles.body.position.x<300) {
score=score+500;
if(turn===5) {
gameState=END;
}
}

if(particles.body.position.x>301&&particles.body.position.x<600) {
score=score+100;
if(turn===5){
gameState=END;
}
}

if(particles.body.position.x>601&&particles.body.position.x<900) {
score=score+200;
if(turn===5) {
gameState=END;
}
}
particles=null;
}
}

if(gameState===END) {
push();
strokeWeight(1);
stroke("red")
textSize(60);
fill(txtcolor)
text("GAME OVER",200,250);
pop();
}
fill(txtcolor)
textSize(32);
text("500",15,550);
text("500",95,550);
text("500",95+80,550);
text("100",95+160,550);
text("100",95+240,550);
text("100",95+240+80,550);
text("100",95+240+160,550);
text("200",95+320+160,550);
text("200",95+320+240,550);
text("200",95+320+320,550);
}

function mousePressed() {
if(gameState!==END) {
turn=turn+1;
particles=new Particle(mouseX,10,10,10);
}
}

async function fetchtime() {
var time=await fetch("https://worldtimeapi.org/api/timezone/Asia/Singapore");
var data=await time.json();
console.log(data);
var hour=data.datetime.slice(11,13);
if(hour>6&&hour<21) {
bg=color("gold");
txtcolor=color("black")
}
else {
bg=color("black")
txtcolor=color("white")
}
}