/*
////////////////////////////////////////////////////////////////////////////////////
		Copyright (C) 2013 by Javi Agenjo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
//////////////////////////////////////////////////////////////////////////////////
*/
(function(){

//AddValue
function setValue(){
    this.addOutput("value","number");
	this.addProperty( "value", 10.0 );
	this.editable = { property:"value", type:"number" };
}
setValue.title = "Value";
setValue.desc = "Set a value";
    
setValue.prototype.setValue = function(v)
{
	if( typeof(v) == "string") v = parseFloat(v);
	this.properties["value"] = v;
	this.setDirtyCanvas(true);
};

setValue.prototype.onExecute = function()
{
	this.setOutputData(0, parseFloat( this.properties["value"] ) );
}

setValue.prototype.onDrawBackground = function(ctx)
{
	//show the current value
	this.outputs[0].label = this.properties["value"].toFixed(3);
}

setValue.prototype.onWidget = function(e,widget)
{
	if(widget.name == "value")
		this.setValue(widget.value);
}

setValue.prototype.onDblClick = function()
{
   showProperties(this);
    
}

LiteGraph.registerNodeType("Math/Value", setValue);

//Compute Min value
function TimeAng(){;
    this.addOutput("Current ang","number");
    this.old_time=getTime();

}   
    
TimeAng.title ="Time angle";
TimeAng.desc="Return an angle which changes accordingly with time"; 
    
TimeAng.prototype.onExecute = function()
{
    //var newTime = getTime();   
    //var diff = newTime - this.old_time;  

   // this.old_time = newTime;
    
    //this.setOutputData(0, diff*0.1);  
    this.setOutputData(0, (getTime() /100)); 
}

LiteGraph.registerNodeType("Math/Time ang", TimeAng);    
    
    
//Compute Min value
function computeMin(){
    this.addInput("1st elem","number");
    this.addInput("2nd elem","number");
    this.addOutput("out","number");
}   
    
computeMin.title ="Min val";
computeMin.desc="Get the min value between two elements";  
    
computeMin.prototype.onExecute = function()
{
    var el1 = this.getInputData(0);
    var el2 = this.getInputData(1);
    this.setOutputData(0, Math.min(el1,el2) );
}

LiteGraph.registerNodeType("Math/Min", computeMin);

    
//Compute Max value
function computeMax(){
    this.addInput("1st elem","number");
    this.addInput("2nd elem","number");
    this.addOutput("out","number");
}   
    
computeMax.title ="Max val";
computeMax.desc="Get the max value between two elements";
    
computeMax.prototype.onExecute = function()
{
    var el1 = this.getInputData(0);
    var el2 = this.getInputData(1);
    this.setOutputData(0, Math.max(el1,el2) );
}

LiteGraph.registerNodeType("Math/Max", computeMax);

function MathRange()
{
	this.addInput("in","number",{locked:true});
	this.addOutput("out","number",{locked:true});

	this.addProperty( "in", 0 );
	this.addProperty( "in_min", 0 );
	this.addProperty( "in_max", 1 );
	this.addProperty( "out_min", 0 );
	this.addProperty( "out_max", 1 );
}

MathRange.title = "Range";
MathRange.desc = "Convert a number from one range to another";

MathRange.prototype.onExecute = function()
{
	if(this.inputs)
		for(var i = 0; i < this.inputs.length; i++)
		{
			var input = this.inputs[i];
			var v = this.getInputData(i);
			if(v === undefined)
				continue;
			this.properties[ input.name ] = v;
		}

	var v = this.properties["in"];
	if(v === undefined || v === null || v.constructor !== Number)
		v = 0;

	var in_min = this.properties.in_min;
	var in_max = this.properties.in_max;
	var out_min = this.properties.out_min;
	var out_max = this.properties.out_max;

	this._last_v = ((v - in_min) / (in_max - in_min)) * (out_max - out_min) + out_min;
	this.setOutputData(0, this._last_v );
}

MathRange.prototype.onDrawBackground = function(ctx)
{
	//show the current value
	if(this._last_v)
		this.outputs[0].label = this._last_v.toFixed(3);
	else
		this.outputs[0].label = "?";
}

MathRange.prototype.onGetInputs = function() {
	return [["in_min","number"],["in_max","number"],["out_min","number"],["out_max","number"]];
}

MathRange.prototype.onDblClick = function()
{
   showProperties(this);
    
}

LiteGraph.registerNodeType("Math/Range", MathRange);



function MathRand()
{
	this.addOutput("value","number");
	this.addProperty( "min", 0 );
	this.addProperty( "max", 1 );
	this.size = [60,20];
}

MathRand.title = "Rand";
MathRand.desc = "Random number";

MathRand.prototype.onExecute = function()
{
	if(this.inputs)
		for(var i = 0; i < this.inputs.length; i++)
		{
			var input = this.inputs[i];
			var v = this.getInputData(i);
			if(v === undefined)
				continue;
			this.properties[input.name] = v;
		}

	var min = this.properties.min;
	var max = this.properties.max;
	this._last_v = Math.random() * (max-min) + min;
	this.setOutputData(0, this._last_v );
}

MathRand.prototype.onDrawBackground = function(ctx)
{
	//show the current value
	if(this._last_v)
		this.outputs[0].label = this._last_v.toFixed(3);
	else
		this.outputs[0].label = "?";
}

MathRand.prototype.onGetInputs = function() {
	return [["min","number"],["max","number"]];
}

MathRand.prototype.onDblClick = function()
{
   showProperties(this);
    
}

LiteGraph.registerNodeType("Math/Rand", MathRand);

//Math ABS
function MathAbs()
{
	this.addInput("in","number");
	this.addOutput("out","number");
	this.size = [60,20];
}

MathAbs.title = "Abs";
MathAbs.desc = "Absolute";

MathAbs.prototype.onExecute = function()
{
	var v = this.getInputData(0);
	if(v == null) return;
	this.setOutputData(0, Math.abs(v) );
}

LiteGraph.registerNodeType("Math/Abs", MathAbs);


//Math Floor
function MathFloor()
{
	this.addInput("in","number");
	this.addOutput("out","number");
	this.size = [60,20];
}

MathFloor.title = "Floor";
MathFloor.desc = "Floor number to remove fractional part";

MathFloor.prototype.onExecute = function()
{
	var v = this.getInputData(0);
	if(v == null) return;
	this.setOutputData(0, Math.floor(v) );
}

LiteGraph.registerNodeType("Math/Floor", MathFloor );


//Math frac
function MathFrac()
{
	this.addInput("in","number");
	this.addOutput("out","number");
	this.size = [60,20];
}

MathFrac.title = "Frac";
MathFrac.desc = "Returns fractional part";

MathFrac.prototype.onExecute = function()
{
	var v = this.getInputData(0);
	if(v == null){ 
		return;
    }
	this.setOutputData(0, v%1 );
}

LiteGraph.registerNodeType("Math/Frac",MathFrac);

//Math scale
function MathScale()
{
	this.addInput("in","number",{label:""});
	this.addOutput("out","number",{label:""});
	this.size = [60,20];
	this.addProperty( "factor", 1 );
}

MathScale.title = "Scale";
MathScale.desc = "v * factor";

MathScale.prototype.onExecute = function()
{
	var value = this.getInputData(0);
	if(value != null)
		this.setOutputData(0, value * this.properties.factor );
}

MathScale.prototype.onDblClick = function()
{
   showProperties(this);
    
}


LiteGraph.registerNodeType("Math/Scale", MathScale );


//Math clamp
function MathAverageFilter()
{
	this.addInput("inArray","array");
	this.addOutput("Avg value","number");
}

MathAverageFilter.title = "Average";
MathAverageFilter.desc = "Average Computation";

MathAverageFilter.prototype.onExecute = function()
{
	var array= this.getInputData(0);
    if (array!==undefined && array!==null){
        var sum = 0;
        for( var i = 0; i < array.length; i++ ){
            sum += parseFloat( array[i] ); 
        }
   

	this.setOutputData( 0, sum/array.length );}
}

MathAverageFilter.prototype.onPropertyChanged = function( name, value )
{
	if(value < 1)
		value = 1;
	this.properties.samples = Math.round(value);
	var old = this._values;

	this._values = new Float32Array( this.properties.samples );
	if(old.length <= this._values.length )
		this._values.set(old);
	else
		this._values.set( old.subarray( 0, this._values.length ) );
}

MathAverageFilter.prototype.onDblClick = function()
{
   showProperties(this);
    
}

LiteGraph.registerNodeType("Math/Average", MathAverageFilter );


//Math operation
function MathOperation()
{
	this.addInput("A","number");
	this.addInput("B","number");
	this.addOutput("=","number");
	this.addProperty( "A", 0.0 );
	this.addProperty( "B", 0.0 );
	this.addProperty( "OP", "+", "string", { values: MathOperation.values } );
}

MathOperation.values = ["+","-","*","/","%","^"];

MathOperation.title = "Operation";
MathOperation.desc = "Easy math operators";
MathOperation["@OP"] = { type:"enum", title: "operation", values: MathOperation.values };


MathOperation.prototype.setValue = function(v)
{
	if( typeof(v) == "string") v = parseFloat(v);
	this.properties["value"] = v;
}

MathOperation.prototype.onExecute = function()
{
	var A = this.getInputData(0);
	var B = this.getInputData(1);
    
	if(typeof(A)==="number"){
        
		   this.properties["A"] = parseFloat(A);
    }
    if(typeof(B)==="number"){
        
		   this.properties["B"] = parseFloat(B);
    }

    if(typeof(A)==="object" && typeof(B)!=="object"){
            var result = [];
            for(var n =0; n<A.length;n++){
               switch(this.properties.OP)
                {
                    case '+': result.push(parseFloat(A[n])+parseFloat(this.properties["B"])); break;
                    case '-': result.push(parseFloat(A[n])-parseFloat(this.properties["B"])); break;
                    case 'x': 
                    case 'X': 
                    case '*': result.push(parseFloat(A[n])*parseFloat(this.properties["B"])); break;
                    case '/': result.push(parseFloat(A[n])/parseFloat(this.properties["B"])); break;
                    case '%': result.push(parseFloat(A[n])%parseFloat(this.properties["B"]));
                    case '^': result.push(Math.pow(A[n],parseFloat(this.properties["B"]))); break;
                    default:
                console.warn("Unknown operation: " + this.properties.OP);
                } 
            }
    } else if(typeof(B)==="object" && typeof(A)!=="object"){
         var result = [];
            for(var n =0; n<B.length;n++){
               switch(this.properties.OP)
                {
                    case '+': result.push(parseFloat(this.properties["A"])+parseFloat(B[n])); break;
                    case '-': result.push(parseFloat(this.properties["A"])-parseFloat(this.properties["B"])); break;
                    case 'x': 
                    case 'X': 
                    case '*': result.push(parseFloat(this.properties["A"])*parseFloat(B[n])); break;
                    case '/': result.push(parseFloat(this.properties["A"])/parseFloat(B[n])); break;
                    case '%': result.push(parseFloat(this.properties["A"])%parseFloat(B[n]));
                    case '^': result.push(Math.pow(parseFloat(this.properties["A"]),parseFloat(B[n]))); break;
                    default:
                console.warn("Unknown operation: " + this.properties.OP);
                } 
            }
        
    } else if (typeof(A)==="object" && typeof(B)==="object"){
        var result = [];
        if(A.length!=B.length){
            console.warn("Different array lengths ");
            return;
        }
            for(var n =0; n<A.length;n++){
               switch(this.properties.OP)
                {
                    case '+': result.push(parseFloat(A[n])+parseFloat(B[n])); break;
                    case '-': result.push(parseFloat(A[n])-parseFloat(this.properties["B"])); break;
                    case 'x': 
                    case 'X': 
                    case '*': result.push(parseFloat(A[n])*parseFloat(B[n])); break;
                    case '/': result.push(parseFloat(A[n])/parseFloat(B[n])); break;
                    case '%': result.push(parseFloat(A[n])%parseFloat(B[n]));
                    case '^': result.push(Math.pow(parseFloat(A[n]),parseFloat(B[n]))); break;
                    default:
                console.warn("Unknown operation: " + this.properties.OP);
                } 
            }
        
    } else {

        var result = 0;
        switch(this.properties.OP)
        {
            case '+': result = parseFloat(this.properties["A"])+parseFloat(this.properties["B"]); break;
            case '-': result = parseFloat(this.properties["A"])-parseFloat(this.properties["B"]); break;
            case 'x': 
            case 'X': 
            case '*': result = parseFloat(this.properties["A"])*parseFloat(this.properties["B"]); break;
            case '/': result = parseFloat(this.properties["A"])/parseFloat(this.properties["B"]); break;
            case '%': result = parseFloat(this.properties["A"])%parseFloat(this.properties["B"]);
            case '^': result = Math.pow(parseFloat(this.properties["A"]),parseFloat(this.properties["B"])); break;
            default:
                console.warn("Unknown operation: " + this.properties.OP);
        }
    }
	this.setOutputData(0, result );        
}

MathOperation.prototype.onDrawBackground = function(ctx)
{
	if(this.flags.collapsed)
		return;

	ctx.font = "40px Arial";
	ctx.fillStyle = "black";
	ctx.textAlign = "center";
	ctx.fillText(this.properties.OP, this.size[0] * 0.5, this.size[1] * 0.5 + LiteGraph.NODE_TITLE_HEIGHT );
	ctx.textAlign = "left";
}

MathOperation.prototype.onDblClick = function()
{
   showProperties(this);
    
}

LiteGraph.registerNodeType("Math/Operation", MathOperation );
 

//Math compare
function MathCompare()
{
	this.addInput( "A","number" );
	this.addInput( "B","number" );
	this.addOutput("A==B","boolean");
	this.addOutput("A!=B","boolean");
	this.addProperty( "A", 0 );
	this.addProperty( "B", 0 );
}

MathCompare.title = "Compare";
MathCompare.desc = "compares between two values";

MathCompare.prototype.onExecute = function()
{
	var A = this.getInputData(0);
	var B = this.getInputData(1);
	if(A !== undefined)
		this.properties["A"] = A;
	else
		A = this.properties["A"];

	if(B !== undefined)
		this.properties["B"] = B;
	else
		B = this.properties["B"];

	for(var i = 0, l = this.outputs.length; i < l; ++i)
	{
		var output = this.outputs[i];
		if(!output.links || !output.links.length)
			continue;
		switch( output.name )
		{
			case "A==B": value = A==B; break;
			case "A!=B": value = A!=B; break;
			case "A>B": value = A>B; break;
			case "A<B": value = A<B; break;
			case "A<=B": value = A<=B; break;
			case "A>=B": value = A>=B; break;
		}
		this.setOutputData(i, value );
	}
};

MathCompare.prototype.onGetOutputs = function()
{
	return [["A==B","boolean"],["A!=B","boolean"],["A>B","boolean"],["A<B","boolean"],["A>=B","boolean"],["A<=B","boolean"]];
}


MathCompare.prototype.onDblClick = function()
{
   showProperties(this);
    
}

LiteGraph.registerNodeType("Math/Compare",MathCompare);

function MathCondition()
{
	this.addInput("A","number");
	this.addInput("B","number");
	this.addOutput("out","boolean");
	this.addProperty( "A", 1 );
	this.addProperty( "B", 1 );
	this.addProperty( "OP", ">", "string", { values: MathCondition.values } );

	this.size = [60,40];
}

MathCondition.values = [">","<","==","!=","<=",">="];
MathCondition["@OP"] = { type:"enum", title: "operation", values: MathCondition.values };

MathCondition.title = "Condition";
MathCondition.desc = "evaluates condition between A and B";

MathCondition.prototype.onExecute = function()
{
	var A = this.getInputData(0);
	if(A === undefined)
		A = this.properties.A;
	else
		this.properties.A = A;

	var B = this.getInputData(1);
	if(B === undefined)
		B = this.properties.B;
	else
		this.properties.B = B;
		
	var result = true;
	switch(this.properties.OP)
	{
		case ">": result = A>B; break;
		case "<": result = A<B; break;
		case "==": result = A==B; break;
		case "!=": result = A!=B; break;
		case "<=": result = A<=B; break;
		case ">=": result = A>=B; break;
	}

	this.setOutputData(0, result );
}

MathCondition.prototype.onDblClick = function()
{
   showProperties(this);
    
}

LiteGraph.registerNodeType("Math/Condition", MathCondition);


function MathAccumulate()
{
	this.addInput("inc","number");
	this.addOutput("total","number");
	this.addProperty( "increment", 1 );
	this.addProperty( "value", 0 );
}

MathAccumulate.title = "Accumulate";
MathAccumulate.desc = "Increments a value every time";

MathAccumulate.prototype.onExecute = function()
{
	if(this.properties.value === null)
		this.properties.value = 0;

	var inc = this.getInputData(0);
	if(inc !== null)
		this.properties.value += inc;
	else
		this.properties.value += this.properties.increment;
	this.setOutputData(0, this.properties.value );
}

MathAccumulate.prototype.onDblClick = function()
{
   showProperties(this);  
}

LiteGraph.registerNodeType("Math/Accumulate", MathAccumulate);

//Math Trigonometry
function MathTrigonometry()
{
	this.addInput("v","number");
	this.addOutput("sin","number");

	this.addProperty( "amplitude", 1 );
	this.addProperty( "offset", 0 );
	this.bgImageUrl = "nodes/imgs/icon-sin.png";
}

MathTrigonometry.title = "Trigonometry";
MathTrigonometry.desc = "Sin Cos Tan of the input(number or array)";
MathTrigonometry.filter = "shader";

MathTrigonometry.prototype.onExecute = function()
{
	var v = this.getInputData(0);
	if(v == null)
		v = 0;
	var amplitude = this.properties["amplitude"];
	var slot = this.findInputSlot("amplitude");
	if(slot != -1)
		amplitude = this.getInputData(slot);
	var offset = this.properties["offset"];
	slot = this.findInputSlot("offset");
	if(slot != -1)
		offset = this.getInputData(slot);

	for(var i = 0, l = this.outputs.length; i < l; ++i)
	{
        var output = this.outputs[i];
        if(typeof(v)=="number"){
            switch( output.name ) {
                case "sin": value = Math.sin(v); break;
                case "cos": value = Math.cos(v); break;
                case "tan": value = Math.tan(v); break;
                case "asin": value = Math.asin(v); break;
                case "acos": value = Math.acos(v); break;
                case "atan": value = Math.atan(v); break;
            }
          this.setOutputData(i, amplitude * value + offset);  
        } else if(typeof(v)=="object"){
            var values = [];
            for(var k =0; k<v.length;k++){
                switch( output.name ) {
                    case "sin": value = Math.sin(v[k]); break;
                    case "cos": value = Math.cos(v[k]); break;
                    case "tan": value = Math.tan(v[k]); break;
                    case "asin": value = Math.asin(v[k]); break;
                    case "acos": value = Math.acos(v[k]); break;
                    case "atan": value = Math.atan(v[k]); break;
                }
                values.push(amplitude * value + offset);
            }
            this.setOutputData(i, values);
        }
	}
}

MathTrigonometry.prototype.onGetInputs = function()
{
	return [["v","number"],["amplitude","number"],["offset","number"]];
}


MathTrigonometry.prototype.onGetOutputs = function()
{
	return [["sin","number"],["cos","number"],["tan","number"],["asin","number"],["acos","number"],["atan","number"]];
}

MathTrigonometry.prototype.onDblClick = function()
{
   showProperties(this);  
}

LiteGraph.registerNodeType("Math/Trigonometry", MathTrigonometry );



//math library for safe math operations without eval
if(window.math)
{
	function MathFormula()
	{
		this.addInputs("x","number");
		this.addInputs("y","number");
		this.addOutputs("","number");
		this.properties = {x:1.0, y:1.0, formula:"x+y"};
	}

	MathFormula.title = "Formula";
	MathFormula.desc = "Compute safe formula";
		
	MathFormula.prototype.onExecute = function()
	{
		var x = this.getInputData(0);
		var y = this.getInputData(1);
		if(x != null)
			this.properties["x"] = x;
		else
			x = this.properties["x"];

		if(y!=null)
			this.properties["y"] = y;
		else
			y = this.properties["y"];

		var f = this.properties["formula"];
		var value = math.eval(f,{x:x,y:y,T: this.graph.globaltime });
		this.setOutputData(0, value );
	}

	MathFormula.prototype.onDrawBackground = function()
	{
		var f = this.properties["formula"];
		this.outputs[0].label = f;
	}

	MathFormula.prototype.onGetOutputs = function()
	{
		return [["A-B","number"],["A*B","number"],["A/B","number"]];
	}
    
    MathFormula.prototype.onDblClick = function()
    {
       showProperties(this);  
    }

	LiteGraph.registerNodeType("Math/Formula", MathFormula );
}

})();