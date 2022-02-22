var p;
var x, y, vx, vy;

// Real dimensions of the canvas
var xmin, xmax, ymin, ymax;

// Step size to increment along vectors
var h, k;

// Photon list
var photons;

// Number of photons to maintain.
var N;

// Implicit plot graphics object
var plot, C;

function setup() {
 // Video settings
 pixelDensity(1);

 // Display canvas settings
 var canvas;
 canvas = createCanvas(400,400);
 canvas.parent('display');


 // Real dimensions of the canvas
 xmin = -2; xmax = 2; ymin = -2; ymax = 2;

 // mesh sizes, h and k
 h = (xmax-xmin)/width
 k = (ymax-ymin)/height

 // Plot the level curve
 C=-1.9;
 let tol=0.01;
 plot = implicitplot(f,xmin,xmax,ymin,ymax,C,tol);

 // Allocate a photon list array
 photons = [];

 //p = new Photon(4,color(255,255,255),width/3,0,0,1);
 //photons.push(p);

 // Number of photons to maintain.
 N = 20;

 // Populate with a collection of photons across the top of the screen
 /*
 for(var i=1; i<N; i++) {
  x = i*width/N
  y=height/2
  vx=0
  vy=1
  p = new Photon(4,color(255,255,255),x,y,vx,vy);
  photons.push(p);
 }
 */

}

function draw() {
 var x, y, vx, vy;
 fill(0,0,0,10);
 noStroke();
 rect(0,0,width-1,height-1);
 // draw reflective surface
 image(plot,0,0);

 // Display the collection of photons.
 for(var i=photons.length-1; i>=0; i--) {
  p = photons[i]
  p.display();
  p.move(plot);
  // remove out of bounds photons
  if(p.isDead()) {
   photons.splice(i,1);
  }
 }
}

// click to add radial burst
function mouseClicked() {
 var x, y, vx, vy, phi, N;
 x = mouseX;
 y = mouseY;
 N = 20;

 // Populate with a collection of photons radial from mouse location
 for(var i=1; i<N; i++) {
  phi = i*PI/N;
  vx=cos(phi);
  vy=sin(phi);
  p = new Photon(4,color(255,255,255),x,y,vx,vy);
  photons.push(p);
 }

 

}
