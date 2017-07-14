
function createSon(father,shapeType, sonStyle){
    var sonObjcts = new Array();
    switch(sonStyle){
        case 1: // Through perimeter
            if(father.shape == 1) { //Father: Sq/Rect
                var size = parseInt(Math.min(father.w/5,father.h/5));
                var perimeter = (2*father.w + 2*father.h);
                var curPos = {x: father.x , y: father.y };
                    
                if(shapeType == 1){ // Son: Sq/rect
                    curPos.x -= size ;
                    curPos.y -= size;
                    var HalfD = Math.sqrt((father.x-curPos.x)^2+(father.y-curPos.y)^2);                   
                    var newW = father.w-(HalfD*2);
                    var newH = father.h-(HalfD*2); 
                    var objNumW = parseInt(newW/(HalfD*2))+2; // Shapes number between horitzontal vertex
                    var objNumH = parseInt(newH/(HalfD*2)); // Shapes number between horitzontal vertex
                    var distance1 = (newW/objNumW);
                    var distance2 = (newH/objNumH);
                    var sp1 = (distance1/2)+HalfD;
                    var sp2 = (distance1/2)+HalfD;
                    
                }
                else if(shapeType == 2){

                }
                else if(shapeType == 3){

                }
                for(var i=0;i<objNumW;i++){
                    if(i==0){
                        var sq1 = new Shape (curPos.x,curPos.y,size,size,father.fill);
                        var sq2 = new Shape (curPos.x,curPos.y+father.h,size,size,father.fill);
                       curPos.x += sp1;
                       curPos.y += sp2;
                    } else if(i==objNumW-1) {
                        curPos.x 
                    } else {
                        var sq1 = new Shape (curPos.x,curPos.y,size,size,father.fill);
                        var sq2 = new Shape (curPos.x,curPos.y+father.h,size,size,father.fill);
                        curPos.x += distance1;
                        curPos.y += distance2;
                    }
                    sonObjcts.push(sq1);
                    sonObjcts.push(sq2);
                }
                
            }
            else if (father.shape == 2){ //Father: Circle
                var size = father.rad/5;
                var perimeter = (2*Math.PI*father.rad);
                var objNum = perimeter/size;
                
                for(var i = 0; i<= parseInt(distance) ; i++){
                    if(shapeType == 1){

                    }
                    else if(shapeType == 2){

                    }
                    else if(shapeType == 3){

                    }
                }
                    
            }
            else if (father.shape == 3) { //Father: Triangle
                var size = Math.min(Math.abs(father.p0.x-father.p1.x),Math.abs(father.p0.x-father.p2.x))/5;
                var perimeter = Math.sqrt((father.p1.x-father.p0.x)^2+(father.p1.y-father.p0.y)^2)+Math.sqrt((father.p2.x-father.p1.x)^2+(father.p2.y-father.p1.y)^2)+Math.sqrt((father.p0.x-father.p2.x)^2+(father.p0.y-father.p2.y)^2);        
                var objNum = perimeter/size;
            
                for(var i = 0; i<= parseInt(distance) ; i++){
                    if(shapeType == 1){

                    }
                    else if(shapeType == 2){

                    }
                    else if(shapeType == 3){

                    }
                }
            }
            break;
        case 2: // centered by father center
            if(shapeType == 1){  //Son: Square
               if(father.shape == 1){
                var Ox = father.x + (father.w/5);
                var Oy = father.y + (father.h/5);
                var sizeW = father.w-2*(father.w/5) ;
                var sizeH = father.y-2*(father.w/5) ;
                 }
                else if(father.shape == 2) {
                var sizeW = Mat.sqrt(((2*father.rad)^2)/2); // Pythagorean Theorem
                var sizeH = sizeW;
                var Ox = father.x- sizeW;
                var Oy = father.y - sizeH;
                } 
                else if(father.shape == 3) {
                var sizeW = Math.min(Math.abs(father.p0.x-father.p1.x),Math.abs(father.p0.x-father.p2.x));
                var sizeH = Math.min(Math.abs(father.p0.y-father.p1.y),Math.abs(father.p0.y-father.p2.y));
                var Ox = father.x- sizeW;
                var Oy = father.y - sizeH;
                } 
                
               var s = new Shape(Ox,Oy ,sizeW , sizeH, father.fill); 
            }
            else if(shapeType == 2){ // Son: Circle shape
                if(father.shape == 1){
                    var rad = Math.min(father.w,father.h);
                 }else if(father.shape == 2) {
                    var rad = (father.rad-(father.rad/5));
                } else if(father.shape == 3) {
                    var rad = Math.min(Math.abs(father.p0.x-father.p1.x),Math.abs(father.p0.x-father.p2.x))/2;
                } 
                
               var s =  new Shape2(father.x, father.y, rad, 0, Math.PI*2, father.fill);
            }
            else if(shapeType == 3){ // Son: triangle  
                    if(father.shape == 1){
                        var size =Math.min(father.w/2,father.h/2)
                        var p0 = {x: father.x ,y: father.y-size};
                        var p1 = {x: father.x - size,y: father.y + (size/2)};
                        var p2 = {x: father.x + size ,y: father.y + (size/2)};
                        var Ox =((p0.x+p1.x+p2.x) / 3);
                        var Oy =((p0.y+p1.y+p2.y) / 3);
                 }else if(father.shape == 2) {
                        var p0 = {x: father.x ,y: father.y-father.rad};
                        var p1 = {x: father.x - father.rad,y: father.y + (father.rad/2)};
                        var p2 = {x: father.x + rather.rad ,y: father.y + (father.rad/2)};
                        var Ox =((p0.x+p1.x+p2.x) / 3);
                        var Oy =((p0.y+p1.y+p2.y) / 3);
                } else if(father.shape == 3) {
                        var p0 = {x: father.p0.x + ((father.x - father.p0.x)/5),y: father.p0.y + ((father.y - father.p0.y)/5) };
                        var p1 = {x: father.p1.x + ((father.x - father.p1.x)/5),y: father.p1.y + ((father.y - father.p1.y)/5) };
                        var p2 = {x: father.p2.x + ((father.x - father.p2.x)/5),y: father.p2.y + ((father.y - father.p2.y)/5) };
                        var Ox =((p0.x+p1.x+p2.x) / 3);
                        var Oy =((p0.y+p1.y+p2.y) / 3);
                } 
                var s = new Shape3(Ox, Oy, p0, p1,p2,father.fill);
            }
            
            sonObjcts.push(s);
            break;
        case 3: // at vertex
            if(father.shape==1){ //Father: Sqare/Rect
                var p0 = {x: (father.x-(father.w/2)), y: (father.y-(father.h/2))};
                var p1 = {x: (father.x+(father.w/2)), y: (father.y-(father.h/2))};
                var p2 = {x: (father.x+(father.w/2)), y: (father.y+(father.h/2))};
                var p3 = {x: (father.x-(father.w/2)), y: (father.y+(father.h/2))};
                
                  if(shapeType == 1){ //Son: sq/rect
                    var w = Math.min((father.w/2)-(father.w/5),(father.h/2)-(father.h/5));
                    var h = Math.max((father.w/2)-(father.w/5),(father.h/2)-(father.h/5));
                    var s0 = new Shape (p0.x-(w/2),p0.y-(h/2),w,h,father.fill);
                    var s1 = new Shape (p1.x-(w/2),p1.y-(h/2),w,h,father.fill);
                    var s2 = new Shape (p2.x-(w/2),p2.y-(h/2),w,h,father.fill);
                    var s3 = new Shape (p3.x-(w/2),p3.y-(h/2),w,h,father.fill);
                }else if(shapeType == 2){ //Son: circle
                    var rad = Math.min((father.w/2)-(father.w/5),(father.h/2)-(father.h/5));
                    var s0 = new Shape2 (p0.x,p0.y,rad, 0, Math.PI*2,father.fill);
                    var s1 = new Shape2 (p1.x,p1.y,rad, 0, Math.PI*2,father.fill);
                    var s2 = new Shape2 (p2.x,p2.y,rad, 0, Math.PI*2,father.fill);
                    var s3 = new Shape2 (p3.x,p3.y,rad, 0, Math.PI*2,father.fill);
                }
                else if(shapeType == 3){//Son: triangle
                    var size =  Math.min((father.w/2)-(father.w/5),(father.h/2)-(father.h/5));;
                    var s0 = new Shape3 (p0.x, p0.y, {x:p0.x,y:parseFloat(p0.y-size)}, {x:parseFloat(p0.x-size),y:parseFloat(p0.y+(size/2))},{x:parseFloat(p0.x+size),y:parseFloat(p0.y-(size/2))},father.fill);
                    var s1 = new Shape3 (p1.x, p1.y, {x:p1.x,y:parseFloat(p1.y-size)}, {x:parseFloat(p1.x-size),y:parseFloat(p1.y+(size/2))},{x:parseFloat(p1.x+size),y:parseFloat(p1.y-(size/2))},father.fill);
                    var s2 = new Shape3 (p2.x, p2.y, {x:p2.x,y:parseFloat(p2.y-size)}, {x:parseFloat(p2.x-size),y:parseFloat(p2.y+(size/2))},{x:parseFloat(p2.x+size),y:parseFloat(p2.y-(size/2))},father.fill);
                    var s3 = new Shape3 (p3.x, p3.y, {x:p3.x,y:parseFloat(p3.y-size)}, {x:parseFloat(p3.x-size),y:parseFloat(p3.y+(size/2))},{x:parseFloat(p3.x+size),y:parseFloat(p3.y-(size/2))},father.fill);
                }
            sonObjcts.push(s0);
            sonObjcts.push(s1);
            sonObjcts.push(s2);
            sonObjcts.push(s3);
            }
            else if(father.shape==3){ // Father: Triangle
                  if(shapeType == 1){
                    var w =Math.abs(Math.min((father.p1.x-father.p0.x)/2.5,(father.p1.x-father.p2.x)/2.5));
                    var h = Math.abs(Math.max((father.p1.y-father.p1.y)/2.5,(father.p1.y-father.p2.y)/2.5));
                    var s0 = new Shape (father.p0.x-(w/2),father.p0.y-(h/2),w,h,father.fill);
                    var s1 = new Shape (father.p1.x-(w/2),father.p1.y-(h/2),w,h,father.fill);
                    var s2 = new Shape (father.p2.x-(w/2),father.p2.y-(h/2),w,h,father.fill);
                }else if(shapeType == 2){
                    var rad = Math.abs(Math.min((father.p1.x-father.p0.x)/2.5,(father.p1.x-father.p2.x)/2.5));
                    var s0 = new Shape2 (father.p0.x,father.p0.y,rad, 0, Math.PI*2,father.fill);
                    var s1 = new Shape2 (father.p1.x,father.p1.y,rad, 0, Math.PI*2,father.fill);
                    var s2 = new Shape2 (father.p2.x,father.p2.y,rad, 0, Math.PI*2,father.fill);
                }
                else if(shapeType == 3){
                    var size =  Math.min((father.p0.x-father.p1.x)-((father.p0.x-father.p1.x)/2.5),(father.p0.x-father.p2.x)-((father.p0.x-father.p2.x)/2.5));;
                    var s0 = new Shape3 (father.p0.x, father.p0.y, {x:father.p0.x,y:parseFloat(father.p0.y-size)}, {x:parseFloat(father.p0.x-size),y:parseFloat(father.p0.y+(size/2))},{x:parseFloat(father.p0.x+size),y:parseFloat(father.p0.y-(size/2))},father.fill);
                    var s1 = new Shape3 (father.p1.x, father.p1.y, {x:father.p1.x,y:parseFloat(father.p1.y-size)}, {x:parseFloat(father.p1.x-size),y:parseFloat(father.p1.y+(size/2))},{x:parseFloat(father.p1.x+size),y:parseFloat(father.p1.y-(size/2))},father.fill);
                    var s2 = new Shape3 (father.p2.x, father.p2.y, {x:father.p2.x,y:parseFloat(father.p2.y-size)}, {x:parseFloat(father.p2.x-size),y:parseFloat(father.p2.y+(size/2))},{x:parseFloat(father.p2.x+size),y:parseFloat(father.p2.y-(size/2))},father.fill);
                }
            sonObjcts.push(s0);
            sonObjcts.push(s1);
            sonObjcts.push(s2);
            }
            break;
    }
 father.sons.push(sonObjcts);
}



/* 
Efecte xulo, pare i fill comparteixen centre i fill va d cenre a fora (cercle+triangle)

case 3:
            var perimeter = (2*Math.PI*father.rad);
            var objNum=0;
            if("times" in shape){
                objNum= shape.times;
                shape.size = parseInt(perimeter/objNum);
            }else{
                 objNum = parseInt(perimeter/(shape.size*2)); 
            }
            ctx.save(); 
            shape.x = father.x;
            shape.y = father.y-father.rad;
            updateTpoints(shape,shape.size);
            console.log('triang center= x: '+shape.x + " y: "+shape.y)
            console.log('shape'+shape)
            for(var j=0; j<objNum;j++){
                ctx.save()
              shape.draw(ctx);
              checkSon(shape,ctx);
                ctx.restore();
              ctx.rotate(deg2rad(1/objNum*360)); 
            }  
            ctx.restore();

*/