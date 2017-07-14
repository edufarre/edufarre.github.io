function CanvasState(canvas) {

  this.canvas = canvas;
  this.width = canvas.width;
  this.height = canvas.height;
  this.ctx = canvas.getContext('2d');
      
  // This fixes mouse co-ordinate problems when there's a border or padding
  var stylePaddingLeft, stylePaddingTop, styleBorderLeft, styleBorderTop;
  if (document.defaultView && document.defaultView.getComputedStyle) {
    this.stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingLeft'], 10)      || 0;
    this.stylePaddingTop  = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingTop'], 10)       || 0;
    this.styleBorderLeft  = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderLeftWidth'], 10)  || 0;
    this.styleBorderTop   = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderTopWidth'], 10)   || 0;
  }
  // Some pages have fixed-position bars at the top or left of the page
  // and this fixes that issue
  var html = document.body.parentNode;
  this.htmlTop = html.offsetTop;
  this.htmlLeft = html.offsetLeft;

  
  this.shapes = [];  // the collection of things to be drawn
  this.img=false; //Useful to know if user has load an image
  

  var myState = this;
  
  //Event Listener functions:
  //fixes a problem where double clicking causes text to get selected on the canvas
  canvas.addEventListener('selectstart', function(e) {
    e.preventDefault();
    return false; 
  }, false);
         
  // Options
  this.selectionWidth = 1;
}

CanvasState.prototype.addShape = function(shape) {
  this.shapes.push(shape);
}

CanvasState.prototype.clear = function() {
  this.ctx.resetTransform();
  this.ctx.clearRect(0, 0, this.width, this.height);
}

CanvasState.prototype.draw = function() {

    var ctx = this.ctx;
    var shapes = this.shapes;
    this.clear();
    if(this.img){
        ctx.globalAlpha = document.getElementById('imgSlider').value;
        ctx.drawImage(this.BkgImg,0,0,this.width,this.height);
        ctx.globalAlpha = 1;
        
    }   

        for (var i = 0; i < shapes.length; i++) {
               if(shapes[i].hasOwnProperty('rad') && shapes[i].hasOwnProperty('vertex')){
                  drawShape(shapes[i],ctx); 
               }else{
                   ctx.beginPath();
                   for(var k=0;k<shapes[i].Transform.length;k++){ 
                        var point = vec2.create();
                        vec2.transformMat3(point, [0,0], shapes[i].Transform[k]);
                        if(k==0){
                           ctx.moveTo(point[0],point[1]); 
                        } else{
                           ctx.lineTo(point[0],point[1]); 
                        }
                    }
                   //ctx.closePath();
                   ctx.stroke();
            }
        }
}

CanvasState.prototype.getMouse = function(e) {
  var element = this.canvas, offsetX = 0, offsetY = 0, mx, my;
  
  // Compute the total offset
  if (element.offsetParent !== undefined) {
    do {
      offsetX += element.offsetLeft;
      offsetY += element.offsetTop;
    } while ((element = element.offsetParent));
  }

  // Add padding and border style widths to offset
  offsetX += this.stylePaddingLeft + this.styleBorderLeft + this.htmlLeft;
  offsetY += this.stylePaddingTop + this.styleBorderTop + this.htmlTop;
  
  //Uncomment to translate system coordinates and make center of canvas point(0,0)
  mx = (e.pageX - offsetX) - this.width/2;
  my = (e.pageY - offsetY) - this.height/2;
  
  // We return canvas mouse coordinates
  return {x: mx, y: my};
}

function drawShape(shape,ctx){
        var angleDiv = (2*Math.PI)/shape.vertex;
        for (var k =0; k<shape.Transform.length;k++){
            var center = vec2.create();
            vec2.transformMat3(center, [0,0], shape.Transform[k]);
            curTapp(ctx,shape.Transform[k])
            ctx.beginPath();
        
            for(var l=0; l<shape.vertex;l++){

                var xAux = center[0] +shape.rad * Math.cos((angleDiv) * l);
                var yAux = center[1] +shape.rad * Math.sin((angleDiv) * l);

                if(l==0){
                   ctx.moveTo(xAux-center[0],yAux-center[1]);
                } else {
                    ctx.lineTo(xAux-center[0],yAux-center[1]);
                }

            }
            
            ctx.closePath();
          
        
        if(shape.hasOwnProperty('fill') ){
            if(typeof(shape.fill)==="object"){
                ctx.translate(-shape.rad,-shape.rad);
                ctx.fillStyle = ctx.createPattern(shape.fill,"repeat");
            }else{
                ctx.fillStyle = shape.fill;
            }
            ctx.fill();
        }else{
            ctx.stroke();  
        }

    }
}

window.addEventListener("resize", function() {
   var canvas = document.getElementById('canvasD');
    var div = $('#cnvs')[0];
    canvas.width = $(div).width();
    canvas.height = $(div).height();
    myState.draw();
    var canvas1 = document.getElementById('LGcanvas');
    var div1 = $('#Lgraph')[0];
    canvas1.width = $(div1).width();
    canvas1.height = $(div1).height();
    
    
},true );



