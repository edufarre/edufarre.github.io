// Canvas where visualization will display
var myState;
var copiedShapes=[];
// LiteGraph canvas to implement relations between obj
var graph;
var graph_canvas;

//Initializing audio context and its variables
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var playSound;
var stream;
//Variables to work sound controls setting time palyheads positions
var isPlaying = false;
var startTime = 0;
var startOffset = 0;

var DEG2RAD = 0.01745329251 ; //Math.PI/180

function getTime(){
    return performance.now();
    console.log(performance.now())
}


function curTapp(ctx,transform){
        ctx.setTransform( transform[0], transform[3], transform[1], transform[4], transform[6], transform[7] ); //  m[2], m[5]     
}

function showProperties(node){
    var targetDiv = document.getElementById("boxInf");
    while (targetDiv.hasChildNodes()) {   
    targetDiv.removeChild(targetDiv.firstChild);
    }
     if(node.id==="AudN"){
           $('#MusicP')[0].style.display ="block";
           $('#backGround')[0].style.display ="none";
       } else{
           $('#MusicP')[0].style.display ="none";
           $('#backGround')[0].style.display ="none";
       }
    
   if(node.properties){
       targetDiv.style.display = "block";
       
       
       var dl = document.createElement('dl');
       var dt = document.createElement('dt');
       var title = document.createTextNode("Properties");
       dt.appendChild(title);
       dl.appendChild(dt)
       
       for(var l in node.properties){
         
         var dd = document.createElement('dd');
         var text = document.createTextNode(l+':');
         
          
         if(typeof(node.properties[l])=="object"){
             dd.style.textDecoration = "underline";
             dd.appendChild(text);
             dl.appendChild(dd);
             for(var k in node.properties[l]){
                var dd2 = document.createElement('dd');
                var text = document.createTextNode(k+':');
                dd2.appendChild(text);
                var input = document.createElement('input');
                input.type = "text";
                input.className= "form-control prop";
                input.value= node.properties[l][k];
                input.id= k;
                input.oninput = function () {
                    if(this.value!=""){
                        node.properties[this.id] = this.value;
                    } 
                };
                dd2.appendChild(input);     
                dl.appendChild(dd2);
             }
         } 
         else {
                 dd.appendChild(text);
                 var input = document.createElement('input');
                 input.type = "text";
                 input.className= "form-control prop";
                 input.value= node.properties[l];
                 input.id= l;
                 input.oninput = function () {
                     if(this.value!=""){
                        node.properties[this.id] = this.value;
                     } 
                    };
                 dd.appendChild(input);     
                 dl.appendChild(dd); 
         }
            
        targetDiv.appendChild(dl)
        }
    }
}

document.getElementById('ColorBkG').addEventListener("input",function(){
    document.getElementById('canvasD').style.backgroundColor=document.getElementById('ColorBkG').value; 
    
},true);

document.getElementById('Img').addEventListener("click",function(){
    document.getElementById("uploadImg").click(); 
},true);

document.getElementById('uploadImg').addEventListener("change", function(){
        var backgroundImg = document.getElementById('selImg');
        backgroundImg.src = URL.createObjectURL(document.getElementById("uploadImg").files[0]);
        backgroundImg.onload = function(){
            myState.img=true;
            document.getElementById("DispImg").checked = myState.img;
            myState.BkgImg= backgroundImg;
            myState.draw();
        } 
},true);

document.getElementById('imgSlider').addEventListener("input", function(){
    myState.draw();
},true);

document.getElementById("DispImg").addEventListener("change",function(){
     myState.img = document.getElementById("DispImg").checked;      
    myState.draw();
},true);

document.getElementById("gS").addEventListener("click",function(){
    document.getElementById("backGround").style.display="block";
    document.getElementById("MusicP").style.display="none";
    document.getElementById("boxInf").style.display = 'none';
    if(myState.selection){
        myState.selection=null;
    }
},true);

      


//Storing and loading JSON files(which representate relations graph)
document.getElementById('upLG').addEventListener("click",function(){
     document.getElementById("upJSON").click();  
},true);

document.getElementById('upJSON').addEventListener("change",function(){
    var obj = $('#upJSON');
    var htmlObj = obj.get(0);
    var file = htmlObj.files[0];
    graph.stop();
    graph.load(URL.createObjectURL(file));
},true);

document.getElementById('downJ').addEventListener("click",function(){
    var stringGraph = JSON.stringify(graph.serialize());
    var file = new Blob([stringGraph]);
    var fileURL = URL.createObjectURL(file);
    this.href=fileURL;
    this.download = "RelationsGraph.json";
},true);