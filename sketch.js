const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

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
for (var j = 30; j <=width; j=j+50) {
plinkos.push(new Plinko(j,75));
}
for (var j = 50; j <=width-10; j=j+50) {
plinkos.push(new Plinko(j,175));
}

for (var j = 30; j <=width; j=j+50) {
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

fill("red")
textSize(30)
text("500",15,530);
text("500",95,530);
text("500",175,530);
text("100",255,530);
text("100",335,530);
text("100",415,530);
text("100",495,530);
text("200",575,530);
text("200",655,530);
text("200",735,530);

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
if(particles.body.position.y>700){ 
if(particles.body.position.x<240 && particles.body.position.x>0){
score=score+500;
}

if(particles.body.position.x<590 && particles.body.position.x>250) {
score=score+100;
}

if(particles.body.position.x<800 && particles.body.position.x>580){
score=score+200;
}

particles=null;
}
}
if(turn===5) {
gameState=END;
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
var hour=data.datetime.slice(11,13);
if(hour>6&&hour<18) {
bg=color("gold");
txtcolor=color("black")
}
else {
bg=color("pink")
txtcolor=color("white")
}
}