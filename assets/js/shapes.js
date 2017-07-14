//Implementar contains per als polygons
function contains (shape,mx,my){
    
}

 function init() {
    
    //Setting canvas and its size
     var div = $('#cnvs')[0];
    var canvas = document.createElement('canvas');
    canvas.width = $(div).width();
    canvas.height = $(div).height();
    canvas.id= "canvasD";
    div.appendChild(canvas);
    
    var LGdiv = $('#Lgraph')[0];
    var LGcanvas = document.createElement('canvas');
    LGcanvas.width = $(LGdiv).width();
    LGcanvas.height = $(LGdiv).height();
    LGcanvas.id= "LGcanvas";
    LGdiv.appendChild(LGcanvas);
    
    //Starting graph and canvas
    graph = new LiteGraph.LGraph();
    graph_canvas = new LiteGraph.LGraphCanvas( LGcanvas, graph );
    graph_canvas.background_image = "grid.png";
    myState = new CanvasState(canvas);//new CanvasState(document.getElementById('canvasD'));
    graph.start();
     
    //Creating unique AudioSource Node (sourceNode+analyzerNode+destinationNode)
    var node_button = LiteGraph.createNode("Audio/source");
	node_button.pos = [50,50];
	graph.add(node_button);
      
   
}
init();

