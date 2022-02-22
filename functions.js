//////////////////////////////////////////////////////////////////////
//
//

// Level curve is a parabola
function f(x,y) { return y-pow(x,2)/4.0; }
// Gradient of f
function df(x,y) {
 return createVector(-x/2,1);
}

// Construct an implicitplot of the level curve of the function f at C on
// the graphics context g.  The function f is assumed to be defined on
// [xmin,xmax] x [ymin,ymax]. We will color g according to
// abs(f(x,y)-C)<tol where e is the error tolerance.
// Returns a graphics object

function implicitplot(f,xmin,xmax,ymin,ymax,C,tol) {
 var i, j, x, y, error;
 let g = createGraphics(width,height);

 // Set implicitplot pixels
 for (i=0;i<width;i++) {
  x = map(i,0,width-1,xmin,xmax);
  for (j=0;j<height;j++) {
   y = map(j,height-1,0,ymin,ymax);
   error = abs(f(x,y)-C)
   if (error < tol) {
    g.set(i,j,color(0,255,0,map(error,0,tol,255,0)));
   }
   else {
    // Set background to transparent
    g.set(i,j,color(0,0,0,0));
   }
  }
 }
 g.updatePixels();

 return g;
}




//////////////////////////////////////////////////////////////////////
// A class that represents a photon as a circle of radius _R, color _c,
// location (_i,_j), velocity (_vi, _vj)
var Photon = function(_R, _c, _i, _j, _vi, _vj) {

  // Input parameters
  this.R = _R;
  this.color = _c;
  this.i = _i;
  this.j = _j;
  this.vi = _vi;
  this.vj = _vj;
  this.reflected = false;
  this.dead = false;
};

// Method to get i coord
Photon.prototype.getI = function() {
 return this.i;
};

// Method to get j coord
Photon.prototype.getJ = function() {
 return this.j;
};

// Method to set i coord
Photon.prototype.setI = function(_i) {
 this.i=_i;
};

// Method to set j coord
Photon.prototype.setJ = function(_y) {
 this.j=_j;
};

// Check dead
Photon.prototype.isDead = function() {
 return this.dead;
};

// Method to move the photon
Photon.prototype.move = function(plot) {

 // trigger reflection if not already reflected
 if (plot.get(this.i,this.j)[3]!=0 && !this.reflected) {
  this.reflected = true;

  // Get real coords of this location
  let x = map(this.i,0,width-1,xmin,xmax);
  let y = map(this.j,0,height-1,ymax,ymin);
  // Get real gradient
  let gradient = df(x,y);
  // Scale to pixel gradient
  gradient = createVector(gradient.x*h, -gradient.y*k);
  gradient.normalize();
  let velocity = createVector(this.vi,this.vj);
  velocity.add(gradient.mult(-2*gradient.dot(velocity)));
  this.vi=velocity.x;
  this.vj=velocity.y;
 }

 this.i += this.vi
 this.j += this.vj

 // check dead
 if (this.i<0 || this.i>=width || this.j<0 || this.j>=height) {
  this.dead = true;
 }

};


// Method to display
Photon.prototype.display = function() {
  fill(this.color);
  noStroke();
  ellipse(this.i,this.j,this.R,this.R);
};

// DEBUG
function printVar(label, value) { print(label + " = " + value); }
