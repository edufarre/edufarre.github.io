(function(){
//*****************************************
//*********** ObjFeat Setter Nodes ********
//*****************************************
    
function Displace()
{
  this.addInput("N-Points","object");
  this.addInput("Shape","object");
  this.addOutput("Disp. Shape","object");
}

//name to show
Displace.title = "Displace";
Displace.desc ="Displace input shape through N input Points";

//function to call when the node is executed
Displace.prototype.onExecute = function()
{
    
    var nPoints = this.getInputData(0);
    var shape = this.getInputData(1);
    if(typeof(shape)==="object" && shape!=null && typeof(nPoints) === "object" && nPoints!=null){
        var son = new Object();
        var Transform =[];
        for(var l =0; l<nPoints.Transform.length;l++){
            if(nPoints.hasOwnProperty('rad')){
                var fatherT = mat3.clone(nPoints.Transform[l]);
                var center = vec2.create();
                vec2.transformMat3(center, center,fatherT)
                var curT = mat3.create();
                for(var j =0;j<nPoints.vertex;j++){

                        var xAux = center[0] + nPoints.rad * Math.cos(((Math.PI * 2)/nPoints.vertex) * j);
                        var yAux = center[1] + nPoints.rad * Math.sin(((Math.PI * 2)/nPoints.vertex) * j); 

                        mat3.translate(curT,fatherT,[xAux-center[0],yAux-center[1]]);//mat3.translate(curT,curT,[xAux,yAux]);
                        var point = vec2.create();
                        vec2.transformMat3(point, point,curT);
                        var finalT = mat3.create();
                        mat3.translate(finalT,finalT,[point[0],point[1]]);
                        Transform.push(finalT);               
                } 
                son.Transform= Transform;
            } else {
                son.Transform= nPoints.Transform;
            
            }
        }
       
        son.rad = shape.rad;
        son.vertex=shape.vertex; 

        this.setOutputData( 0,  son);
    }
}
 
Displace.prototype.onDblClick = function()
{
   showProperties(this);
    
}


Displace.prototype.onDeselected = function()
{
    document.getElementById('boxInf').style.display="none";     
}

//register in the system
LiteGraph.registerNodeType("Obj Prop/Displace", Displace );     


function FillS()
{
  this.addInput("Figure","object");
  this.addInput("Fill Style","object");
  this.addOutput("Filled Shape","object");
}

//name to show
FillS.title = "Fill";
FillS.desc="Select texture to fill shape";

//function to call when the node is executed
FillS.prototype.onExecute = function()
{
    var shape = this.getInputData(0);
    var fillObj = this.getInputData(1);
    if(typeof(shape)==="object" && shape!=null){
        if(fillObj!==undefined && fillObj!= null){
            shape.fill=fillObj;   
        }
        this.setOutputData( 0, shape);       
    }  
}

//register in the system
LiteGraph.registerNodeType("Obj Prop/Fill", FillS );

function RotateS()
{
  this.addInput("Figure","object");
  this.addInput("Ang","number");
  this.addOutput("Shape","object");
  this.addProperty("Angle", 0.0 );
 
}

//name to show
RotateS.title = "Rotate";
RotateS.desc="Rotation of figure";

//function to call when the node is executed
RotateS.prototype.onExecute = function()
{
  var shape = this.getInputData(0);
  var Angle = this.getInputData(1);
  if(Angle !== undefined){
      this.properties.Angle=Angle;
  }  
  if(shape !== undefined && typeof(shape)==="object"){
      var rMat = mat3.create();
      mat3.fromRotation(rMat,this.properties.Angle*DEG2RAD);
      for(var i=0;i<shape.Transform.length;i++){ 
            mat3.multiply(shape.Transform[i],shape.Transform[i],rMat); 
        }
        this.setOutputData( 0, shape)
  }
;
  }
    

RotateS.prototype.onDblClick = function()
{
    showProperties(this);
}

RotateS.prototype.onDeselected = function()
{
    document.getElementById('boxInf').style.display="none";     
}

//register in the system
LiteGraph.registerNodeType("Obj Prop/Rotate", RotateS );


function Scale()
{
  this.addInput("Shape","object");
  this.addInput("Scale X");
  this.addInput("Scale Y");
  this.addProperty("X", 1.0);
  this.addProperty("Y", 1.0);
  this.addOutput("Shape","object");
}

//name to show
Scale.title = "Scale";
Scale.desc="Scale a Shape";

//function to call when the node is executed
Scale.prototype.onExecute = function()
{
    var shape = this.getInputData(0);
    var X = this.getInputData(1);
    var Y = this.getInputData(2);
 
    if(X!==undefined && X!==null && X>0 && typeof(X)==="number"){
        this.properties.X=parseFloat(X);
    }
    if(Y!==undefined && Y!==null && Y>0 && typeof(Y)==="number"){
        this.properties.Y=parseFloat(Y);
    }
    
    
    if(shape !== undefined && shape != null){
        if(typeof(X)=="object" && X != null){
            var rangeV = parseInt(X.length / shape.Transform.length);
            for(var n =0; n<shape.Transform.length;n++){
                var meanV =0;
                for(var l = (rangeV*n);l<(rangeV*(n+1));l++){
                    meanV += parseFloat(X[l]);
                }
                if((meanV/rangeV)>0){
                    mat3.scale(shape.Transform[n],shape.Transform[n],[(meanV/rangeV),1.0]);
                }
                else{
                    mat3.scale(shape.Transform[n],shape.Transform[n],[1.0,1.0]);
                }
            }
            
        } else {
            for(var n =0; n<shape.Transform.length;n++){
                mat3.scale(shape.Transform[n],shape.Transform[n],[parseFloat(this.properties.X),1.0]);
            }
        } 
        
        if(typeof(Y)=="object" && Y != null){
            var rangeV = parseInt(Y.length / shape.Transform.length);
            for(var n =0; n<shape.Transform.length;n++){
                var meanV =0;
                for(var l = (rangeV*n);l<(rangeV*(n+1));l++){
                    meanV += parseFloat(Y[l]);
                }
                 if((meanV/rangeV)>0){
                    mat3.scale(shape.Transform[n],shape.Transform[n],[1.0,(meanV/rangeV)]);
                }
                else{
                    mat3.scale(shape.Transform[n],shape.Transform[n],[1.0,1.0]);
                }
                 
            }
            
        } else {
            for(var n =0; n<shape.Transform.length;n++){
                mat3.scale(shape.Transform[n],shape.Transform[n],[1.0,parseFloat(this.properties.Y)]);
            }
        } 
    this.setOutputData( 0, shape)
    }  
    
}

Scale.prototype.onDblClick = function()
{
    showProperties(this);
}

Scale.prototype.onDeselected = function()
{
    document.getElementById('boxInf').style.display="none";     
}

//register in the system
LiteGraph.registerNodeType("Obj Prop/Scale", Scale );

})();