(function(){
//*****************************************
//*********** Shape Nodes ******************
//*****************************************

//node constructor class
function Polygon()
{
  this.addInput("Rad","number");
  this.addInput("# Vertex","number");
  this.addOutput("Surface","object");
  this.addProperty( "Rad", 0.0 );
  this.addProperty( "Vertex", 0.0 );
  this.Poly=new Object();
}

//name to show
Polygon.title = "Surface";
Polygon.desc = "Polygon points and transforms generator";


//function to call when the node is executed
Polygon.prototype.onExecute = function()
{
    
    var rad = this.getInputData(0);
    if( rad !== undefined && rad!=0 && rad != null ){
        if(typeof(rad)==="number"){
          this.properties.Rad=parseFloat(rad);
        } else { //if it is an array, typeoff(rad)=object
            this.properties.Rad=rad.length; 
        }
    } 
    
    var sides = this.getInputData(1);
    if( sides !== undefined && sides !=0 && sides != null){
        if(typeof(sides)==="number"){
          this.properties.Vertex=parseInt(sides); 
        } else { //if it is an array, typeoff(sides)=object
           this.properties.Vertex=sides.length; 
        }  
    }
    
    var Transform = new Array();
    var cT = mat3.create(); //identity matrix
    mat3.translate( cT, cT, [myState.width/2,myState.height/2]);
  
    
    Transform.push(cT);
    this.Poly.Transform= Transform;
    this.Poly.rad=parseFloat(this.properties.Rad);
    this.Poly.vertex= this.properties.Vertex;
    if(this.properties.Rad !=0 && this.properties.Vertex!=0){
        this.setOutputData( 0, this.Poly);
    }
    
  }

Polygon.prototype.onDblClick = function()
{
     showProperties(this);
     
}

Polygon.prototype.onDeselected = function()
{
    document.getElementById('boxInf').style.display="none";     
}

//register in the system
LiteGraph.registerNodeType("Shaper/Shape", Polygon );

//node constructor class
function SurfC()
{
  this.addInput("Shape","object");
  this.addInput("#Points","object");
  this.addProperty("Point1",0);
  this.addProperty("Point2",0);
  this.addProperty("numPoints",0);
  this.addOutput("nPoints","object");
 
}

//name to show
SurfC.title = "Points Gen";
SurfC.desc ="create nPoints between two points";

//function to call when the node is executed
SurfC.prototype.onExecute = function()
{
    var shape = this.getInputData(0);
    var nP = this.getInputData(1);
    if(typeof(nP)==="object"){
        this.properties.numPoints= nP.length;
    }else if (typeof(nP)==="number") {
        this.properties.numPoints = nP;
    }
    
    if(shape !==undefined && typeof(shape)==="object"){
       var surface = new Object();
        surface.Transform = [];
        var Transform =[];
        if(shape.hasOwnProperty('rad')){
            for(var l =0; l<shape.Transform.length;l++){
                if(this.properties.Point1<0 || this.properties.Point2>shape.vertex){return;}
               var fatherT = mat3.clone(shape.Transform[l]);
               var center = vec2.create();
               vec2.transformMat3(center, center,fatherT);
               var totalDist=0;
               
               for(var j =this.properties.Point1;j<=this.properties.Point2;j++){

                    var xAux = center[0] + shape.rad * Math.cos(((Math.PI * 2)/shape.vertex) * j);
                    var yAux = center[1] + shape.rad * Math.sin(((Math.PI * 2)/shape.vertex) * j);   
                   var curT = mat3.create();
                    mat3.translate(curT,fatherT,[xAux-center[0],yAux-center[1]]);//mat3.translate(curT,curT,[xAux,yAux]);
                    var point = vec2.create();
                    vec2.transformMat3(point, point,curT);
                    var finalT = mat3.create();
                    mat3.translate(finalT,finalT,[point[0],point[1]]);
                    Transform.push(finalT);  
                   
                }
            }
        } else {
            for(var l =this.properties.Point1;l<=this.properties.Point2;l++){
                Transform.push(shape.Transform[l]);
            }
        }
            surface.Transform.push(Transform[0])
            for(var j=0; j<Transform.length-1;j++){
                
                var strtP = vec2.create();
                var nextP = vec2.create();
                vec2.transformMat3(strtP, strtP,Transform[j]);
                vec2.transformMat3(nextP, nextP,Transform[j+1]);
                
                var wDist = (nextP[0]-strtP[0]);
                var hDist = (nextP[1]-strtP[1]);
                var wObj = wDist/(parseFloat(this.properties.numPoints) + 1);
                var hObj = hDist/(parseFloat(this.properties.numPoints) + 1);
                          
                
                for(var z =0;z<this.properties.numPoints;z++){
                    var curT = mat3.clone(Transform[j]);
                    mat3.translate(curT,curT,[wObj*(z+1),hObj*(z+1)]);
                    surface.Transform.push(curT) 
                }
                
                surface.Transform.push(Transform[j+1])
         
            }
        this.setOutputData( 0, surface);
    
    }
}

SurfC.prototype.onDblClick = function()
{
     showProperties(this);
     
}
SurfC.prototype.onDeselected = function()
{
    document.getElementById('boxInf').style.display="none";     
}
//register in the system
LiteGraph.registerNodeType("Shaper/Points Gen", SurfC );   
    
//||||||||||| Render ||||||||||||||||||||||
//node constructor class
function DispS()
{
  this.addInput("Figure","object");
  this.n=null;
    this.added=false;
}

//name to show
DispS.title = "Disp Figure";
DispS.desc ="Displays created shape on canvas";

//function to call when the node is executed
DispS.prototype.onExecute = function()
{
    var shape = this.getInputData(0);
    if(shape !==undefined && shape !== null){
        if(this.added){
            myState.shapes[this.n]=shape;
            myState.draw();
            
        } else {
            this.n=myState.shapes.length;
            myState.shapes.push(shape);
            myState.draw();
            this.added=true;
        }
    }
}

DispS.prototype.onRemoved = function()
{
 
    if(this.added){
        myState.shapes.splice(this.n,1)
        this.n=null;
        this.added=false;
    }
    myState.draw();
}

DispS.prototype.onConnectionsChange  = function()
{
    if(this.added){
        myState.shapes.splice(this.n,1)
        this.n=null;
        this.added=false;
        myState.draw();
    }
}

//register in the system
LiteGraph.registerNodeType("Render/Disp Figure", DispS );
    
})();